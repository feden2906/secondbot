const bot = require("../../connection/token.connection");

module.exports = bot.hears(/(привет бот)/i, async (ctx) => {
    ctx.reply('Привет! Как дела?')
});