const axios = require('axios');

async function livePrice(coinName) {
    try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${coinName}&vs_currencies=usd,inr`);
        const prices = response.data[coinName.toLowerCase()];
        if (prices) {
            const usdPrice = prices.usd;
            const inrPrice = prices.inr;
            console.log(`${coinName} Price (USD): $${usdPrice}`);
            console.log(`${coinName} Price (INR): ₹${inrPrice}`);
            return { usd: usdPrice, inr: inrPrice };
        } else {
            console.error(`Unable to fetch price for ${coinName}`);
            return null;
        }
    } catch (error) {
        console.error('Error fetching live price:', error);
        throw error; // Propagate the error for handling in the caller function
    }
}


// livePrice('bitcoin');
module.exports = { livePrice };
