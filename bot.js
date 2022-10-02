import TelegramBot from 'node-telegram-bot-api'
import dotenv from 'dotenv'
import { CronJob } from 'cron'
import * as myDays from './constants.js'

dotenv.config()

const bot = new TelegramBot(process.env.TOKEN, { polling: true })

bot.on('polling_error', console.log)

bot.setMyCommands([
    { command: '/start', description: 'Botni ishga tushirish' },
    { command: '/bugun', description: "Bugungi jadvalni ko'rish" },
    { command: '/kun', description: "Ma'lum kundagi jadvalni ko'rish" },
    { command: '/stop', description: "Avtomatik jadvalni to'xtatish" }
])

const getToday = () => new Date().toLocaleString('default', { weekday: 'long' })

let chatIds = []
job.start()

bot.on('message', msg => {

    const chatId = msg.chat.id
    const first_name = msg.from.first_name
    const username = msg.from.username

    if (msg.text === '/stop') chatIds.pop(chatId)

    if (msg.text === '/start') {
        bot.sendMessage(chatId, `Assalomu alaykum, <b>${first_name}</b> <i>{ ${username} }</i>. \nSizga har kuni dars jadvali berib boriladi.`, { parse_mode: 'HTML' })
        if (!chatIds.includes(chatId)) chatIds.push(chatId)
    }

    if (msg.text === '/bugun') {
        const sendingMsg = createTimeTable(getToday())
        if (sendingMsg === 'dice') {
            bot.sendDice(chatId)
        } else {
            bot.sendMessage(chatId, sendingMsg, { parse_mode: 'HTML' })
        }
    }

    if (msg.text === '/kun') {
        bot.sendMessage(chatId, 'Kunlik jadval', {
            reply_markup: {
                remove_keyboard: true,
                one_time_keyboard: true,
                resize_keyboard: true,
                inline_keyboard: [
                    [ /* 1st row */
                        { text: 'Dushanba', callback_data: 'Monday' },
                        { text: 'Seshanba', callback_data: 'Tuesday' },
                        { text: 'Payshanba', callback_data: 'Thursday' },
                    ],
                    [ /* 2nd row */
                        { text: 'Juma', callback_data: 'Friday' },
                        { text: 'Shanba', callback_data: 'Saturday' }
                    ]
                ]
            }
        })
    }

})

bot.on('callback_query', msg => bot.sendMessage(msg.from.id, createTimeTable(msg.data), { parse_mode: 'HTML' }))

const createTimeTable = today => {
    let day = ''

    let lesson = {
        first: {
            name1: '',
            teacher1: '',
            room1: '',
            isLecture1: true
        },
        second: {
            name2: '',
            teacher2: '',
            room2: '',
            isLecture2: true
        },
        third: {
            name3: '',
            teacher3: '',
            room3: '',
            isLecture3: true
        }
    }

    switch (today) {
        case myDays.Monday:
            lesson.first.name1 = 'Mintaqaviy Iqtisodiyot'
            lesson.first.teacher1 = "👩‍🏫 F.Murodxo'jayeva"
            lesson.first.room1 = '106-xona'
            lesson.first.isLecture1 = true

            lesson.second.name2 = 'Innovatsion Iqtisodiyot'
            lesson.second.teacher2 = "👨‍🏫 B.O'rinov"
            lesson.second.room2 = '212-xona'
            lesson.second.isLecture2 = true

            lesson.third.name3 = 'Strategik Boshqaruv'
            lesson.third.teacher3 = "👨‍🏫 A.Siddikov"
            lesson.third.room3 = '210-xona'
            lesson.third.isLecture3 = false

            day = 'Dushanba'
            break
        case myDays.Tuesday:
            lesson.first.name1 = 'Strategik Boshqaruv'
            lesson.first.teacher1 = "👨‍🏫 A.Siddikov"
            lesson.first.room1 = '212-xona'
            lesson.first.isLecture1 = true

            lesson.second.name2 = 'Strategik Boshqaruv (surat)\n\t\t\t\t\t Dinamik Makroiqtisodiyot (mahraj)'
            lesson.second.teacher2 = "👨‍🏫 A.Siddikov (surat)\n\t\t\t 👨‍🏫 Sh.Lutpidinov (mahraj)"
            lesson.second.room2 = '106-xona'
            lesson.second.isLecture2 = true

            lesson.third.name3 = 'Dinamik Makroiqtisodiyot (surat)\n\t\t\t\t\t Investitsiyalar Tahlili (mahraj)'
            lesson.third.teacher3 = "👨‍🏫 Sh.Lutpidinov (surat)\n\t\t\t 👨‍🏫 Sh.Abdurahmonov (mahraj)"
            lesson.third.room3 = '104-xona'
            lesson.third.isLecture3 = false

            day = 'Seshanba'
            break
        case myDays.Thursday:
            lesson.first.name1 = 'Investitsiyalar Tahlili'
            lesson.first.teacher1 = "👨‍🏫 Sh.Abdurahmonov"
            lesson.first.room1 = '212-xona'
            lesson.first.isLecture1 = true

            lesson.second.name2 = 'Innovatsion Iqtisodiyot (surat)\n\t\t\t\t\t Investitsiyalar Tahlili (mahraj)'
            lesson.second.teacher2 = "👨‍🏫 B.Urinov (surat)\n\t\t\t 👨‍🏫 Sh.Abdurahmonov (mahraj)"
            lesson.second.room2 = '106-xona'
            lesson.second.isLecture2 = true

            lesson.third.name3 = 'Dinamik Makroiqtisodiyot'
            lesson.third.teacher3 = "👨‍🏫 Sh.Lutpidinov"
            lesson.third.room3 = '104-xona'
            lesson.third.isLecture3 = false

            day = 'Payshanba'
            break
        case myDays.Friday:
            lesson.first.name1 = 'Dinamik Makroiqtisodiyot'
            lesson.first.teacher1 = "👨‍🏫 Sh.Lutpidinov"
            lesson.first.room1 = '212-xona'
            lesson.first.isLecture1 = true

            lesson.second.name2 = 'Investitsiyalar Tahlili'
            lesson.second.teacher2 = "👨‍🏫 Sh.Abdurahmonov"
            lesson.second.room2 = '105-xona'
            lesson.second.isLecture2 = false

            lesson.third.name3 = 'Innovatsion Iqtisodiyot'
            lesson.third.teacher3 = "👨‍🏫 B.Urinov"
            lesson.third.room3 = '207-xona'
            lesson.third.isLecture3 = false

            day = 'Juma'
            break
        case myDays.Saturday:
            lesson.first.name1 = 'Mintaqaviy Iqtisodiyot'
            lesson.first.teacher1 = "🧑‍🏫 M.Pazliddinov"
            lesson.first.room1 = '212-xona'
            lesson.first.isLecture1 = false

            lesson.second.name2 = 'Axborot va Murabbiylik Soati'
            lesson.second.teacher2 = "🧑‍🏫 Noma'lumiy"
            lesson.second.room2 = '♾-xona'
            lesson.second.isLecture2 = true

            lesson.third.name3 = 'Axborot va Murabbiylik Soati'
            lesson.third.teacher3 = "🧑‍🏫 Noma'lumiy"
            lesson.third.room3 = '♾-xona'
            lesson.third.isLecture3 = false

            day = 'Shanba'
            break
        case myDays.Sunday:
        case myDays.Wednesday:
        default:
            return 'dice'
    }

    return ` 🕴<b>${day}: 3 para</b>
    ➖➖➖➖➖➖➖➖➖➖➖➖
    1️⃣ ${lesson?.first.name1}
    ${lesson?.first.teacher1}
    ${lesson?.first.isLecture1 ? "🟢 <i>(Ma'ruza)</i>" : "🔴 <i>(Amaliy)</i>"} [ <u>${lesson?.first.room1}</u> ]\n
    2️⃣ ${lesson?.second.name2}
    ${lesson?.second.teacher2}
    ${lesson?.second.isLecture2 ? "🟢 <i>(Ma'ruza)</i>" : "🔴 <i>(Amaliy)</i>"} [ <u>${lesson?.second.room2}</u> ]\n
    3️⃣ ${lesson?.third.name3}
    ${lesson?.third.teacher3}
    ${lesson?.third.isLecture3 ? "🟢 <i>(Ma'ruza)</i>" : "🔴 <i>(Amaliy)</i>"} [ <u>${lesson?.third.room3}</u> ]`
}

const job = new CronJob(
    '0 0 1 * * *', () => chatIds.forEach(chatId => {
        const timeTable = createTimeTable(getToday())
        if (timeTable === 'dice') {
            bot.sendDice(chatId)
        } else {
            bot.sendMessage(chatId, timeTable, { parse_mode: 'HTML' })
        }
    }), null, true
)