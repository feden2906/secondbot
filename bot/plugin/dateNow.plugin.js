const dayJs = require('dayjs');

const now = new Date();
const day = now.getDate();
const month = now.getMonth() + 1;
const year = now.getFullYear();
const dateNow = `${day}.${(month.toString().length%2 === 0) ? month : "0" + month}.${year}`;

const currentDate = dayJs().format('YYYY-MM-DD HH:mm')

module.exports = { dateNow, currentDate };