const bot = require('../../connection/token.connection');
const { saveTeacher } = require('../../common/models/teacher.model');

module.exports = bot.command('addTeacher', async (ctx) => {
    try {
        const { id } = ctx.chat;
        const { text } = await ctx.update.message;
        const result = await text.split(' ')
        let [, btnName, btnNick, ...skill ] = result;

        console.log('addTeacher = ', result)

        await saveTeacher(btnName, btnNick, skill, id)

    } catch (e) {
        console.log(e);
    }
});