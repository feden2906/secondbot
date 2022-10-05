const { Composer, Markup } = require('telegraf');

const composer = new Composer();

const locationComposer = composer.command("location", ctx => {
    return ctx.reply(
        "Special buttons keyboard",
        Markup.keyboard([
            Markup.button.locationRequest("Send location"),
            Markup.button.text("/back"),
        ]).resize(),
    );
});

module.exports = locationComposer