import fs from 'node:fs';
import axios from 'axios';
import {keyboardTreatments} from './module/keyboards.js'
import { commands} from './module/commands.js';
import  JSONdb from 'simple-json-db';
const db = new JSONdb('db.json');
import {bot} from './config.js';
import Jimp from "jimp";

const newDescription = 'Привет! Этот бот поможет сделать тебе крутой DEEPNUDE.';
const endedUpTrying = `❌ <b>Похоже, что у вас закончились обработки</b>

<i>Приобрести их можно по кнопке ниже</i>`;

bot.telegram.setMyDescription(newDescription);
bot.telegram.setMyCommands(commands);

bot.telegram.getMe().then((botInfo) => {
  bot.options.username = botInfo.username;
});

// bot.action('Лайт', async (ctx) => {
//   await ctx.answerCbQuery("Лайт", 'Закрыть модальное окно', true);
// });

bot.on('photo', async ctx => {
  if(db.get("users").find(item => item.IdUser == `@${ctx.from.username}`).balanceFree == 0 || db.get("users").find(item => item.IdUser == `@${ctx.from.username}`).balancePaid == 0) {
    ctx.replyWithHTML(endedUpTrying, keyboardTreatments());
  } else {
    const photos = ctx?.update?.message?.photo;
    if(!photos?.length) {
      ctx.reply('Не удалось найти фото в сообщении');
      return;
    }
  
    console.log(ctx.message);
  
     try {
            const photoPath = await bot.telegram.getFileLink(photos.at(-1).file_id, './');
  
            //TODO: Сохраняет файлы локально
  
            const filePath = `./public/${photos.at(-1).file_id}.jpg`;
            await axios({url:photoPath, responseType: 'stream'}).then(response => {
                  return new Promise((resolve, reject) => {
                      response.data.pipe(fs.createWriteStream(filePath))
                                  .on('finish', () => resolve())
                                  .on('error', e => reject())
                          });
                      })
  
Jimp.read(`${filePath}`)
.then((image) => {
  image.blur(20);
  var file = "./public/new_name." + image.getExtension();
  image.write(file);
  ctx.replyWithPhoto('https://disk.yandex.ru/d/p4N8aaT8XfabWg')
})

  //TODO: Upload photo
  // const fileBytes = await fetch(
  //   `https://quickchart.io/watermark?mainImageUrl=${photoPath}&markImageUrl=https%3A%2F%2F1000logos.net%2Fwp-content%2Fuploads%2F2016%2F10%2FBatman-logo.png&markRatio=0.5`
  // ).then((res) => res.blob())
  // console.log(fileBytes);
  
  // const myHeaders = new Headers();
  // myHeaders.append("accept", "*/*");
  // myHeaders.append("accept-language", "ru-RU,ru;q=0.9,en;q=0.8,en-US;q=0.7,kk;q=0.6");
  
  // const formdata = new FormData();
  // formdata.append("image", fileBytes);
  
  // const requestOptions = {
  //   method: 'POST',
  //   headers: myHeaders,
  //   body: formdata,
  //   redirect: 'follow'
  // };
  
  // const resultImageUrl = await fetch("https://api.imgbb.com/1/upload?expiration=600&key=8c194b1a662a2bfa94b1f8dea5def933", requestOptions)
  //   .then(response => response.json())
  //   .then(result => result?.data?.image?.url)
  //   .catch(error => console.log('error', error));
  // console.log("Result:", resultImageUrl)
  // if(!resultImageUrl) {
  //   ctx.reply('Не удалось получить изображение');
  //   return;
  // }

  // TODO: Send response photo
  // console.log(photoPath)
  // ctx.replyWithPhoto(resultImageUrl);
 
  // console.log('resultImageUrl', resultImageUrl)
    }
    catch(error) {
        console.log(error);
    }
  } 
  })


console.log('start')
bot.launch()