require("dotenv").config();
const { Markup, Scenes, Composer } = require('telegraf');
const { getAllCourses, getCourseByNick } = require('../../common/models/course.model');
const { getAllTeachers, getTeachersBySkills, getTeacherByNick } = require('../../common/models/teacher.model');
const { getUserByNick } = require('../../common/models/user.model');
const { saveStudyResult } = require('../../common/models/studyResult.model');
const { useCalendarWeek, useCalendarDay, createCalendar } = require('../../utils/calendar');
const { realTimeTyping } = require('../../utils/realTimeTyping');
const { insertResultSheets } = require('../../plugin/googleSheets/gsapi.plugin');
const { currentDate } = require('../../plugin/dateNow.plugin');


const startStep = new Composer();
startStep.action('study', async (ctx) => {
    try {
        ctx.wizard.state.courseData = {};
        ctx.wizard.state.courseData.username = ctx.update.callback_query.from.username;
        ctx.wizard.state.courseData.first_name = ctx.update.callback_query.from.first_name;

        const allCourses = await getAllCourses();

        function createButtons(x){
            return x.map((el) => [Markup.button.callback(`${el.btnName}`, `${el.btnNick}`)]
            )
        }

        await ctx.answerCbQuery();
        await ctx.replyWithHTML(`<b>🧑‍🎓 Курсы иностранных языков:</b>`, Markup.inlineKeyboard(
            createButtons(allCourses)));

        return ctx.wizard.next();
    } catch (e) {
        console.log(e);
    }
});

const courseStep = new Composer();
getAllCourses().then((allCourses) => allCourses.map((item) => courseStep.action(item.btnNick, async (ctx) => {
    try {
        ctx.wizard.state.courseData.course = {};
        ctx.wizard.state.courseData.course.btnNick = item.btnNick;
        ctx.wizard.state.courseData.course.btnName = item.btnName;

        const buttonCourse = await getCourseByNick(item.btnNick);
        const courses = await getCourseByNick(buttonCourse.btnNick);
        const currTeacher = await getTeachersBySkills(courses._id);

        function createButtons(x){
            return x.map((el) => [Markup.button.callback(`${el.btnName}`, `${el.btnNick}`)]
            )
        }

        await ctx.answerCbQuery();
        await ctx.replyWithHTML(`<b>🧐 Выберите преподавателя:</b>`, Markup.inlineKeyboard(
            createButtons(currTeacher)), { columns: 2 })

        return ctx.wizard.next();
    } catch (e) {
        console.log(e);
    }
})))

const weekStep = new Composer();
getAllTeachers().then((allTeachers) => allTeachers.map((item) => weekStep.action(item.btnNick, async (ctx) => {
    try {
        ctx.wizard.state.courseData.teacher = {};
        ctx.wizard.state.courseData.teacher.btnNick = item.btnNick;
        ctx.wizard.state.courseData.teacher.btnName = item.btnName;

        const weekCalendar = await useCalendarWeek(item.btnNick)

        function createButtons(x){
            return x.map((el) => [Markup.button.callback(`${el.btnName}`,
                `${el.btnNick}`)]
            )
        }

        await ctx.answerCbQuery();
        await ctx.replyWithHTML(`<b>📅 Выберите дату занятия:</b>`, Markup.inlineKeyboard(
            createButtons(weekCalendar)))

        return ctx.wizard.next();
    } catch (e) {
        console.log(e);
    }
})))


const dayStep = new Composer();
createCalendar().then(({weekCalendar}) => weekCalendar.map((item) => dayStep.action(item.btnNick, async (ctx) => {
    try {

        if(item.btnName === 'Нет свободных мест') {
            await ctx.answerCbQuery();
            await ctx.reply(' это так не работает 😉 \n все места уже заняты');
            return ctx.scene.leave();
        }

        ctx.wizard.state.courseData.week = {};
        ctx.wizard.state.courseData.week.btnNick = item.btnNick;
        ctx.wizard.state.courseData.week.btnName = item.btnName;

        let timeCalendar = await useCalendarDay(item.btnNick);

        function createButtons(x){
            return x.map((el) => [Markup.button.callback(el.btnName,
                el.btnNick)]
            )
        }

        await ctx.answerCbQuery();
        await ctx.replyWithHTML(`<b>⌚ Выберите время занятия:</b>`, Markup.inlineKeyboard(
            createButtons(timeCalendar)))

        return ctx.wizard.next();
    } catch (e) {
        console.log(e);
    }
})))

const resultStep = new Composer();
createCalendar().then(({dayCalendar}) => dayCalendar.map((item) => resultStep.action(item.btnNick, async (ctx) => {
    try {
        ctx.wizard.state.courseData.day = {};
        ctx.wizard.state.courseData.day.btnNick = item.btnNick;
        ctx.wizard.state.courseData.day.btnName = item.btnName;
        ctx.wizard.state.courseData.day.dayTimeData = item.dayTimeData;

        const wizardData = ctx.wizard.state.courseData;

        await ctx.answerCbQuery();
        await ctx.replyWithHTML(`<b>Подтвердите запись:</b> 
            <i>        
 Telegram:  @${wizardData.username}
 Курс:  ${wizardData.course.btnName}
 Преподователь:  ${wizardData.teacher.btnName}
 Дата:  ${wizardData.week.btnName}
 Время:  ${wizardData.day.btnName}</i>`,
            Markup.inlineKeyboard(
                [Markup.button.callback(`✅ ПОДТВЕРДИТЬ`, `accept`),
                    Markup.button.callback(`❌ ОТМЕНА`, `cancel`)]));

        return ctx.wizard.next()
    } catch (e) {
        console.log(e);
    }
})))

const finishStep = new Composer();
finishStep.action('accept', async (ctx) => {
    try {
        const { username, first_name, course, teacher, week, day } = ctx.wizard.state.courseData;
        const userResult = await getUserByNick(username)
        const courseResult = await getCourseByNick(course.btnNick)
        const teacherResult = await getTeacherByNick(teacher.btnNick)

        // (teacher, userNick, userName, lesson, day, time, dayTimeData, currentDate)
        await insertResultSheets(teacher.btnNick, username, first_name, course.btnName, week.btnName, day.btnName, day.dayTimeData, currentDate)

        await saveStudyResult(userResult._id, courseResult._id, teacherResult._id, day.btnNick, day.dayTimeData)

        await ctx.answerCbQuery();
        await realTimeTyping(ctx);
        await ctx.replyWithHTML(process.env.GOOGLE_SPREADSHEET,{
            disable_web_page_preview: true
        })

        return ctx.scene.leave();
    } catch (e) {
        console.log(e);
    }
});

finishStep.action('cancel', async (ctx) => {
    try {
        const wizardData = ctx.wizard.state.courseData;
        console.log('CANCEL BY USER = ', wizardData)
        await ctx.answerCbQuery();
        await ctx.reply(` Очень жаль...
Обязательно возвращайтесь, когда решите перестать быть таким тупым`);

        return ctx.scene.leave();
    } catch (e) {
        console.log(e);
    }
});

module.exports = new Scenes.WizardScene('studyWizard', startStep, courseStep, weekStep, dayStep, resultStep, finishStep);