const { Scenes, session } = require("telegraf");
const bot = require("../../connection/token.connection");

const oneWizard = require("./oneWizard.scene");
const twoWizard = require("./twoWizard.scene");
const vacancyWizard = require("./vacancyWizard.scene");
const salonWizard = require("./salonWizard.scene");

const stage = new Scenes.Stage([oneWizard, twoWizard, vacancyWizard, salonWizard]);

bot.use(session());
bot.use(stage.middleware());

module.exports = stage;