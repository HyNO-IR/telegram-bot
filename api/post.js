import axios from 'axios';
import fs from 'node:fs';
import FormData from 'form-data';
import getting from './get.js';

export default function posting(ctx, filePath) {
// Replace with the actual path to your image and mask files
const imagePath = `${filePath}`;
const maskPath = './images/prod_mask.png';

// Replace 'your_token' with the actual token from your profile
const token = 'D9mVxKH7CxY12dqLWNe8qORtMcST2i3C';

// Define the API endpoint
const url = 'https://makenude.ai/api/nude';

// Prepare the data to be sent as a POST request
const data = new FormData();
data.append('image', fs.createReadStream(imagePath), { filename: 'image.jpg' });
data.append('mask', fs.createReadStream(maskPath), { filename: 'mask.png' });
data.append('token', token);

// Send the POST request
axios.post(url, data)
    .then((response) => {
        if (response.status === 200) {
            console.log("Request was successful.");
            console.log(response.data.data.id);
            ctx.replyWithHTML('⏳<b>Фотография обрабатывается нейросетью</b>')
            getting(response.data.data.id, ctx);
        } else {
            console.log(`Request failed with status code.`);
            console.log('Пидор Пост')
        }
    })
    .catch((error) => {
        console.error(error);
    });}