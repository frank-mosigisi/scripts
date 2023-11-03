const Web3 = require('web3');
require('dotenv').config();
const tPriceFeedAbi  = require ('./abi/FantomPriceFeed.json');

const web3 = new Web3('https://json-rpc.evm.shimmer.network');

const tPriceFeedAddress = '0xDe79226d2ff5F00C565De71B8e5b22330E182aE8';

const privateKey = process.env.PRIVATE_KEY; // Read private key from environment variablecd
const account = web3.eth.accounts.privateKeyToAccount(privateKey);
web3.eth.accounts.wallet.add(account);

const PriceFeed = new web3.eth.Contract(tPriceFeedAbi, tPriceFeedAddress);

const tokenAddress = '0xBEb654A116aeEf764988DF0C6B4bf67CC869D01b';
const oracle = '0xADBa034FDB5a6B3DD5675169a3f761f2F164504B';

// PriceFeed.methods.updateOracle(tokenAddress, oracle)
PriceFeed.methods.registerOracle(tokenAddress, oracle)
  .send({ from: account.address, gas: '3000000' })
  .on('transactionHash', function (hash) {
    console.log('Transaction Hash:', hash);
  })
  .on('confirmation', function (confirmationNumber, receipt) {
    console.log('Confirmation Number:', confirmationNumber);
    console.log('Receipt:', receipt);
  })
  .on('error', function (error) {
    console.error('Error:', error);
  });