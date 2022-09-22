const { Markup, Scenes, Composer } = require('telegraf');
const { doManicurePedicure, doEyeLashLips, doMaster, doStartStep, doChoiceDay, doFinishStep, doComment } = require('./steps/salon.steps');


const startStep = new Composer();
startStep.action('salon', async (ctx) => {
    return doStartStep(ctx);
})

const choiceServiceStep = new Composer();
choiceServiceStep.action('manicure', async (ctx) => {
    await ctx.answerCbQuery();
    return doManicurePedicure(ctx, 'МАНИКЮР')
})

choiceServiceStep.action('pedicure', async (ctx) => {
    await ctx.answerCbQuery();
    return doManicurePedicure(ctx, 'ПЕДИКЮР')
})

choiceServiceStep.action('lips', async (ctx) => {
    await ctx.answerCbQuery();
    return doEyeLashLips(ctx, 'ТАТУАЖ ГУБ')
})

choiceServiceStep.action('eyelash', async (ctx) => {
    await ctx.answerCbQuery();
    return doEyeLashLips(ctx, 'НАРАЩИВАНИЕ РЕСНИЦ')
})

const masterStep = new Composer();
masterStep.action('anna', async (ctx) => {
    await ctx.answerCbQuery();
    return doMaster(ctx, 'Анна')
})

masterStep.action('marina', async (ctx) => {
    await ctx.answerCbQuery();
    return doMaster(ctx, 'Марина')
})

masterStep.action('vika', async (ctx) => {
    await ctx.answerCbQuery();
    return doMaster(ctx, 'Виктория')
})

masterStep.action('dasha', async (ctx) => {
    await ctx.answerCbQuery();
    return doMaster(ctx, 'Дарья')
})


const choiceDayStep = new Composer();
choiceDayStep.action('monday', async (ctx) => {
    await ctx.answerCbQuery();
    return doChoiceDay(ctx, 'Понедельник')
})

choiceDayStep.action('tuesday', async (ctx) => {
    await ctx.answerCbQuery();
    return doChoiceDay(ctx, 'Вторник')
})

choiceDayStep.action('thursday', async (ctx) => {
    await ctx.answerCbQuery();
    return doChoiceDay(ctx, 'Четверг')
})

choiceDayStep.action('friday', async (ctx) => {
    await ctx.answerCbQuery();
    return doChoiceDay(ctx, 'Пятница')
})

const commentStep = new Composer();
commentStep.action('btn1', async (ctx) => {
    await ctx.answerCbQuery();
    return doComment(ctx, '10:00 - 12:00')
})

commentStep.action('btn2', async (ctx) => {
    await ctx.answerCbQuery();
    return doComment(ctx, '12:00 - 14:00')
})

commentStep.action('btn3', async (ctx) => {
    await ctx.answerCbQuery();
    return doComment(ctx, '14:00 - 16:00')
})

commentStep.action('btn4', async (ctx) => {
    await ctx.answerCbQuery();
    return doComment(ctx, '16:00 - 18:00')
})

const finishStep = new Composer();
finishStep.on('text', async (ctx) => {
    return doFinishStep(ctx, ctx.message.text);
})

finishStep.action('skip', async (ctx) => {
    return doFinishStep(ctx, ' ');
})
module.exports = new Scenes.WizardScene("salonWizard", startStep, choiceServiceStep, masterStep, choiceDayStep, commentStep, finishStep);