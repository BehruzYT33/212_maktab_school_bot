const TelegramBot = require('node-telegram-bot-api');

// ⚠️ лучше потом вынести в .env
const TOKEN = '8416631267:AAFmjWB3leuE_Nx0v8KaPQcomNwYdy5LtfA';

const bot = new TelegramBot(TOKEN, {
  polling: true
});

console.log('Бот запущен');

// /start
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    '👋 Привет! Я бот школы №212\n\nКоманды:\n/news\n/help'
  );
});

// /help
bot.onText(/\/help/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    '📌 Доступные команды:\n/start\n/news'
  );
});

// /news
bot.onText(/\/news/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    '📰 Новости школы:\nСегодня всё по расписанию.'
  );
});

// любое сообщение
bot.on('message', (msg) => {
  if (!msg.text.startsWith('/')) {
    bot.sendMessage(msg.chat.id, '❗ Используй команды');
  }
});
