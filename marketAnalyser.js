const fetch = require('node-fetch');

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

// Example usage
getCryptoMarketAnalysis()
    .then(marketAnalysis => {
        if (marketAnalysis) {
            console.log('Crypto Market Analysis:');
            console.log('Total Market Cap (USD):', marketAnalysis.totalMarketCap);
            console.log('Total 24h Volume (USD):', marketAnalysis.total24hVolume);
            console.log('Bitcoin Dominance (%):', marketAnalysis.bitcoinDominance);
            console.log('Active Cryptocurrencies:', marketAnalysis.activeCryptocurrencies);
            console.log('Total Cryptocurrencies:', marketAnalysis.totalCryptocurrencies);
        } else {
            console.log('Failed to fetch crypto market analysis.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
