import { useState } from 'react';
import './App.css';
import MainMint from './MainMint.js';
import NavBar from './NavBar.js';
import { Helmet } from 'react-helmet'


const TITLE = 'OnlyFans NFT';


function App() {
  const [accounts, setAccounts] = useState([]);
  return (

    <div className="overlay">

      <Helmet>
          <title>{ TITLE }</title>
      </Helmet>


      <div className="App">
        <NavBar accounts={accounts} setAccounts={setAccounts} />
        <MainMint accounts={accounts} setAccounts={setAccounts} />
      </div>
      <div className="moving-background"></div>
    </div>
  );
}

export default App;
