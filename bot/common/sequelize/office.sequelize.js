const db = require('../../connection/db.connection');
const OfficeModel = require('../../model/office.model');
const UserModel = require('../../model/user.model');


exports.saveOffice = async (name, story, chatID) => {
    await db.sync();

    const textAfterSaving = `Office ${name} - is saved`;
    const textExist = `Office ${name} - is existd`;

    const foundUser = await UserModel.findOne({ where: { chatID } });
    if(!foundUser) {
        console.log('u r not user')
        return;
    }
    if(!foundUser.admin) {
        console.log('u r not admin');
        return;
    }
    const foundOffice = await OfficeModel.findOne({ where: { name } });

    if(!foundOffice) {
        await OfficeModel.create({ name, story });
        console.log(textAfterSaving)
        return;
    }
    console.log(textExist)
};

exports.getOffices = async () => {
    return OfficeModel.findAll({ raw: true })
};

