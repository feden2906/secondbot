const User = require('../../schema/user.schema');


exports.saveUser = async (account, username, firstName, lastName) => {
    const textAfterSaving = `User ${account} - ${username} is saved`;
    const textAfterUpdate = `User ${account} - ${username} is updated`;
    const adminWelcome = `Admin ${account} - ${username} in the house`;
    const helloUser = `User ${account} - ${username} in progress`;

    const foundUser = await User.findOne({ where: { account } });

    if(!foundUser && account == '602408031') {
        await User.create({ account, username, firstName, lastName, admin: true });
        console.log(adminWelcome)
        return;
    }

    if(!foundUser) {
        await User.create({ account, username, firstName, lastName });
        console.log(textAfterSaving)
        return;
    }

    if(foundUser.username !== username) {
        await User.update({ username }, { where: { account } });
        console.log(textAfterUpdate);
    }
    console.log(helloUser)
};

exports.getUserByNick = async (nick) => {
    return User.findOne({nick})
}

exports.getAllUsers = async () => {
    return User.find({})
};

exports.getUsersByDelivered = async (value = false) => {
    return User.find({
        raw: true,
        where: {
            delivered: value
        }
    })
}

exports.updateUserByDelivered = async (account) => {
    return User.update({ delivered: true }, { where: { account } })
}

exports.updateUserByActive = async (account) => {
    return User.update({ active: false }, { where: { account } })
}