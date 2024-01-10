import { formatedTextRazdevator, formatedTextTreatments, getDataProfile } from "./buttons.js"
import { undressKeyboard, keyboardTreatments } from "./keyboards.js"
const db = new JSONdb('db.json');
import  JSONdb from 'simple-json-db';

export function getUndress(ctx) {
    ctx.replyWithPhoto('https://img2.goodfon.ru/wallpaper/nbig/7/ec/justdoit-dzhastduit-motivaciya.jpg',
    {caption: formatedTextRazdevator, parse_mode: 'HTML', reply_markup: undressKeyboard().reply_markup}
  )  
  }

export function getBuy(ctx) {
    ctx.replyWithPhoto('https://img2.goodfon.ru/wallpaper/nbig/7/ec/justdoit-dzhastduit-motivaciya.jpg',
    {caption: formatedTextTreatments, parse_mode: 'HTML', reply_markup: keyboardTreatments().reply_markup}
  ) 
}

export function getProfile(ctx) {
    const userName = ctx.from.first_name || ctx.from.username || 'Пользователь';
    let balanceFree = db.get("users").find(item => item.IdUser == `@${ctx.from.username}`).balanceFree;
    let balancePaid = db.get("users").find(item => item.IdUser == `@${ctx.from.username}`).balancePaid;
    ctx.replyWithHTML('👋🏻 ' + userName + getDataProfile(balanceFree, balancePaid));
}