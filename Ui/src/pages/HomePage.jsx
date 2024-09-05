import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from "../assets/logo.png";
import { BrowserProvider } from 'ethers';
import { abi } from "../scdata/Cert.json";
import { CertModuleCert } from "../scdata/deployed_addresses.json";

const HomePage = () => {
  const [id, setId] = useState('');
  const [isConnected, setIsConnected] = useState(false); // State to track MetaMask connection status
  const provider = new BrowserProvider(window.ethereum);

  async function connectToMetamask() {
    try {
      const signer = await provider.getSigner();
      console.log('Address:', signer.address);
      setIsConnected(true); // Update state to indicate MetaMask is connected
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
      setIsConnected(false); // Handle error and ensure state reflects disconnection
    }
  }

  return (
    <div className="bg-blue-100 h-[1000px]">
      <nav className="flex justify-between">
        <button
          className="w-[300px] h-[50px] bg-orange-400 m-4 rounded-lg text-2xl shadow-lg shadow-slate-600"
          onClick={connectToMetamask}
        >
          {isConnected ? 'MetaMask Connected' : 'Connect to Wallet'}
        </button>

        <div>
          <input
            type="button"
            value="Home"
            className="w-[200px] h-[50px] bg-blue-500 m-4 rounded-lg text-2xl text-white shadow-lg shadow-slate-600"
          />
          <Link to="/issue">
            <input
              type="button"
              value="Issue Certificate"
              className="w-[200px] h-[50px] bg-slate-200 m-4 rounded-lg text-2xl shadow-lg shadow-slate-600"
            />
          </Link>
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
