import { Telegraf, Markup } from 'telegraf'
import { message } from 'telegraf/filters'

const token = '6627147826:AAF2ZpXVrzKbK8u5sYd9L8HTYiF0nDHnCis' // токен из BotFather
const webAppUrl = 'https://angular-tg-mini-apps-bot.firebaseapp.com' 

const bot = new Telegraf(token) //Создаем бота и кидаем туда токен

bot.command('start', (ctx) => { //Обрабатываем с помощью .command команду "start"  Также получаем некоторый контекст, с помощью которого можем ответить
    ctx.reply(  //Вызываем метод контекст реплай
        'Добро пожаловать! Нажмите на кнопку ниже чтобы запустить бота.',   //Базовая инструкция для пользователя
        Markup.keyboard([   //Даем кнопку от клавиатуры для запуска бота
            Markup.button.webApp(   //В массиве передаем набор кнопок, для запуска web приложения, c полем webapp. Оно сиглализирует Тг что далее будет работа с приложением
                'Отправить сообщение', `${ webAppUrl }/feedback`)
        ])
    )
})

bot.on(message('web_app_data'), async (ctx) => {
    const data = ctx.webAppData.data.json()
    ctx.reply(`Ваше сообщение: ${data?.feedback}` ?? 'empty message')
})


bot.launch()    //Запускаем бота