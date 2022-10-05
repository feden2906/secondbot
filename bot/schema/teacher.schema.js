const mongoose = require('mongoose');

const { Schema } = mongoose;
const teacherSchema = new Schema(
    {
        btnName: {
            type: String,
            required: true,
            trim: true,
        },
        btnNick: {
            type: String,
            required: true,
            trim: true,
        },
        skill: [{
            type: Schema.Types.ObjectId,
            ref: "Course",
            required: true,
            trim: true,
        }],
    }
)
const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;