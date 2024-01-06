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
        Markup.button.callback("130 ₽", "https://google.com"),
        Markup.button.callback("💦 Minimal", "Минимал"),
        Markup.button.callback("189 ₽", "189 ₽"),
        Markup.button.callback("🍒 Normal", "Нормал"),
        Markup.button.callback("449 ₽", "449 ₽"),
    ], {columns: 2})
}

export function undressKeyboard() {
     return Markup.inlineKeyboard([
        Markup.button.callback("Как раздеть?", "Лайт")
    ])
}