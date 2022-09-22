const loadScreen = async (ctx) => {
    try {
        const msgInfo = await ctx.reply('LOADING...');
        let count = 0;

        while (count < 101) {
            await ctx.telegram.editMessageText(
                msgInfo.chat.id,
                msgInfo.message_id,
                msgInfo.message_id,
                `LOADING ${count}`,
            );
            count += 5;
        }

        if(count => 100) {
            setTimeout(async () => {
                await ctx.telegram.editMessageText(
                    msgInfo.chat.id,
                    msgInfo.message_id,
                    msgInfo.message_id,
                     `Поздравляем! 🎉 
Вакансия успешно отправлена Администратору!
Ожидайте. С Вами обязательно свяжутся.

но это не точно`
                );
            }, 1000)
        }

    } catch (e) {
        console.log(e.message)
    }
}

module.exports = { loadScreen }