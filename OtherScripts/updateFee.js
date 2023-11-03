const Web3 = require('web3');
require('dotenv').config();
const NFTTradableAbi = require('../abi/FantomAuction.json');

// Set up a connection to an Ethereum node
const web3 = new Web3('https://json-rpc.evm.shimmer.network');

// Set up the Token Registry interface
const NFTTradableAddress = '0xe3dfDf85a02163C9d91Af72781F851b71d6da140';

// Define your private key
const privateKey = process.env.PRIVATE_KEY; // Read private key from environment variable

// Add your private key to the wallet
const account = web3.eth.accounts.wallet.add(privateKey);

// Instantiate the contract
const PriceFeed = new web3.eth.Contract(NFTTradableAbi, NFTTradableAddress);

// const platofrmFee = '20000000000000000000'
const platofrmFee = '30'

// Call the contract's method using the account for signing
PriceFeed.methods.updatePlatformFee(platofrmFee).send({
  from: account.address,
  gas: 1000000, // Adjust the gas limit as needed
})
  .on('transactionHash', function (hash) {
    console.log('Transaction Hash:', hash);
  })
  .on('receipt', function (receipt) {
    console.log('Transaction Receipt:', receipt);
  })
  .on('error', function (error) {
    console.error('Error:', error);
  });
