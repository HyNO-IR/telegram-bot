import Markup from 'telegraf'

export function getMainMenu() {
    return Markup.keyboard([
        ['Мои задачи', 'Добавить задачу'],
        ['Смотивируй меня']
    ]).resize().extra()
}