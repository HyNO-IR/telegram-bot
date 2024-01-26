import axios from 'axios';
import fs from 'node:fs';
import FormData from 'form-data';

export default function posting() {
// Replace with the actual path to your image and mask files
const imagePath = './public/AgACAgIAAxkBAAIC92WtdbeqS1gn3RUJV5iHIAVWxNYBAALy2zEb_aBoSaa2zNEYTDntAQADAgADeQADNAQ.jpg';
const maskPath = './images/mask-example.png';

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
            console.log(response.data);


        } else {
            console.log(`Request failed with status code ${response.status}.`);
        }
    })
    .catch((error) => {
        console.error(error);
    });}