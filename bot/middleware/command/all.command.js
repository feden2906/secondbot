const { Markup } = require("telegraf");
const bot = require("../../connection/token.connection");
const { getUsers } = require('../../common/sequelize/user.sequelize');
const { generateContent, generateFileName, generateFilePath, saveFile, sendFile, deleteFile } = require('../../common/users/input-output.user');

module.exports = bot.command('all', async (ctx) => {
    try {
        //Get content
        const users = await getUsers();
        const content = generateContent(users);

        const fileName = generateFileName();
        const filePath = generateFilePath(fileName);

        //Send file
        await saveFile(content, filePath);
        await sendFile(ctx, fileName, filePath);
        await deleteFile(filePath)

        return;
    } catch (e) {
        console.log(e);
    }
});