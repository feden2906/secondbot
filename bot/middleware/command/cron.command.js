const bot = require('../../connection/token.connection');
const { getUsersByDelivered, updateUserByDelivered, updateUserByActive } = require('../../common/models/user.model');
const CronJob = require('cron').CronJob;


module.exports = bot.command('cron', async (ctx) => {
    try {

        let count = 0;

        const users = await getUsersByDelivered();
        const usersIDS = users.filter((el) => el.active === true).map(({ chatID }) => chatID)

        const cronJob = new CronJob({
            cronTime: '* */1 * * * *',
            onTick: async () => {
                if(!usersIDS.length) {
                    console.log('send all letters');
                    cronJob.stop();
                    return
                }

                const cronSend = new CronJob({
                    cronTime: '*/1 * * * * *',
                    onTick: async () => {
                        count++;
                        const rangeUsersIDS = usersIDS.splice(0, 10);

                        for await (userID of rangeUsersIDS) {
                            try {
                                await ctx.telegram.sendMessage(userID, 'test msg'); //I can send msg
                                await updateUserByDelivered(userID)
                            } catch (e) {
                                console.log(`NOT delivered to ${userID}`)
                                await updateUserByActive(userID)
                            }
                        }

                        if(count >= 10 || !usersIDS.length) {
                            cronSend.stop();
                            count = 0;
                            return;
                        }
                    },
                    onComplete: async () => {
                        await ctx.replyWithHTML(`<b>iteration end</b>`)
                    },
                    start: true
                })
            },
            onComplete: () => ctx.replyWithHTML('<b>COMPLETE</b>'),
            start: true
        })

    } catch (e) {
        console.log(e);
    }
});

// '*/5 * * * * *' every 5 seconds
// '* */5 * * * *' every 5 minutes
//About cron
//# ┌────────────── second (optional)
//# │ ┌──────────── minute
//# │ │ ┌────────── hour
//# │ │ │ ┌──────── day of month
//# │ │ │ │ ┌────── month
//# │ │ │ │ │ ┌──── day of week
//# │ │ │ │ │ │
//# │ │ │ │ │ │
//# * * * * * *