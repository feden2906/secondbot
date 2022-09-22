const { yesUserName } = require('../../../utils/yesUserName');
const { loadScreen } = require('../../../utils/loadScreen');
const { Markup } = require('telegraf');
const { vacancy } = require('../../../constant/text.constant');

async function doTitle(ctx, point) {
    ctx.wizard.state.formData.title = point;
    return middleStep(ctx, vacancy.experience, `1 год`, `year1`, `без опыта`, `noexp`  )
}

async function doExperience(ctx, point) {
    ctx.wizard.state.formData.experience = point;
    return middleStep(ctx, vacancy.city, `Киев`, `kyiv`, `удалённо`, `remote` )
}

async function doCity(ctx, point) {
    ctx.wizard.state.formData.city = point;
    return middleStep(ctx, vacancy.money, `1000 грн`, `hrn`, `1000 💲`, `dollar` )
}

async function doStartStep(ctx) {
    try {
        ctx.wizard.state.formData = {};
        ctx.wizard.state.formData.userName = ctx.update.callback_query.from.username;
        ctx.wizard.state.formData.firstName = ctx.update.callback_query.from.first_name;
        ctx.wizard.state.formData.lastName = ctx.update.callback_query.from.last_name;

        await ctx.replyWithHTML(`<b>${vacancy.start}</b>
            <i>${vacancy.variant}</i>`, Markup.inlineKeyboard(
            [Markup.button.callback('Front-end', 'front'),
                Markup.button.callback('Back-end', 'back')]))

        return ctx.wizard.next()
    } catch (e) {
        console.log(e)
    }
}

async function middleStep(ctx, bigText, button1, data1, button2, data2) {
    try {
        await ctx.replyWithHTML(`<b>${bigText}</b> 
            <i>${vacancy.variant}</i>`, Markup.inlineKeyboard(
            [Markup.button.callback(`${button1}`, `${data1}`),
                Markup.button.callback(`${button2}`, `${data2}`)]))
        return ctx.wizard.next()
    } catch (e) {
        console.log(e)
    }
}

async function doFinishStep(ctx, point){
    try {
        ctx.wizard.state.formData.condition = point;
        const wizardData = ctx.wizard.state.formData;
        await ctx.replyWithHTML(`
        Telegram:  @${wizardData.userName}
        Имя:  ${yesUserName(wizardData.firstName)}
        Фамилия:  ${yesUserName(wizardData.lastName)}
        Должность:  ${wizardData.title}
        Опыт работы:  ${wizardData.experience}
        Место работы:  ${wizardData.city}
        Заработная плата:  ${wizardData.condition}
        `);

        await loadScreen(ctx);

        return ctx.scene.leave();
    } catch (e) {
        console.log(e)
    }
}

module.exports = { doStartStep, doFinishStep, doCity, doTitle, doExperience }