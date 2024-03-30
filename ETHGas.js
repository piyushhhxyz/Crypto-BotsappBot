const fetch = require('node-fetch');
const { getNetworkGasPrice } = require('@enzoferey/network-gas-price');

async function fetchGasPrice(coin) {
    try {
        if(coin === "matic") coin = "polygon";
        
        const networks = ['ethereum', 'polygon', 'goerli', 'sepolia', 'rinkeby', 'mumbai'];
        
        const gasPrice = await getNetworkGasPrice(coin.toLowerCase(), fetch);
        if(coin === "arbitrum") return 0.01;
        if(coin === "optimism") return 0.06;
        return gasPrice ? gasPrice.average.maxFeePerGas : null;
    } catch (error) {
        console.error('Error fetching gas price:', error);
        return null;
    }
}

module.exports = { fetchGasPrice };

