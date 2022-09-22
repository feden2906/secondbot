const bot = require("../../connection/token.connection");

module.exports = bot.action("salon", async (ctx) => ctx.scene.enter("salonWizard"));