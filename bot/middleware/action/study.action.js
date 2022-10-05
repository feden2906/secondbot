const bot = require("../../connection/token.connection");

module.exports = bot.action("study", async (ctx) => ctx.scene.enter("studyWizard"));