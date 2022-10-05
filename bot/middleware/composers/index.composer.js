const bot = require('../../connection/token.connection');

const locationComposer = require('./location.composer');
const contactComposer = require('./contact.composer');

const composer = bot.use(locationComposer, contactComposer)

module.exports = composer;