const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { getAIGeneratedAnswer }  = require('./AIModule');
const { recommender }  = require('./recommender');
const { fetchGasPrice } = require('./ETHGas');


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
    else{
    //  (message.body.startsWith('')) {
        const userPrompt = message.body;
        const aiResponse = await getAIGeneratedAnswer(userPrompt);
        message.reply(aiResponse);
    }
});
client.initialize();
