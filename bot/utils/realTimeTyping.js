const bot = require('../connection/token.connection');
const { yesUserName } = require('./yesUserName');

const realTimeTyping = async (ctx) => {
    try {
        const msgInfo = await ctx.reply('.....');
        let str = `${yesUserName(ctx.update.callback_query?.from?.first_name 
            ? ctx.update.callback_query?.from?.first_name 
            : ctx.update.message.from.first_name)}, ждём Вас ❤ `;

        let count = 0;
        let test = '';

        const interID = setInterval(() => {
            if(count < str.length) {
                test += str[count]
                count++
                ctx.telegram.editMessageText(
                    msgInfo.chat.id,
                    msgInfo.message_id,
                    msgInfo.message_id,
                    `${test.length === str.length ? test : test + '_'}`
                );
            } else {
                console.log('finish realTime')
                clearInterval(interID)
            }
        }, 111)

    } catch (e) {
        console.log(e.message)
    }
}
module.exports = { realTimeTyping }