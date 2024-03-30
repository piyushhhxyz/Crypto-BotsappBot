const fetch = require('node-fetch');
const axios = require('axios');

async function getCryptoMarketAnalysis() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/global');
        const data = await response.json();

        if (response.ok) {
            const { data: marketData } = data;

            const totalMarketCap = marketData.total_market_cap.usd;
            const total24hVolume = marketData.total_volume.usd;
            const bitcoinDominance = marketData.market_cap_percentage.btc;
            const activeCryptocurrencies = marketData.active_cryptocurrencies;
            const totalCryptocurrencies = marketData.total_cryptocurrencies;

            return {
                totalMarketCap,
                total24hVolume,
                bitcoinDominance,
                activeCryptocurrencies,
                totalCryptocurrencies,
            };
        } else {
            console.error('Error fetching crypto market analysis:', data);
            return null;
        }
    } catch (error) {
        console.error('Error fetching crypto market analysis:', error);
        return null;
    }
}

getCryptoMarketAnalysis()
    .then(marketAnalysis => {
        if (marketAnalysis) {
            console.log('Crypto Market Analysis:');
            console.log('Total Market Cap (USD):', marketAnalysis.totalMarketCap);
            console.log('Total 24h Volume (USD):', marketAnalysis.total24hVolume);
            console.log('Bitcoin Dominance (%):', marketAnalysis.bitcoinDominance);
            console.log('Active Cryptocurrencies:', marketAnalysis.activeCryptocurrencies);
        } else {
            console.log('Failed to fetch crypto market analysis.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });

// Function to fetch crypto market data
async function getCryptoMarketData() {
    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/global');
        const marketData = response.data.data;

        console.log('Crypto Market Insights:');
        console.log('-----------------------');
        console.log('Total Market Cap:', marketData.total_market_cap.usd);
        console.log('Total 24h Volume:', marketData.total_volume.usd);
        console.log('Bitcoin Dominance:', marketData.market_cap_percentage.btc.toFixed(2) + '%');
        console.log('Active Cryptocurrencies:', marketData.active_cryptocurrencies);
        console.log('Active Markets:', marketData.markets);
    } catch (error) {
        console.error('Error fetching crypto market data:', error);
    }
}

getCryptoMarketData();
