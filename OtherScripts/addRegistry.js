const Web3 = require('web3');
require('dotenv').config();
const ItemAddedToRegistryAbi = require('../abi/FantomMarketplace.json');

// Set up a connection to an Ethereum node
const web3 = new Web3('https://json-rpc.evm.shimmer.network');

const ItemAddedToRegistryAddress = '0xcE7417F1dba9E3b25E8F883f69a43aFE5A818404';

// Define your private key
const privateKey = process.env.PRIVATE_KEY; // Read private key from environment variable

// Add your private key to the wallet
const account = web3.eth.accounts.wallet.add(privateKey);

// Instantiate the contract
const ItemAdded = new web3.eth.Contract(ItemAddedToRegistryAbi, ItemAddedToRegistryAddress);

const addressRegistry = "0x8c991D9c99cc0Fe038b80c8716733fedC0156029"

// Call the contract's method using the account for signing
ItemAdded.methods.updateAddressRegistry(addressRegistry).send({
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
