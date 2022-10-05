'use strict';
require("dotenv").config();
const mongoose = require('mongoose');
// const chalk = require('chalk');

mongoose.Promise = global.Promise;


// const mongoDB = mongoose.connect('mongodb://localhost:27017/test', function (err, res) {
const mongoDB = mongoose.connect(process.env.MONGO_DB, function (err, res) {
    if (err) {
        console.log (`ERROR connecting to ${process.env.MONGO_DB || 'mongo'}`, err);
    } else {
        console.log (`Succeeded connected to ${process.env.MONGO_DB || 'mongo'}`);
    }
});

module.exports = mongoDB;