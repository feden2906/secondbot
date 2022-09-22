const { Markup } = require('telegraf');
const bot = require('../../connection/token.connection');
const db = require('../../connection/db.connection');
const UserModel = require('../../model/user.model');
const { saveUser } = require('../../common/sequelize/user.sequelize');

module.exports = bot.start(async (ctx) => {
    try {

        const { id, username = 'anon', first_name = 'anonFirst', last_name = 'anonLast' } = ctx.chat;
        await saveUser(String(id), username, first_name, last_name);

        return ctx.replyWithHTML(`Hi, <b>${first_name}</b>!`);
    } catch (e) {
        console.log(e);
    }
});