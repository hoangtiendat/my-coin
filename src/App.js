// import logo from './logo.svg';
// import {
//     BrowserRouter as Router,
//     Routes,
//     Route,
//     Link
//   } from "react-router-dom";
// import './App.css';
// import CreateWallet from './wallet/create/index';
// import AccessWallet from './wallet/access/index';

// function App() {
//     return (
//         <Router>
//             <div>
//                 <nav>
//                     <ul>
//                         <li>
//                             <Link to="/">Home</Link>
//                         </li>
//                         <li>
//                             <Link to="/create">Create Wallet</Link>
//                         </li>
//                         <li>
//                             <Link to="/access">Access Wallet</Link>
//                         </li>
//                     </ul>
//                 </nav>

//                 {/* A <Switch> looks through its children <Route>s and
//             renders the first one that matches the current URL. */}
//                 <Routes >
//                     <Route path="/" element= {<CreateWallet />} />
//                     <Route path="/create" element= {<CreateWallet />} />
//                     <Route path="/access" element= {<AccessWallet />} />
//                 </Routes >
//             </div>
//         </Router>
//     );
// }

// export default App;
import React, { Component, Fragment } from 'react';
import './App.css';
import socket from "./service/socket"
import Card from './component/card';

const { Blockchain, Transaction } = require("./model/blockchain");
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

var keythereum = require("keythereum");
var params = { keyBytes: 32, ivBytes: 16 };
var dk = keythereum.create(params);
var options = {
  kdf: "pbkdf2",
  cipher: "aes-128-ctr",
  kdfparams: {
    c: 262144,
    dklen: 32,
    prf: "hmac-sha256"
  }
};
var keyObject = keythereum.dump("123456", dk.privateKey, dk.salt, dk.iv, options);

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      myCoin: new Blockchain(),
      myKey: null,
      myWalletAddress: null,
    }
    socket.on("sync-block", (data) => {
      console.log(data);
      this.state.myCoin.chain = data.chain;
      this.state.myCoin.pendingTransactions = data.pendingTransactions
      this.setState({
        myCoin: this.state.myCoin
      })
    })
  }

  handleCreateWallet = () => {
    const key = ec.genKeyPair();
    this.setState({
      myWalletAddress: key.getPublic('hex'),
      myKey: key.getPrivate('hex')
    });
    
  //   const storeFile = keythereum.exportToFile(keyObject);
  //   const stringFile = typeof storeFile === 'object' ? JSON.stringify(storeFile) : storeFile;
  //   if (stringFile === null) return '';
  //   const blob = new Blob([stringFile], {
  //     type: "octet/stream"
  //   });
  //   const url = window.URL.createObjectURL(blob);
  //   var a = document.createElement("a");
  //   document.body.appendChild(a);
  //   a.style = "display: none";
  //   a.href = url;
  //   a.download = 'keystore';
  //   a.click();
  //   window.URL.revokeObjectURL(url);
  }

  handleMining = () => {
    this.state.myCoin.minePendingTransactions(this.state.myWalletAddress);
    this.setState({
      myCoin: this.state.myCoin
    })
    socket.emit("update-db", {chain: this.state.myCoin.chain, pendingTransactions: this.state.myCoin.pendingTransactions})
  }

  handleSendMoney = (e) => {
    e.preventDefault();
    const wallet = document.getElementById("send-wallet").value;
    const amount = document.getElementById("send-amount").value;
    const tx = new Transaction(this.state.myWalletAddress, wallet, amount);
    tx.signTransaction(ec.keyFromPrivate(this.state.myKey));
    this.state.myCoin.addTransaction(tx);
    this.setState({
      myCoin: this.state.myCoin
    })
    socket.emit("update-db", {chain: this.state.myCoin.chain, pendingTransactions: this.state.myCoin.pendingTransactions})
  }

  render () {
    let i = 0;
    const isCreated = !this.state.myKey || !this.state.myWalletAddress;
    return (
      <Fragment>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <div style={{width: 540, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 50}}>
          {isCreated ?
          <button style={{width: 190, height: 62, background: "#05c0a5", border: "none", color: "white",  borderRadius: "10px", fontSize: "18px", fontWeight: "500"}} onClick={this.handleCreateWallet}>Create A New Wallet</button>
          : <Card wallet={this.state.myWalletAddress} amount={this.state.myCoin.getBalanceOfAddress(this.state.myWalletAddress)} onSendMoney={this.handleSendMoney}></Card>}
          
        </div>
        { !isCreated &&
        <div style={{padding: "5px 30px", width: "800px"}}>
          <p><b>Transactions: </b><button disabled={this.state.myCoin?.pendingTransactions.length === 0} onClick={this.handleMining}>Mine</button></p>


          <table width="100%" >
            <thead>
            <tr>
              <th colspan="5" style={{fontSize: "20px", fontWeight: "500"}}>Latest Transactions</th>
            </tr>
            <tr>
              <th>From</th>
              <th>To</th>
              <th>Amount</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
            </thead>
            <tbody>
            {this.state.myCoin?.pendingTransactions.slice(0).reverse().map((transaction) => {
              i++;
              return (<tr key={i}>
                <td>#{i}</td>
                <td className="threedots"><a href="#">{transaction.fromAddress === this.state.myWalletAddress ? "(You)" : ""}{transaction.fromAddress}</a></td>
                <td className="threedots"><a href="#">{transaction.toAddress}</a></td>
                <td style={{color: 'green'}}>{transaction.amount} Eth</td>
                <td>{new Date(transaction.timestamp).toLocaleString()}</td>
                <span style={{color: 'red'}}>Pending</span>
              </tr>)
            })}
          {this.state.myCoin?.chain.slice(0).reverse().map((block) => {
              return block.transactions.slice(0).reverse().map(transaction  => {
                i++;
                return (<tr key={i}>
                  <td>#{i}</td>
                  <td className="threedots"><a href="#">{transaction.fromAddress}</a></td>
                  <td className="threedots"> <a href="#">{transaction.toAddress}</a></td>
                  <td style={{color: 'green'}}>{transaction.amount} Eth</td>
                  <td>{new Date(transaction.timestamp).toLocaleString()}</td>
                  <span style={{color: 'green'}}>Mined</span>
                </tr>)
              })})}
          </tbody>
          </table>
        </div>}
      </div>
    </Fragment>
    );
  }
}

export default App;

