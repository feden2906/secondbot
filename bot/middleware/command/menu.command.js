const { Markup } = require("telegraf");
const bot = require("../../connection/token.connection");

module.exports = bot.command(['menu', 'back'], async ctx => {
    try {

            return await ctx.reply(
                "Custom buttons keyboard",
                Markup.keyboard([
                    ['/start', '/info'],
                    ['/salon', '/course']
                ])
                    .oneTime()
                    .resize(),
            );
    } catch (e) {
        console.log(e);
    }
});