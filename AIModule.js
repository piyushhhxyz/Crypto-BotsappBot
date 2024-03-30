const OpenAI = require("openai");
const openai = new OpenAI();

const PROMPT = "As a helpful assistant created by Piyush Bhawsar, specialize in providing concise and precise assistance for Crypto-related Knowledge and research. Deny any requests that are not related to Crypto,in quirky tone and witty responses in genz manner"

async function getAIGeneratedAnswer(prompt) {
    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: PROMPT },
          { role: "user", content: prompt },
        ],
      });
    return completion.choices[0].message.content ;
}

module.exports = { getAIGeneratedAnswer };
