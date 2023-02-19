const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_SECRET,
});
console.log("process.env.OPEN_AI_SECRET :", process.env.OPEN_AI_SECRET);
const openai = new OpenAIApi(configuration);
async function ask(prompt) {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt,
    temperature: 0.7,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  const answer = response.data.choices[0].text;
  return answer;
}

// console.log(ask("names of planes"));
//Export the "ask" function
module.exports = {
  ask,
};
