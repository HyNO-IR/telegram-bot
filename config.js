import { Telegraf } from 'telegraf';

export const bot = new Telegraf("6755956896:AAHnRSSe64kfN6qC8rjo1uKGda7sFxo9xUA", {
    polling: {
      interval: 300,
      autoStart: true
    }
  })