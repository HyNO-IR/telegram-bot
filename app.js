import { Telegraf } from 'telegraf';
import fs from 'node:fs';
import axios from 'axios';
import { getMainMenu } from './module/keyboards.js'
import { keyboardTreatments } from './module/keyboards.js';
import { undressKeyboard } from './module/keyboards.js';
import { commands } from './module/commands.js';
import {helloMessage} from './module/commands.js'
import {formatedTextTreatments, formatedTextRazdevator, formatedTextProfile} from './module/buttons.js';
import  JSONdb from 'simple-json-db';
const db = new JSONdb('db.json');

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
  ctx.replyWithHTML(helloMessage, getMainMenu())
})

bot.hears('⚡ Обработки', ctx => {
  ctx.replyWithHTML(formatedTextTreatments, keyboardTreatments()); 
})  

bot.hears('❤️ Раздеть', ctx => {
  ctx.replyWithPhoto('https://img2.goodfon.ru/wallpaper/nbig/7/ec/justdoit-dzhastduit-motivaciya.jpg',
      {caption: formatedTextRazdevator, parse_mode: 'HTML', reply_markup: undressKeyboard().reply_markup}
  )
})

bot.action('Лайт', async (ctx) => {
  await ctx.answerCbQuery("Лайт", 'Закрыть модальное окно', true);
});

bot.hears('😎 Профиль', ctx => {
  const userName = ctx.from.first_name || ctx.from.username || 'Пользователь';
  ctx.replyWithHTML('👋🏻 ' + userName + formatedTextProfile);
  
})


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
bot.launch()







