const bot = require("../../connection/token.connection");

module.exports = bot.hears("vacancy", async (ctx) => ctx.scene.enter("vacancyWizard"));