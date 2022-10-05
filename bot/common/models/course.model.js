const Course = require('../../schema/course.schema');
const User = require('../../schema/user.schema');


exports.saveCourse = async (btnName, btnNick, chatID) => {
    try {
        const textAfterSaving = `Course ${btnName} - is saved`;
        const textExist = `Course ${btnName} - is existed`;

        const foundUser = await User.findOne({ chatID });
        if(!foundUser) {
            console.log(`${chatID} u r not user`)
            return;
        }
        if(!foundUser.admin) {
            console.log('u r not admin');
            return;
        }

        const foundCourse = await Course.findOne({btnNick});
        if(!foundCourse) {
            await Course.create({ btnName, btnNick });
            console.log(textAfterSaving)
            return;
        }

        console.log(textExist);

    }catch (e) {
        console.log(e)
    }
};

exports.getAllCourses = async () => {
    return Course.find({})
};

exports.getCourseByNick = async (btnNick) => {
    return Course.findOne({ btnNick })
};