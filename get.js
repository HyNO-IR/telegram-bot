import express from 'express';
const app = express()
const port = 3004;
import bodyParser from 'body-parser';

app.use(cors())

// Используйте body-parser для обработки JSON данных
app.use(bodyParser.json());

// Роут для обработки уведомлений от Makenude.ai
app.post('/webhook', (req, res) => {
  const payload = req.body;
  console.log(payload);
  // Проверка, что запрос пришел от Makenude.ai (проверка токена)
  const yourToken = 'D9mVxKH7CxY12dqLWNe8qORtMcST2i3C'; // Замените на ваш реальный токен
  if (payload.token !== yourToken) {
    console.error('Invalid token. Request not from Makenude.ai.');
    res.status(403).send('Invalid token');
    return;
  }

  // Обработка результатов
  if (payload.success) {
    console.log('Image processing successful');
    console.log('ID:', payload.data.id);
    console.log('Result URL:', payload.data.result_url);

    // Здесь вы можете сделать что-то с результатом, например, сохранить URL изображения
    // на вашем сервере или отправить уведомление пользователю.
  } else {
    console.error('Image processing failed:', payload.message);

    // Здесь вы можете обработать ситуацию, когда обработка изображения не удалась.
  }

  res.status(200).send('OK');
});
app.get('/', (req, res) => {
  res.send('Hello World!')
})
// Запускаем сервер
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
