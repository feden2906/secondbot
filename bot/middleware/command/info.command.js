const bot = require('../../connection/token.connection');
const { commands } = require('../../constant/text.constant');

module.exports = bot.command('info', async (ctx) => {
    try {
        await ctx.replyWithHTML(commands.info, {
            disable_web_page_preview: true
        })
    } catch (e) {
        console.log(e)
    }
})