require('dotenv').config();
require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: "0.8.17",
  networks: {
    amoy: {
      url: process.env.AMOY_RPC || "https://polygon-amoy.g.alchemy.com/v2/oo8Ij67ra4jois2S_jaf6",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : []
    }
  }
};
