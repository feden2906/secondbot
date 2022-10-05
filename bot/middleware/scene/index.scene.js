const { Scenes, session } = require('telegraf');
const bot = require('../../connection/token.connection');

const vacancyWizard = require('./vacancyWizard.scene');
const salonWizard = require('./salonWizard.scene');
const studyWizard = require('./studyWizard.scene');

const stage = new Scenes.Stage([vacancyWizard, salonWizard, studyWizard]);

bot.use(session());
bot.use(stage.middleware());

module.exports = stage;