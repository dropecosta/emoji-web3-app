import { useState } from 'react';
import { ethers } from 'ethers';

function App() {
  const [ethereum, setEthereum] = useState(null);
  const [walletAddress, setWalletAddress] = useState(null);

  async function requestAccount() {
    console.log('Requesting account...');

    // Check if Meta Mask Extension exists 
    if(window.ethereum) {
      console.log('detected');
      console.log('window.ethereum', window.ethereum);

      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setEthereum(window.ethereum);
        setWalletAddress(accounts[0]);
      } catch (error) {
        console.log(error);
      }

    } else {
      alert('Meta Mask not detected');
    }
  }

  // Create a provider to interact with a smart contract
  async function connectWallet() {
    if(typeof window.ethereum !== 'undefined') {
      await requestAccount();

      const provider = new ethers.BrowserProvider(window.ethereum);
    }
  }

  return (
    <div className="App">
     <header className="app-header">
     {ethereum && walletAddress ? (<>
      <button onClick={connectWallet}>Connect Wallet</button>
      <h3>Wallet Address: {walletAddress}</h3>
      </>) : (
        <p>Connect to MetaMask</p>
      )}
     </header>
    </div>
      
  )
}

export default App
