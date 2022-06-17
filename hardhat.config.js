require("@nomiclabs/hardhat-waffle");
require("dotenv").config()
require("@nomiclabs/hardhat-etherscan")

require("hardhat-gas-reporter")

require("solidity-coverage")

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

const RPC_URL = process.env.GOERLI_RPC
const ETHERSCAN_API_KEY = process.env.ETHERSCAN

module.exports = {
  defaultNetwork: "hardhat",
  networks:{
    goerli:{
      url: RPC_URL,
      accounts:[process.env.PRIVATE_KEY],
      chainId:5,
    },
    localhost: {
      url: "http://127.0.0.1:8545/",
      // accounts :Thanks hardhat
      chainId:31337,
    },
  },
  solidity: "0.8.8",
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },

  gasReporter: {
    enabled: true,
    outputFile: 'gas-report.txt',
    noColors: true,
    // currency: "USD",
    // coinmarketcap se api fetch to get USD values,
    // coinmarketcap: ...
    // token: "MATIC"
  }

};
