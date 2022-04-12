import logo from './logo.svg';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from "react-router-dom";
import './App.css';
import CreateWallet from './wallet/create/index';
import AccessWallet from './wallet/access/index';

function App() {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/create">Create Wallet</Link>
                        </li>
                        <li>
                            <Link to="/access">Access Wallet</Link>
                        </li>
                    </ul>
                </nav>

                {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                <Routes >
                    <Route path="/" element= {<CreateWallet />} />
                    <Route path="/create" element= {<CreateWallet />} />
                    <Route path="/access" element= {<AccessWallet />} />
                </Routes >
            </div>
        </Router>
    );
}

export default App;
