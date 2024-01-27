import axios from 'axios';

export default async function getting(num) {
    const id = num;
    const token = "D9mVxKH7CxY12dqLWNe8qORtMcST2i3C";

setTimeout(() =>{    
  const url = `https://makenude.ai/api/nude?id=${id}&token=${token}`;

    try {
        console.log('Sending request...');
        const response =  axios.get(url);

        // Ждем 1 минуту (60000 миллисекунд) перед выводом ответа
            if (response.status === 200) {
              console.log('Мы закончили');

                console.log("Request was successful.");
                console.log(response.data.success)
                // console.log(response.data.data.path);
                // console.log('Мы закончили');
            } else {
                console.log(`Request failed with status code .`);
            }
    } catch (error) {
        console.error(error);
    }}, 60000)
}

