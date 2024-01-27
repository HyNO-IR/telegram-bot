import axios from 'axios';
import fs from 'node:fs';


export default async function getting(num, ctx) {
    const id = num;
    const token = "D9mVxKH7CxY12dqLWNe8qORtMcST2i3C";
 
  const url = `https://makenude.ai/api/nude?id=${id}&token=${token}`;

  function clear(id) {
    clearInterval(id)
  }

  const interval = setInterval(() => {
    axios.get(url)
    .then((response) => {
        if (response.status === 200) {
            console.log("Request was successful.");
            console.log(response.data);
        } else {
            console.log(`Request failed with status code ${response.status}.`);
        }
    })
    .catch((error) => {
       const res = error.response.data.data.path;
      clear(interval);
      const localImagePath = './result/img.png';

      axios({
        method: 'get',
        url: res,
        responseType: 'stream', // Указываем, что ожидаем потоковый ответ
      })
        .then(response => {
          // Создаем поток для записи в файл
          const writer = fs.createWriteStream(localImagePath);
      
          // Подключаем поток данных к потоку записи
          response.data.pipe(writer);
      
          // Обработка завершения записи
          return new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
          });
        })
        .then(() => {
          console.log('Image downloaded successfully!');
          ctx.replyWithPhoto({ source: `./result/img.png`});
        })
        .catch(error => {
          console.error('Error downloading image:', error);
        });
        
    });
  }, 31000)
}
