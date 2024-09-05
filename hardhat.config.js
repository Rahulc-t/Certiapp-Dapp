require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "infurasep",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    infurasep: {
      url:"https://sepolia.infura.io/v3/f0d823e921e54bf7add999887fe7fc29",
      accounts:["58032310de21563367ec2b4aabaf1f9b388b2651727af869a47fbc5e65fd3815"]
      // See its defaults
    }
  },
  solidity: "0.8.20",
};