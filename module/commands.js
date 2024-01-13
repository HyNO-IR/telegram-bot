export const helloMessage = `🔗 <b>Перед использование обязательно ознакомьтесь с <a href="https://teletype.in/@paidpartner/deepnuderinfo">инструкцией</a>!</b> 
Если возникнут какие-то вопросы вы всегда можете написать <a href="http://t.me/DmitryAbabkov">нам</a> и мы их обязательно решим!`;
import {Markup} from 'telegraf'
import {bot} from '../config.js';
import { getMainMenu } from './keyboards.js';
const db = new JSONdb('db.json');
import  JSONdb from 'simple-json-db';
import { formatedTextRazdevator } from './buttons.js';
import { undressKeyboard } from './keyboards.js';
import { getUndress } from './getData.js';
import { getBuy } from './getData.js';
import { getProfile } from './getData.js';

export const commands = [
    { command: '/start', description: 'Начать работу с ботом'},
    { command: '/undress', description: 'Начать раздевать'},
    { command: '/buy', description: 'Купить обработки'},
    { command: '/profile', description: 'Профиль'}
  ];

bot.hears('/undress', ctx => {
    getUndress(ctx);
})  

bot.hears('/buy', ctx => {
  getBuy(ctx);
}) 

bot.hears('/profile', ctx => {
 getProfile(ctx);
}) 

async function sendMessage(ctx) {
    try {
        await ctx.replyWithHTML(helloMessage, getMainMenu());
        await ctx.replyWithPhoto({ source: `./img/hello_photo.jpg` },
        {caption: formatedTextRazdevator, parse_mode: 'HTML', reply_markup: undressKeyboard().reply_markup}
        )    
    } catch (error) {
        console.error(error);
    }
}

bot.start(async ctx => {
  try {
      await sendMessage(ctx);
      let users = db.get("users");
    if(users.find(item => item.IdUser == `@${ctx.from.username}`)) {
      return
    } else {
        users.push({
            "name": ctx.from.first_name,
            "lastName": ctx.from.last_name,
            "IdUser": '@' + ctx.from.username,
            "IdChat": ctx.chat.id,
            "balancePaid": 0,
            "balanceFree": 0,
            "images": 0,
            "role": 'user'
        });
        db.set("users", users);
    }
  } catch (error) {
      console.error(error);
  }
  
});

