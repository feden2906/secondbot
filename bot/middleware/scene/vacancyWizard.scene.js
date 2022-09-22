const { Scenes, Composer } = require('telegraf');
const { doCity, doTitle, doStartStep, doFinishStep, doExperience } = require('./steps/vacancy.steps');

const startStep = new Composer();
startStep.action('vacancy', async (ctx) => {
    return doStartStep(ctx);
})


const titleStep = new Composer();
titleStep.on('text', async (ctx) => {
    return doTitle(ctx, ctx.message.text)
})

titleStep.action('front', async (ctx) => {
    await ctx.answerCbQuery();
    return doTitle(ctx, 'Front-end')
})

titleStep.action('back', async (ctx) => {
    await ctx.answerCbQuery();
    return doTitle(ctx, 'Back-end')
})

const experienceStep = new Composer();
experienceStep.on('text', async (ctx) => {
    return doExperience(ctx, ctx.message.text)
})

experienceStep.action('year1', async (ctx) => {
    await ctx.answerCbQuery();
    return doExperience(ctx, '1 год')
})

experienceStep.action('noexp', async (ctx) => {
    await ctx.answerCbQuery();
    return doExperience(ctx, 'без опыта')
})


const cityStep = new Composer();
cityStep.on('text', async (ctx) => {
    return doCity(ctx, ctx.message.text);
})

cityStep.action('kyiv', async (ctx) => {
    await ctx.answerCbQuery();
    return doCity(ctx, 'Киев');
})

cityStep.action('remote', async (ctx) => {
    await ctx.answerCbQuery();
    return doCity(ctx, 'удалённо');
})


const finishStep = new Composer()
finishStep.on('text', async (ctx) => {
    return doFinishStep(ctx, ctx.message.text)
})

finishStep.action('hrn', async (ctx) => {
    await ctx.answerCbQuery();
    return doFinishStep(ctx, '1000 грн')
})

finishStep.action('dollar', async (ctx) => {
    await ctx.answerCbQuery();
    return doFinishStep(ctx, '1000 💲')
})

module.exports = new Scenes.WizardScene("vacancyWizard", startStep, titleStep, experienceStep, cityStep, finishStep);