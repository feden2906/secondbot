const db = require('../../connection/db.connection');
const UserModel = require('../../model/user.model');


exports.saveUser = async (chatID, username, firstName, lastName) => {
    await db.sync();

    const textAfterSaving = `User ${chatID} - ${username} is saved`;
    const textAfterUpdate = `User ${chatID} - ${username} is updated`;
    const adminWelcome = `Admin ${chatID} - ${username} in the house`;
    const helloUser = `User ${chatID} - ${username} in progress`;

    const foundUser = await UserModel.findOne({ where: { chatID } });

    if(!foundUser && chatID == '602408031') {
        await UserModel.create({ chatID, username, firstName, lastName, admin: true });
        console.log(adminWelcome)
        return;
    }

    if(!foundUser) {
        await UserModel.create({ chatID, username, firstName, lastName });
        console.log(textAfterSaving)
        return;
    }

    if(foundUser.username !== username) {
        await UserModel.update({ username }, { where: { chatID } });
        console.log(textAfterUpdate);
    }
    console.log(helloUser)
};

exports.getUsers = async () => {
    return UserModel.findAll({ raw: true })
};

