const dayJs = require('dayjs');
const updateLocale = require('dayjs/plugin/updateLocale')
const { getAllTeachers } = require('../common/models/teacher.model');
const { getAllStudyResults } = require('../common/models/studyResult.model');
dayJs.extend(updateLocale)

dayJs.updateLocale('en', {
    months: [
        'Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля',
        'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'
    ],
    weekdays: [
        'Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'
    ]
})

let dataCalendar = { weekCalendar: [], dayCalendar: [] };

const createCalendar = async () => {
    const teachersAll = await getAllTeachers();
    const teachersNick = await teachersAll.map((el) => el.btnNick);

    try {
        if(!dataCalendar.weekCalendar.length) {
            for (let i = 0; i < teachersNick.length; i++) {
                for (let j = 1; j < 8; j++) {
                    dataCalendar.weekCalendar.push({
                        btnName: dayJs().add(j, 'day').format('dddd: D MMMM YYYY'),
                        btnNick: `${teachersNick[i]} ${dayJs().add(j, 'day').format('dddd DD MMMM YYYY')}`,
                        weekTimeData: dayJs().add(j, 'day').toDate(),
                    })
                    for (let k = 9; k < 18; k++) {
                        dataCalendar.dayCalendar.push({
                            btnName: `${dayJs().startOf('d').add(k, 'hour').format('HH:mm')}` + ' - ' + `${dayJs().startOf('d').add(k + 1, 'hour').format('HH:mm')}`,
                            btnNick: `${teachersNick[i]} ${dayJs().startOf('d').add(j, 'day').add(k, 'hour').minute(0).format('dddd DD MMMM YYYY/HH:mm')}`,
                            dayTimeData: dayJs().startOf('d').add(j, 'day').add(k + 3, 'hour').toDate(),
                        })
                    }
                }
            }
        }

        return dataCalendar
    } catch (err) {
        console.log(err)
    }
}

const useCalendarWeek = async (teacher) => {
    let choiceWeek;
    let resultFilter = await getAllStudyResults()
    let arr = [];
    if(resultFilter.length) {
        for (let i = 0; i < resultFilter.length; i++) {
            let count = 0;
            for (let j = 0; j < resultFilter.length; j++) {
                if(resultFilter[i].dayTimeNick.split('/')[0] === resultFilter[j].dayTimeNick.split('/')[0]) {
                    count++
                }
            }
            if(count > 8) {
                arr.push(resultFilter[i].dayTimeNick.split('/')[0])
            }
        }
        dataCalendar.weekCalendar = dataCalendar.weekCalendar.filter((el) => !resultFilter.map((el2) => el2.dayTimeNick).includes(el.btnNick))
    }

    choiceWeek = dataCalendar.weekCalendar.filter((el) => el.btnNick.includes(teacher))
    choiceWeek.map((el) => arr.includes(el.btnNick)
        ? el.btnName = 'Нет свободных мест'
        : el
    )

    return choiceWeek
}
const useCalendarDay = async (dayPick) => {
    let choiceDay;

    const resultFilter = await getAllStudyResults()
    if(resultFilter.length) {
        dataCalendar.dayCalendar = dataCalendar.dayCalendar.filter((el) => !resultFilter.map((el2) => el2.dayTimeNick).includes(el.btnNick))
    }
    choiceDay = dataCalendar.dayCalendar.filter((el) => el.btnNick.includes(dayPick));

    return choiceDay
}

module.exports = { useCalendarWeek, useCalendarDay, createCalendar }