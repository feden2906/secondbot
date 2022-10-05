const { Composer, Markup } = require('telegraf');

const composer = new Composer();

const contactComposer = composer.command("contact", ctx => {
    return ctx.reply(
        "Special buttons keyboard",
        Markup.keyboard([
            Markup.button.contactRequest("Send contact"),
            Markup.button.text("/back"),
        ]).resize(),
    );
});

module.exports = contactComposer