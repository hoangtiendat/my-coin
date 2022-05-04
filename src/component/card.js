import React, {Component} from "react";
import backgroundImage from "./../img/background-card.png";

export default class Card extends Component {

  render () {
    return (<div className="info-card" style={{backgroundImage: "url( " + backgroundImage + ")"}}>
      <span className='card-wallet'>My Persional Account</span><p className="wallet-address">{this.props.wallet}</p>
      <p className="balance">Balance: {this.props.amount} ETH</p>
      <form onSubmit={this.props.onSendMoney} className="send-form">
        <div>
          <label htmlFor="send-wallet">Send to: </label>
          <input type="text" placeholder="wallet address" id="send-wallet" required/>
        </div>
        <div>
          <label htmlFor="send-amount">Amount: </label>
          <input type="number" id="send-amount" max={this.props.amount} required/>
        </div>
        <button type="submit">Send</button>
      </form>
    </div>)
  }
}