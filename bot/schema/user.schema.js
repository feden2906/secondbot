const mongoose = require('mongoose');

const { Schema } = mongoose;
const userSchema = new Schema(
    {
        account: {
            type: String,
            allowNull: false
        },
        username: {
            type: String
        },
        firstName: {
            type: String,
            allowNull: true
        },
        lastName: {
            type: String,
            allowNull: true
        },
        admin: {
            type: Boolean,
            defaultValue: false
        },
        delivered: {
            type: Boolean,
            defaultValue: false,
            allowNull: false
        },
        active: {
            type: Boolean,
            defaultValue: true,
            allowNull: false
        }
    },
    {
        timestamps: true
    }
)
const User = mongoose.model('User', userSchema);

module.exports = User;