const vacancy = {
    start: `Кем Вы хотите работать?`,
    city: `В какой городе Вы хотите работать?`,
    money: `Какую заработную плату Вы хотите?`,
    experience: 'Сколько лет опыт работы?',
    variant: 'выберите или введите свой вариант'
};

const salon = {
    start: `Выберите процедуру:`,
    doMaster: `Выберите мастера`,
    choiceDay: 'Выберите день',
    choiceTime: 'Выберите время',
    ask: `комментарий к записи`
}

const commands = {
    info: ` BOT with:
Node.js: 16.13.2
telegraf: 4.9.2
axios: 0.27.2,
cron: 2.1.0,
dayjs: 1.11.5,
dotenv: 16.0.2,
googleapis: 107.0.0,
mongodb: 4.10.0,
mongoose: 6.6.1,

Для просмотра записей на курсы:
https://docs.google.com/spreadsheets/d/1VQvLKmOpPL2DjotBevfocL59bp0SQw2evzj8S30VyWs`,
    setCommands: `[
{ command: "start", description: "Launch the bot" },
{ command: "menu", description: "Launch keyboard" },
{ command: "info", description: "Information" },
{ command: "salon", description: "Record appointment" },
{ command: "course", description: "Record appointment" },
{ command: "location", description: "Current user location" },
{ command: "contact", description: "Current user contact" }]`,
}

module.exports = { vacancy, salon, commands }