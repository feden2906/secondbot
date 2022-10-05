const mongoose = require('mongoose');

const { Schema } = mongoose;
const studyResultSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            trim: true,
        },
        course: {
            type: Schema.Types.ObjectId,
            ref: "Course",
            required: true,
            trim: true,
        },
        teacher: {
            type: Schema.Types.ObjectId,
            ref: "Teacher",
            required: true,
            trim: true,
        },
        dayTimeNick: {
            type: Schema.Types.String,
            required: true,
            trim: true,
        },
        dayTimeData: {
            type: Schema.Types.Date,
            required: true,
            trim: true,
        },
    }
)
const StudyResult = mongoose.model('StudyResult', studyResultSchema);

module.exports = StudyResult;