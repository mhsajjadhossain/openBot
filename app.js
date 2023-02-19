require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");
const { ask } = require("./services/ai");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  if (message.content.startsWith("!")) {
    await message.reply({
      content: "Please wait your message is processing!",
    });
    const messageContent = await message.content.replace("!", "");
    const answer = await ask(messageContent);
    message.reply({
      content: answer,
    });
  }
});

client.login(process.env.DISCORD_TOKEN);

// https://betterprogramming.pub/add-an-ai-to-your-discord-server-with-node-js-and-gpt-3-198b538cc05b
