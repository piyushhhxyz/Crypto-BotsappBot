const axios = require('axios');

const gasFeeUrl = 'https://api.polygonscan.com/api?module=proxy&action=eth_gasPrice';

async function getMaticGasFee() {
  try {
    const response = await axios.get(gasFeeUrl);
    const gasPriceInWei = response.data.result;
    const gasPriceInGwei = parseInt(gasPriceInWei, 16) / 1e9;
    console.log('Matic Gas Fee:', gasPriceInGwei, 'Gwei');
  } catch (error) {
    console.error('Error getting Matic gas fee:', error);
  }
}

getMaticGasFee();