const bot = require("../../connection/token.connection");

module.exports = bot.command("commands", async (ctx) => {
   try {
      return ctx.setMyCommands(
          [
         { command: "start", description: "Launch the bot" },
         { command: "menu", description: "Launch keyboard" },
         { command: "info", description: "Information" },
         { command: "salon", description: "Record appointment" },
         { command: "course", description: "Record appointment" },
         { command: "location", description: "Current user location" },
         { command: "contact", description: "Current user contact" },
      ]
      );
   } catch (e) {
      console.log(e);
   }
});