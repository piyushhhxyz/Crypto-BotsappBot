const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { getAIGeneratedAnswer }  = require('./AIModule');
const { recommender }  = require('./recommender');
const { fetchGasPrice } = require('./ETHGas');
const { livePrice } = require('./livePrice');


const client = new Client({
    authStrategy: new LocalAuth(),
});

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});
client.on('ready', () => {
    console.log('\x1b[32mClient Bot: Ready && Running!\x1b[0m');
});


client.on('message', async(message) => {
    if (message.body.startsWith('@gas')) {
        const coin = message.body.replace('@gas ', '').toLowerCase();
        const gasPrice = await fetchGasPrice(coin);
        
        if (gasPrice !== null) {
            message.reply(`${coin.toUpperCase()} Gas Fee: ${gasPrice} Gwei`);
        } else {
            message.reply('Error fetching gas price or invalid coin.');
        }
    }
    else if (message.body.startsWith('@rec ')) {
        const userPrompt = message.body.replace('@rec ', '');
        const aiResponse = await recommender(userPrompt);
        message.reply(aiResponse);
    }
    else if (message.body.startsWith('@price ')) {
        const coin = message.body.replace('@price ', '');
        const prices = await livePrice(coin);
        if (prices !== null) {
            const usdPrice = prices.usd;
            const inrPrice = prices.inr;
            message.reply(`Price of ${coin.toUpperCase()} in USD: $${usdPrice}\nPrice of ${coin.toUpperCase()} in INR: ₹${inrPrice}`);
        } else {
            message.reply('Error fetching live price or invalid coin.');
        }
    } 
    else{
    //  (message.body.startsWith('')) {
        const userPrompt = message.body;
        const aiResponse = await getAIGeneratedAnswer(userPrompt);
        message.reply(aiResponse);
    }
});
client.initialize();
