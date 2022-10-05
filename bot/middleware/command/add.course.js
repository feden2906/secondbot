const bot = require('../../connection/token.connection');
const { saveCourse } = require('../../common/models/course.model');

module.exports = bot.command('addCourse', async (ctx) => {
    try {
        const { id } = ctx.chat;
        const { text } = await ctx.update.message;
        const result = await text.split(' ')
        const [, btnName, btnNick] = result;

        console.log('addCourse = ', result)

        await saveCourse(btnName, btnNick, id)

    } catch (e) {
        console.log(e);
    }
});