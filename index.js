const TelegramBot = require("node-telegram-bot-api");

const axios = require("axios");

let dotenv = require("dotenv");
const { response } = require("express");

dotenv.config();

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });

// bot.on("message", (option) => {
//   console.log("Message Recieved on the bot: ", option);

//   bot.sendMessage(
//     option.chat.id,
//     "Hello!, I am a bot. I am here to help you with ypor queries. Please type /help to know more about me."
//   );
// });

bot.onText(/\/joke/, async (option) => {
  const response = await axios.get(
    "http://www.official-joke-api.appspot.com/random_joke"
  );

  // console.log(response);
  console.log(response.data);

  const setup = response.data.setup;

  const punchline = response.data.punchline;

  bot.sendMessage(option.chat.id, setup + ",  " + punchline);
});
