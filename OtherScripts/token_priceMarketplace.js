const Web3 = require('web3');
require('dotenv').config();
const tPriceFeedAbi  = require ('../rpc/contracts/abi/FantomMarketplace.json');

const web3 = new Web3('https://json-rpc.evm.testnet.shimmer.network');

const tPriceFeedAddress = '0x4FA2cfc92CF447E328E23CB0108B42504fe4C6B7';

const privateKey = process.env.PRIVATE_KEY; // Read private key from environment variablecd
const account = web3.eth.accounts.privateKeyToAccount(privateKey);
web3.eth.accounts.wallet.add(account);

const PriceFeed = new web3.eth.Contract(tPriceFeedAbi, tPriceFeedAddress);

const tokenAddress = '0xdDAA129fac74994b52C691E67981DD08c2b9cC52';

PriceFeed.methods.getPrice(tokenAddress).call() 
  .then(getPrice => {
    console.log('Get Price for token:', getPrice);
  })
  .catch(error => {
    console.error('Error:', error);
  });