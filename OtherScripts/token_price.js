// Import the required libraries
const Web3 = require('web3')
// const tPriceFeedAbi  = require ('./internal/repository/rpc/contracts/abi/FantomPriceFeed')
const tPriceFeedAbi  = require ('../rpc/contracts/abi/FantomPriceFeed')


// Set up a connection to an Ethereum node
const web3 = new Web3('https://json-rpc.evm.testnet.shimmer.network');


// Set up the Token Registry interface
const tPriceFeedAddress = '0xDF6680Ac3088D7069FfBf8db7AccE51bD7B2CAd7';

// Instantiate the contract
const PriceFeed = new web3.eth.Contract(tPriceFeedAbi, tPriceFeedAddress);

// Call a contract function (example: tokensCount)
const tokenAddress = '0xdDAA129fac74994b52C691E67981DD08c2b9cC52'
PriceFeed.methods.getPrice(tokenAddress).call()
  .then(getPrice => {
    const tokenPrice = getPrice['0'];
    const convertedPrice = tokenPrice * 100000;
    // const convertedPrice = tokenPrice;
    console.log(convertedPrice);
  })
  .catch(error => {
    console.error('Error:', error);
  });




//   const Web3 = require('web3');
// require('dotenv').config();
// const tPriceFeedAbi  = require ('../rpc/contracts/abi/FantomPriceFeed');

// const web3 = new Web3('https://json-rpc.evm.testnet.shimmer.network');

// const tPriceFeedAddress = '0xDF6680Ac3088D7069FfBf8db7AccE51bD7B2CAd7';

// const privateKey = process.env.PRIVATE_KEY; // Read private key from environment variable
// const account = web3.eth.accounts.privateKeyToAccount(privateKey);
// web3.eth.accounts.wallet.add(account);

// const PriceFeed = new web3.eth.Contract(tPriceFeedAbi, tPriceFeedAddress);

// const tokenAddress = '0xdDAA129fac74994b52C691E67981DD08c2b9cC52';
// const oracle = '0x70e9fCC18c0a5219152E276A5635B005F71747AA';

// // const oracle = '0x8D78c62F73762E0d27419D88A75dAC0b60E63347';


// // Update Oracle (transact)
// // PriceFeed.methods.updateOracle(tokenAddress, oracle)
// PriceFeed.methods.registerOracle(tokenAddress, oracle)
//   .send({ from: account.address, gas: '3000000' })
//   .on('transactionHash', function (hash) {
//     console.log('Transaction Hash:', hash);
//   })
//   .on('confirmation', function (confirmationNumber, receipt) {
//     console.log('Confirmation Number:', confirmationNumber);
//     console.log('Receipt:', receipt);
//   })
//   .on('error', function (error) {
//     console.error('Error:', error);
//   });

//   // // Call a contract function (example: tokensCount)
// PriceFeed.methods.getPrice(tokenAddress).call() 
//   .then(getPrice => {
//     console.log('Get Price for token:', getPrice);
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });