import { Telegraf } from 'telegraf';
import fs from 'node:fs';
import axios from 'axios';

import { getMainMenu } from './keyboards.js'
import { keyboardTreatments } from './keyboards.js';
import { undressKeyboard } from './keyboards.js'

const commands = [
  { command: '/start', description: 'Начать работу с ботом'},
  { command: '/help', description: 'Получить помощь'},
  { command: '/about', description: 'Узнать информацию о боте'}
];
const helloMessage = `🔗 Перед использование обязательно ознакомьтесь с инструкцией! Если возникнут какие-то вопросы вы всегда можете написать нам и мы их обязательно решим!`;
const newDescription = 'Привет! Этот бот поможет сделать тебе крутой Дипндюдс.';

const bot = new Telegraf("6755956896:AAHnRSSe64kfN6qC8rjo1uKGda7sFxo9xUA", {
  polling: {
    interval: 300,
    autoStart: true
  }
})
bot.telegram.setMyDescription(newDescription);


bot.telegram.setMyCommands(commands);



bot.telegram.getMe().then((botInfo) => {
  bot.options.username = botInfo.username;
});
bot.start(ctx => {
  ctx.reply('Привет!', getMainMenu())
})

bot.hears('⚡ Обработки', ctx => {
  ctx.reply(`💳 Покупка VIP-обработок

🏝️ VIP-обработки позволят вам получать фотографии от бота без блюра!

💡Также вы получите приоритетную очередь!`, keyboardTreatments())
})


bot.hears('❤️ Раздеть', ctx => {
  
  ctx.replyWithPhoto(
      'https://img2.goodfon.ru/wallpaper/nbig/7/ec/justdoit-dzhastduit-motivaciya.jpg',
      {
          caption: `DeepNude Раздеватор 18+

Наша нейросеть единственная раздевает даже в закрытой одежде!
            
💡 Просто отправь нужную фотографию!`,
      }
  )

})

bot.hears('😎 Профиль', ctx => {
  const userName = ctx.from.first_name || ctx.from.username || 'Пользователь';
  ctx.reply(`Привет, ${userName}! Как я могу помочь?`);
})

// bot.hears('❤️ Раздеть', async (ctx) => {
//   const imageUrl = 'https://www.shutterstock.com/ru/image-photo/happy-multiracial-female-physicians-looking-each-2256672123'; // Замените на URL вашего изображения
//   const captionText = 'Текст, который вы хотите отправить вместе с изображением';

//   try {
//     await ctx.replyWithPhoto({ url: imageUrl }, { caption: captionText });
//   } catch (error) {
//     console.error('Ошибка отправки фото:', error);
//   }
// });


bot.command('help', (ctx) => ctx.replyWithMarkdown(helpResponse));
bot.on('photo', async ctx => {
  const photos = ctx?.update?.message?.photo;
  if(!photos?.length) {
    ctx.reply('Не удалось найти фото в сообщении');
    return;
  }

  console.log(ctx.message);

   try {
          const photoPath = await bot.telegram.getFileLink(photos.at(-1).file_id, './');

          //TODO: Сохраняет файлы локально

          // const filePath = `./public/${photos.at(-1).file_id}.jpg`;
          // await axios({url:photoPath, responseType: 'stream'}).then(response => {
          //       return new Promise((resolve, reject) => {
          //           response.data.pipe(fs.createWriteStream(filePath))
          //                       .on('finish', () => resolve())
          //                       .on('error', e => reject())
          //               });
          //           })


//TODO: Upload photo
const fileBytes = await fetch(
  `https://quickchart.io/watermark?mainImageUrl=${photoPath}&markImageUrl=https%3A%2F%2F1000logos.net%2Fwp-content%2Fuploads%2F2016%2F10%2FBatman-logo.png&markRatio=0.25`
).then((res) => res.blob())
console.log(fileBytes);

const myHeaders = new Headers();
myHeaders.append("accept", "*/*");
myHeaders.append("accept-language", "ru-RU,ru;q=0.9,en;q=0.8,en-US;q=0.7,kk;q=0.6");

const formdata = new FormData();
formdata.append("image", fileBytes);

const requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: formdata,
  redirect: 'follow'
};

const resultImageUrl = await fetch("https://api.imgbb.com/1/upload?expiration=600&key=8c194b1a662a2bfa94b1f8dea5def933", requestOptions)
  .then(response => response.json())
  .then(result => result?.data?.image?.url)
  .catch(error => console.log('error', error));
console.log("Result:", resultImageUrl)
if(!resultImageUrl) {
  ctx.reply('Не удалось получить изображение');
  return;
}


//TODO: Send response photo
console.log(photoPath)
ctx.replyWithPhoto(resultImageUrl);

  }
  catch(error) {

      console.log(error);

  }
})

console.log('start')
/*
TODO:
0. Настроить команды, отображаемые в боте меню (метод bot.telegram.setMyCommands (команды и описание)).
1. Добавить команду, в ответ на которую будет приходить ссылка для оплата (будут кнопки)
  1.1. bot.command('payment', реплай виз маркап и посмотреть апи для добавления кнопок в бота в телеграф);

  import { Context, Markup, Scenes, Telegraf } from 'telegraf';
    const buttons = payments.map((num) => [
      Markup.button.callback(String(num), `payment${num}`),
    ]);

ctx.reply('text', {
        reply_markup: {
          inline_keyboard: buttons,
        },})

  1.2. Добавить слушатель нажатия на кнопки с суммой оплаты (bot.action)
  1.3. Создавать ссылку с нужной суммой для оплаты https://wiki.aaio.io/priem-platezhei/sozdanie-zakaza
  1.4. Отправлять пользователю ссылку для перехода с текстом "Ссылка для оплаты подписки", ссылкку получаем из 1.3. В invoice_id кидаем id usera tg
  1.5. Создать node.js -сервер для просушивания событий об успешной оплате https://expressjs.com/ru/starter/installing.html (нужен сервер)
    1.5.1. Сделать экспресс-джс сервер с динамическим портом
    1.5.2. Сделать ручку (апи-путь), который будет вызывать оповещалка об оплате. Пост ручка, которая записывает в базу события оплаты
    1.5.3. Подключить любую джсон дазу из нпма (пополнения) https://www.npmjs.com/package/simple-json-db
  1.6. Добавить проверку баланса перед запросом в апи изображений (через гет к базе)
  1.7. В случае недостатка баланса отправлять соответсвующее сообщение
  1.8. После успешной генерации изображений, списывать у пользователя один коин (сет в базе и -1)
  1.9. Проверка баланса пользователем (вызываем гет. Дописать команду и вывести ее для ю)



*/ 
bot.launch()
