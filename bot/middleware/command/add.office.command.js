const OfficeModel = require('../../model/office.model');
const { saveOffice } = require('../../common/sequelize/office.sequelize');
const bot = require('../../connection/token.connection');

module.exports = bot.command('add', async (ctx) => {
    try {
        const { text } = await ctx.update.message;
        const result = await text.slice(5).split(' ');
        const [name, story] = result;
        // console.log(text)
        // console.log(result)
        // console.log('name = ', name)
        // console.log('story = ', story)

        const { id } = ctx.chat;

        await saveOffice(name, story, String(id));

        return ctx.replyWithHTML(`Hi, <b>office create</b>!`);
    } catch (e) {
        console.log(e);
    }
});