const bot = require('../../connection/token.connection');
const { saveUser } = require('../../common/models/user.model');

module.exports = bot.start(async (ctx) => {
    try {

        const { id, username = 'anon', first_name = 'anonFirst', last_name = 'anonLast' } = ctx.chat;
        await saveUser(String(id), username, first_name, last_name);

        return ctx.replyWithHTML(`Привет, <b>${first_name}</b>!`);
    } catch (e) {
        console.log(e);
    }
});