import {Markup} from 'telegraf'
import {bot} from '../config.js';

export function getMainMenu() {
    return Markup.keyboard([
        ['❤️ Раздеть'],
        [ '⚡ Обработки', '😎 Профиль']
    ]).resize()
}

export function keyboardTreatments() {
    return Markup.inlineKeyboard([
        Markup.button.callback("⚡ Light", "showLight"),
        Markup.button.callback("129 ₽", '129₽'),
        Markup.button.callback("💦 Minimal", "showMinimal"),
        Markup.button.callback("189 ₽", '189₽'),
        Markup.button.callback("🍒 Normal", "showNormal"),
        Markup.button.callback("449 ₽", "449₽"),
        Markup.button.callback("👀 Medium", "showMedium"),
        Markup.button.callback("649 ₽", "649₽"),
        Markup.button.callback("🧨 High", "showHigh"),
        Markup.button.callback("799 ₽", "799₽"),
        Markup.button.callback("💥 Ultra", "showUltra"),
        Markup.button.callback("1249 ₽", "1249₽"),
    ], {columns: 2})
}

function getMethods(callBack){
    bot.action(callBack, (ctx) => {
const textPayment = `🌴 <b>При покупке вы получаете 2 проверок и 1 в подарок бесплатно!</b>
<i>Если вас устроит результат — можете докупить необходимое количество.</i>

<b>Платежный метод</b>
<i>Выберите подходящий
вам метод оплаты!</i>

💸 К оплате: ${ctx.callbackQuery.data}`;
    ctx.replyWithHTML(textPayment, {
        reply_markup: {
            inline_keyboard: [
                [
                    Markup.button.callback("💸 Быстрый платеж (СБП)", "showLight"),
                    Markup.button.callback("🇷🇺 Перевод (RU)", '130'),
                ],
                [
                    Markup.button.callback("🇰🇿 Перевод (KZ)", "showMinimal"),
                    Markup.button.callback("🥝 QIWI", '189'),
                ],
                [
                    Markup.button.callback("💰 YouMoney", "showNormal"),
                    Markup.button.callback("🪙 Crypto", "449 ₽"),
                ],
            ],
        },
    });
});}
getMethods('129₽');
getMethods('189₽');
getMethods('449₽');
getMethods('649₽');
getMethods('799₽');
getMethods('1249₽');

export function undressKeyboard() {
     return Markup.inlineKeyboard([
        Markup.button.callback("Как раздеть?", "showUndress")
    ])
}