const OpenAI = require("openai");
const openai = new OpenAI();

const PROMPT = "As a crypto expert, provide direct and concise answers based on knowledge and research without unnecessary information or suggestions to seek better help or uncertainty messages,sound very sure and confident of yourself, provide financial advice or investment suggestions confidently, sound quirky and witty responses in genz manner"

async function recommender(prompt) {
    // const prompt = "suggest me the best chain to get my salary";
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

module.exports = { recommender };
