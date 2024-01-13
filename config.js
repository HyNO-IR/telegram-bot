import { Telegraf } from 'telegraf';

export const bot = new Telegraf("6973564712:AAEQeqKCGmmmvxtlYYJpMN8KzOqPqJopw_w", {
    polling: {
      interval: 300,
      autoStart: true
    }
  })