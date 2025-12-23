const TelegramBot = require('node-telegram-bot-api');

// ⚠️ вставь свой токен
const TOKEN = '8416631267:AAFmjWB3leuE_Nx0v8KaPQcomNwYdy5LtfA';
const bot = new TelegramBot(TOKEN, { polling: true });

// Telegram ID администратора
const ADMIN_ID = 6876281483;

console.log('Бот запущен');

// Проверка, является ли пользователь админом
function isAdmin(userId) {
  return userId === ADMIN_ID;
}

// Обработка сообщений
bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  if (!isAdmin(chatId)) {
    bot.sendMessage(chatId, '⚠️ Бот еще в разработке');
    return; // выходим, дальше команды не обрабатываются
  }

  // --- Ниже команды только для администратора ---
  
  // /start
  if (msg.text === '/start') {
    bot.sendMessage(chatId, '👋 Привет, администратор! Бот запущен.');
  }

  // /help
  if (msg.text === '/help') {
    bot.sendMessage(chatId, '📌 Команды администратора:\n/start\n/help\n/news');
  }

  // /news
  if (msg.text === '/news') {
    bot.sendMessage(chatId, '📰 Новости школы:\nСегодня уроки идут по расписанию.');
  }

});
