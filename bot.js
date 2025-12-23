const fetch = require('node-fetch'); // npm install node-fetch@2

const TOKEN = '8416631267:AAFmjWB3leuE_Nx0v8KaPQcomNwYdy5LtfA';
const ADMIN_ID = 6876281483;

// Функция отправки сообщения
async function sendMessage(chatId, text) {
  const url = `https://api.telegram.org/bot${TOKEN}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(text)}`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
}

// Проверка админа
function isAdmin(userId) {
  return userId === ADMIN_ID;
}

// Пример обработки "полученных сообщений" через getUpdates
async function getUpdates(offset = 0) {
  const url = `https://api.telegram.org/bot${TOKEN}/getUpdates?offset=${offset}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.result;
}

// Главный цикл проверки обновлений
let lastUpdateId = 0;
setInterval(async () => {
  const updates = await getUpdates(lastUpdateId + 1);
  for (const update of updates) {
    lastUpdateId = update.update_id;

    const chatId = update.message.chat.id;
    const text = update.message.text;

    if (!isAdmin(chatId)) {
      await sendMessage(chatId, '⚠️ Бот еще в разработке');
      continue;
    }

    // --- Команды для админа ---
    if (text === '/start') {
      await sendMessage(chatId, '👋 Привет, администратор! Бот запущен.');
    } else if (text === '/help') {
      await sendMessage(chatId, '📌 Команды администратора:\n/start\n/help\n/news');
    } else if (text === '/news') {
      await sendMessage(chatId, '📰 Новости школы:\nСегодня уроки идут по расписанию.');
    } else {
      await sendMessage(chatId, '❗ Неизвестная команда');
    }
  }
}, 1000);
