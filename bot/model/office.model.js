const { DataTypes } = require('sequelize');
const db = require('../connection/db.connection');
module.exports = db.define('office',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            unique: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        admin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        story: {
            type: DataTypes.STRING
        }
    },
    {
        timestamps: true
    }
);
