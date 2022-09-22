const bot = require("../../connection/token.connection");

module.exports = bot.action("vacancy", async (ctx) => ctx.scene.enter("vacancyWizard"));