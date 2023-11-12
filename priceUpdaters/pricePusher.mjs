import { getPriceFeed } from './priceGetter.mjs';
import { ethers } from "ethers";
import { fileURLToPath } from 'url';
import { resolve, dirname } from 'path';
import dotenv from 'dotenv';

// Get the path of the current module
const currentModulePath = fileURLToPath(import.meta.url);

// Determine the directory containing the current module
const currentModuleDir = dirname(currentModulePath);

// Resolve the path to the .env file
const envPath = resolve(currentModuleDir, '../.env');

dotenv.config({ path: envPath });
// ABI for the PriceOracleProxy contract
const priceOracleProxyAbi = [
  "function getPrice() external view returns (uint256)",
  "function updatePrice(int256 _conf, int256 _price, uint256 _publishTime) external",
];

// Address of the PriceOracleProxy contract
const priceOracleProxyAddress = "0xADBa034FDB5a6B3DD5675169a3f761f2F164504B"; 


// Provider for connecting to the Ethereum network
const provider = new ethers.providers.JsonRpcProvider("https://json-rpc.evm.shimmer.network");

// Signer for sending transactions to the Ethereum network
const privateKey = process.env.PRIVATE_KEY;
const signer = new ethers.Wallet(privateKey, provider);

// Contract instance for the PriceOracleProxy contract
const priceOracleProxy = new ethers.Contract(priceOracleProxyAddress, priceOracleProxyAbi, signer);

async function updateSmartContractPrice() {
    // Initialize variables to keep track of the last price and the last update time
    let lastPrice = 0;
    let lastUpdateTime = 0;
  
    while (true) {
      try {
        // Get the latest price data from your source
        const priceData = await getPriceFeed();
  
        // Check if the data is valid and has the required fields (price, conf, etc.)
        if (priceData && priceData.price && priceData.conf && priceData.publish_time) {
          const conf = parseInt(priceData.conf);
          const price = parseInt(priceData.price);
          const publishTime = parseInt(priceData.publish_time);
  
          // Check if the price is negative
          if (price <= 0) {
            console.log("Price is negative. Skipping update.");
          } else {
            // Calculate the price change percentage
            const priceChangePercentage = (price - lastPrice) / lastPrice * 100;
  
            // Check if the price change is more than 2% or if 30 minutes have passed
            if (priceChangePercentage > 2 || publishTime - lastUpdateTime >= 3600) {
              // Call the function to update the smart contract's price
              const tx = await priceOracleProxy.updatePrice(conf, price, publishTime);
              await tx.wait();
              console.log("Price updated successfully for the smart contract.");
  
              // Update the last price and last update time
              lastPrice = price;
              lastUpdateTime = publishTime;
            } else {
              console.log("Conditions not met for updating the price. Skipping update.");
            }
          }
        } else {
          console.error("Invalid or missing data from the price feed.");
        }
  
        // Get the latest price from the smart contract
        const price = await priceOracleProxy.getPrice();
        console.log("Latest price from the smart contract:", price.toString());
      } catch (error) {
        console.error("An error occurred:", error);
      }
  
      // Wait for the next iteration before checking conditions again
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }
  
  // Call the async function to start the process
  updateSmartContractPrice();
