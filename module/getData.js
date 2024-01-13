import { formatedTextRazdevator, formatedTextTreatments, getDataProfile } from "./buttons.js"
import { undressKeyboard, keyboardTreatments } from "./keyboards.js"
const db = new JSONdb('db.json');
import  JSONdb from 'simple-json-db';
import {bot} from '../config.js';
const light = `Вы получаете 2 проверки и 1 в подарок.

Для покупки нажмите на цену.`,

minimal = `Вы получаете 5 проверок и 2 в подарок.

Для покупки нажмите на цену.`,

normal = `Вы получаете 15 проверок и 5 в подарок.

Для покупки нажмите на цену.`,

medium = `Вы получаете 20 проверок и 10 в подарок.

Для покупки нажмите на цену.`,

high = `Вы получаете 50 проверок и 15 в подарок.

Для покупки нажмите на цену.`,

ultra = `Вы получаете 100 проверок и 20 в подарок.

Для покупки нажмите на цену.`,

undress = `Просто отправь боту фотографию девушки, которую нужно раздеть!`;

export function getUndress(ctx) {
    ctx.replyWithPhoto({ source: `./img/hello_photo.jpg` },
    {caption: formatedTextRazdevator, parse_mode: 'HTML', reply_markup: undressKeyboard().reply_markup}
  )  
  }

export function getBuy(ctx) {
    ctx.replyWithHTML(formatedTextTreatments, keyboardTreatments()
  ) 
}

export function getProfile(ctx) {
    const userName = ctx.from.first_name || ctx.from.username || 'Пользователь';
    let balanceFree = db.get("users").find(item => item.IdUser == `@${ctx.from.username}`).balanceFree;
    let balancePaid = db.get("users").find(item => item.IdUser == `@${ctx.from.username}`).balancePaid;
    ctx.replyWithHTML('👋🏻 ' + userName + getDataProfile(balanceFree, balancePaid));
}

function showAlert(cb, descr) {
  bot.action(cb, (ctx) => {
    ctx.answerCbQuery(descr, {show_alert: true});
  });
}

showAlert('showLight', light);
showAlert('showMinimal', minimal);
showAlert('showNormal', normal);
showAlert('showMedium', medium);
showAlert('showHigh', high);
showAlert('showUltra', ultra);
showAlert('showUndress', undress);