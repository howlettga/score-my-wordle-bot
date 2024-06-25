import { WordleBot } from "./bot";
import { GoogleSheet } from "./google-sheets";

console.log("Wordle bot booting...");

GoogleSheet.initAuth().then((auth) => {
  const sheet = new GoogleSheet(process.env.GOOGLE_SHEET_ID as string, auth);
  const bot = new WordleBot(sheet);

  bot.start();
  console.log("Wordle bot running...");
}).catch((err) => {
  if (err.message === "INVALID_GOOGLE_AUTH_METHOD") {
    console.error("Invalid Google Auth Method Please set the required GOOGLE_AUTH_METHOD environment variable. Exiting...");
    process.exit(1);
  } else {
    console.error(err);
    process.exit(1);
  }
});
