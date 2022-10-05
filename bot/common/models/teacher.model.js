const Teacher = require('../../schema/teacher.schema');
const Course = require('../../schema/course.schema');
const User = require('../../schema/user.schema');


exports.saveTeacher = async (btnName, btnNick, skill, chatID) => {
    try {
        const textAfterSaving = `Teacher ${btnName} - is saved`;
        const textExist = `Teacher ${btnName} - is existed`;

        const foundUser = await User.findOne({ chatID });
        if(!foundUser) {
            console.log(`${chatID} u r not user`)
            return;
        }
        if(!foundUser.admin) {
            console.log('u r not admin');
            return;
        }

        const foundCourses = await Course.find({ _id: skill }).exec();
        if(!foundCourses) {
            console.log('wrong course')
            return;
        }

        const foundTeacher = await Teacher.findOne({ btnNick });
        if(!foundTeacher) {
            await Teacher.create({ btnName, btnNick, skill });
            console.log(textAfterSaving)
            return;
        }

        console.log(textExist);

    } catch (e) {
        console.log(e)
    }
};

exports.getTeachersBySkills = async (skillID) => {
    return Teacher.find({ skill: { $in: [skillID] } })
}

exports.getTeacherByNick = async (nick) => {
    return Teacher.findOne({ nick })
};

exports.getAllTeachers = async () => {
    return Teacher.find({})
};