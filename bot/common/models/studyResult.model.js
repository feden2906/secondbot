const StudyResult = require('../../schema/studyResult.schema');


exports.saveStudyResult = async (user, course, teacher, dayTimeNick, dayTimeData) => {
try {
    const textAfterSaving = `StudyResult  - is saved`;

    await StudyResult.create({ user, course, teacher, dayTimeNick, dayTimeData });
    console.log(textAfterSaving)
} catch (e) {
    console.log('user can`t save', e)
}

};

exports.getAllStudyResults = async () => {
    return StudyResult.find({})
};

exports.getStudyResultByNick = async (nick) => {
    return StudyResult.findOne({ nick })
};

exports.getStudyResultWithDayTime = async (teacherID) => {
    return StudyResult.find({ teacher: teacherID }).populate(['teacher', 'dayTime'])
}
