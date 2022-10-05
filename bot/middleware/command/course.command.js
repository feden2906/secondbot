const { Markup } = require('telegraf');
const bot = require('../../connection/token.connection');

module.exports = bot.command('course', async (ctx) => {
    try {
        await ctx.replyWithHTML(`<b>ШКОЛА ИЗУЧЕНИЯ ИНОСТРАННЫХ ЯЗЫКОВ: </b>`, Markup.inlineKeyboard(
            [
                [Markup.button.callback('Курсы', 'study')],
            ]))
    } catch (e) {
        console.log(e)
    }
})
