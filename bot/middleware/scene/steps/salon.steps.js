const { yesUserName } = require('../../../utils/yesUserName');
const { loadScreen } = require('../../../utils/loadScreen');
const { Markup } = require('telegraf');
const { salon, vacancy } = require('../../../constant/text.constant');
const { realTimeTyping } = require('../../../utils/realTimeTyping');

async function doManicurePedicure(ctx, point){
    ctx.wizard.state.formData.manPed = point.toLowerCase();
    return middleStep(ctx, salon.doMaster, `Анна`, `anna`, `Марина`, `marina`)
}

async function doEyeLashLips(ctx, point){
    ctx.wizard.state.formData.eyeLip = point.toLowerCase();
    return middleStep(ctx, salon.doMaster, `Виктория`, `vika`, `Дарья`, `dasha`)
}

async function doMaster(ctx, point){
    ctx.wizard.state.formData.doMaster = point;
    return dayTime(ctx, salon.choiceDay, `Понедельник`, `monday`, `Вторник`, `tuesday`, `Четверг`, `thursday`, `Пятница`, `friday`)
}

async function doChoiceDay(ctx, point){
    ctx.wizard.state.formData.choiceDay = point;
    return dayTime(ctx, salon.choiceTime, `10:00 - 12:00`, `btn1`, `12:00 - 14:00`, `btn2`, `14:00 - 16:00`, `btn3`, `16:00 - 18:00`, `btn4`)
}

async function doComment(ctx, point){
    ctx.wizard.state.formData.choiceTime = point;
    try {
        await ctx.replyWithHTML(`${salon.ask}`, Markup.inlineKeyboard(
            [Markup.button.callback('ПРОПУСТИТЬ', 'skip')]));
        return ctx.wizard.next()
    } catch (e) {
        console.log(e)
    }
}

async function doStartStep(ctx){
    try {
        ctx.wizard.state.formData = {};
        ctx.wizard.state.formData.userName = ctx.update.callback_query.from.username;
        ctx.wizard.state.formData.firstName = ctx.update.callback_query.from.first_name;
        ctx.wizard.state.formData.lastName = ctx.update.callback_query.from.last_name;

        await ctx.replyWithHTML(`<b>${salon.start}</b>`, Markup.inlineKeyboard(
            [[Markup.button.callback('МАНИКЮР', 'manicure'),
                Markup.button.callback('НАРАЩИВАНИЕ РЕСНИЦ', 'eyelash')],
                [Markup.button.callback('ПЕДИКЮР', 'pedicure'),
                    Markup.button.callback('ТАТУАЖ ГУБ', 'lips')]]))

        return ctx.wizard.next()
    } catch (e) {
        console.log(e)
    }
}

async function middleStep(ctx, bigText, button1, data1, button2, data2){
    try {
        await ctx.replyWithHTML(`<b>${bigText}</b>`, Markup.inlineKeyboard(
            [Markup.button.callback(`${button1}`, `${data1}`),
                Markup.button.callback(`${button2}`, `${data2}`)]))
        return ctx.wizard.next()
    } catch (e) {
        console.log(e)
    }
}

async function dayTime(ctx, bigText, button1, data1, button2, data2, button3, data3, button4, data4,){
    try {
        await ctx.replyWithHTML(`<b>${bigText}</b>`, Markup.inlineKeyboard(
            [[Markup.button.callback(`${button1}`, `${data1}`),
                Markup.button.callback(`${button2}`, `${data2}`)],
                [Markup.button.callback(`${button3}`, `${data3}`),
                    Markup.button.callback(`${button4}`, `${data4}`)]]))
        return ctx.wizard.next()
    } catch (e) {
        console.log(e)
    }
}

async function doFinishStep(ctx, point){
    try {
        ctx.wizard.state.formData.comment = await (point ? point : ctx.update.message.text)
        const wizardData = ctx.wizard.state.formData;
        await realTimeTyping(ctx);
        await ctx.replyWithHTML(`
Telegram :  @${wizardData.userName}
Услуга :  ${wizardData.manPed ? wizardData.manPed : wizardData.eyeLip}
Мастер :  ${wizardData.doMaster}
День :  ${wizardData.choiceDay}
Время :  ${wizardData.choiceTime}
Комметарий :  ${wizardData.comment}`);

        return ctx.scene.leave();
    } catch (e) {
        console.log(e)
    }
}

module.exports = { doStartStep, doFinishStep, doManicurePedicure, doEyeLashLips, doChoiceDay, doMaster, doComment }