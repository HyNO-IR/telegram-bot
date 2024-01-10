import {Markup} from 'telegraf'

export function getMainMenu() {
    return Markup.keyboard([
        ['❤️ Раздеть'],
        [ '⚡ Обработки', '😎 Профиль']
    ]).resize()
}

export function keyboardTreatments() {
    return Markup.inlineKeyboard([
        Markup.button.callback("⚡ Light", "Лайт"),
        Markup.button.callback("130 ₽", "130 ₽"),
        Markup.button.callback("💦 Minimal", "Минимал"),
        Markup.button.callback("189 ₽", "189 ₽"),
        Markup.button.callback("🍒 Normal", "Нормал"),
        Markup.button.callback("449 ₽", "449 ₽"),
        Markup.button.callback("👀 Medium", "Медиум"),
        Markup.button.callback("649 ₽", "649 ₽"),
        Markup.button.callback("🧨 High", "Бомба"),
        Markup.button.callback("799 ₽", "799 ₽"),
        Markup.button.callback("💥 Ultra", "Ультра"),
        Markup.button.callback("1249 ₽", "1249 ₽"),
    ], {columns: 2})
}

export function undressKeyboard() {
     return Markup.inlineKeyboard([
        Markup.button.callback("Как раздеть?", "Лайт")
    ])
}