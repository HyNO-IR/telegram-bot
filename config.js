import { Telegraf } from 'telegraf';

export const bot = new Telegraf("7195161757:AAEQEG74tSEJHVeMbqkErnSalojBjdVkjo4", {
    polling: {
      interval: 300,
      autoStart: true
    }
  })
