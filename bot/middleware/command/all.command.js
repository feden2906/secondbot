const bot = require("../../connection/token.connection");
const { generateContent, generateFileName, generateFilePath, saveFile, sendFile, deleteFile } = require('../../common/users/input-output.user');
const { getAllUsers } = require('../../common/models/user.model');

module.exports = bot.command('all', async (ctx) => {
    try {
        //Get content
        const users = await getAllUsers();
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