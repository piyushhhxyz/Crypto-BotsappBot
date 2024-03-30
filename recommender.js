// Market Aanlyser,
// data: Total Market Cap, 24-hour volume, Bitcoin Dominance, active cryptocurrencies, and total cryptocurrencies. 

const OpenAI = require("openai");
const openai = new OpenAI();
const axios = require('axios');


let marketData = {}; 
async function getCryptoMarketData() {
    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/global');
        marketData = {
            totalMarketCap: response.data.data.total_market_cap.usd,
            total24hVolume: response.data.data.total_volume.usd,
            bitcoinDominance: response.data.data.market_cap_percentage.btc.toFixed(2) + '%',
            activeCryptocurrencies: response.data.data.active_cryptocurrencies,
            activeMarkets: response.data.data.markets
        };
    } catch (error) {
        console.error('Error fetching crypto market data:', error);
        throw error; // Propagate the error for handling in the caller function
    }
}

// (async () => {
//     try {
//         await getCryptoMarketData();
//         console.log('Market Data:', marketData); // Print the market data object
//     } catch (error) {
//         console.error('Error:', error);
//     }
// })();



async function recommender(prompt) {
    await getCryptoMarketData();
    const PROMPT = `you are a crypto bot expert, analyze the market and give brief suggestions:
    ### 
    Total Market Cap: Overall value of all cryptocurrencies, indicating market health and size. Reflects market trends like growth, contraction, or shifts in sentiment.

    Total 24h Volume: Trading volume of cryptocurrencies in the last 24 hours. High volume suggests increased activity, liquidity, and investor interest, impacting price movements and volatility.

    Bitcoin Dominance: Percentage of Bitcoin's market cap compared to all cryptocurrencies. Changes signal shifts in investor preference between Bitcoin and altcoins, affecting market dynamics and strategies.

    Active Cryptocurrencies: Number of actively traded cryptocurrencies, showing market diversity, competition, and trends like new launches, token popularity, and saturation.

    Active Markets: Count of active trading pairs or markets for cryptocurrencies. More active markets indicate higher accessibility, liquidity, and trading opportunities globally, reflecting crypto adoption across exchanges.
    ###
    and these are the current market stats and data points
    Total Market Cap: ${marketData.totalMarketCap}
    Total 24h Volume: ${marketData.total24hVolume}
    Bitcoin Dominance: ${marketData.bitcoinDominance}
    Active Cryptocurrencies: ${marketData.activeCryptocurrencies}
    Active Markets: ${marketData.activeMarkets}
    `;

    const completion = await openai.chat.completions.create({
        model: "gpt-4-0125-preview",
        messages: [
          { role: "system", content: PROMPT },
          { role: "user", content: prompt },
        ],
      });
    // console.log(completion.choices[0].message.content) ;
    return completion.choices[0].message.content;
}
// recommender("what is the current market scenario?");
module.exports = { recommender };
