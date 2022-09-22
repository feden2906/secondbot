const { Markup } = require('telegraf');
const bot = require('../../connection/token.connection');

module.exports = bot.command('record', async (ctx) => {
    try {
        await ctx.replyWithHTML(`<b>САЛОН КРАСОТЫ "У МАКСИМА"  </b>`, Markup.inlineKeyboard(
            [[Markup.button.callback(`ЗАПИСАТЬСЯ К МАСТЕРУ`, 'salon')],
                [Markup.button.callback('ПОДАТЬ РЕЗЮМЕ', 'vacancy')]]))
    } catch (e) {
        console.log(e)
    }
})
