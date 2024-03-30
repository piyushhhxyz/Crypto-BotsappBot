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

// Onboarding Link: http://localhost:5172/promptdefi-web/ - google login
// wallet address: 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4
// wallet private key: 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4
// wallet mnemonic: "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat"
// Coin swap available ?
