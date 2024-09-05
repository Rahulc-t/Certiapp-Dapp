import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from "../assets/logo.png";
import { BrowserProvider } from 'ethers';

const HomePage = () => {
  const [id, setId] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Check if MetaMask is already connected by looking for the address in localStorage
    const storedAddress = localStorage.getItem('metaMaskAddress');
    if (storedAddress) {
      setIsConnected(true);
    }

    // Listen for account changes or disconnection
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('disconnect', handleDisconnect);
    }

    return () => {
      // Cleanup event listeners on component unmount
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('disconnect', handleDisconnect);
      }
    };
  }, []);

  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      // MetaMask is disconnected or account is locked
      disconnectMetamask();
    } else {
      // MetaMask is connected to a different account
      const address = accounts[0];
      localStorage.setItem('metaMaskAddress', address);
      setIsConnected(true);
    }
  };

  const handleDisconnect = () => {
    // Handle MetaMask disconnection
    disconnectMetamask();
  };

  const connectToMetamask = async () => {
    try {
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      
      // Store the MetaMask address in localStorage
      localStorage.setItem('metaMaskAddress', address);
      setIsConnected(true); // Update state to indicate MetaMask is connected
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
      setIsConnected(false); // Handle error and ensure state reflects disconnection
    }
  };

  const disconnectMetamask = () => {
    // Clear MetaMask address from local storage
    localStorage.removeItem('metaMaskAddress');
    setIsConnected(false); // Update state to indicate MetaMask is disconnected
  };

  return (
    <div className="bg-blue-100 h-[1000px]">
      <nav className="flex justify-between">
        <button
          className="w-[300px] h-[50px] bg-orange-400 m-4 rounded-lg text-2xl shadow-lg shadow-slate-600"
          onClick={isConnected ? disconnectMetamask : connectToMetamask}
        >
          {isConnected ? 'Wallet Connected' : 'Connect to Wallet'}
        </button>

        <div>
          <input
            type="button"
            value="Home"
            className="w-[200px] h-[50px] bg-blue-500 m-4 rounded-lg text-2xl text-white shadow-lg shadow-slate-600"
          />
          {isConnected && (
            <Link to="/issue">
              <input
                type="button"
                value="Issue Certificate"
                className="w-[200px] h-[50px] bg-slate-200 m-4 rounded-lg text-2xl shadow-lg shadow-slate-600"
              />
            </Link>
          )}
        </div>
      </nav>
      <div className="flex justify-center">
        <div className="text-center mt-16 border w-[500px] h-[600px] p-4 bg-blue-200 rounded-3xl shadow-lg shadow-black">
          <p className="text-5xl font-bold">Certificate Dapp</p>
          <div className="flex justify-center mt-16">
            <img src={logo} alt="" className="w-[200px] h-[200px]" />
          </div>
          <div className="mt-16">
            <input
              type="text"
              className="w-[400px] h-[50px] rounded-lg text-2xl border border-slate-300 shadow-lg p-4"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <Link to={`/view/${id}`}>
              <input
                type="button"
                value="Search"
                className="w-[200px] h-[50px] bg-blue-500 m-4 rounded-lg text-2xl text-white shadow-lg shadow-slate-600"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
