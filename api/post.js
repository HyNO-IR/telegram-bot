import fs from 'node:fs';
import axios from 'axios';

export default async function posting () {
const imagePath = './public/AgACAgIAAxkBAAIC2GWtauo8QaZaApVmitUUTe3BiYKlAALy2zEb_aBoSaa2zNEYTDntAQADAgADeQADNAQ.jpg';
const maskPath = '../images/mask-example.png';

const token = 'D9mVxKH7CxY12dqLWNe8qORtMcST2i3C';

const imageBuffer = fs.readFileSync(imagePath);

const imageBlob = new Blob([imageBuffer], { type: 'image/jpeg' });

// Define the API endpoint
const url = 'https://makenude.ai/api/nude';

// Prepare the data to be sent as a POST request
const data = new FormData();
data.append('image', imageBlob, { filename: 'image.jpg' });
data.append('mask', imageBlob, { filename: 'mask.png' });
data.append('token', token);


// Send the POST request
return axios.post(url, data)
    // .then((response) => {
    //     if (response.status === 200) {
    //         console.log("Request was successful.");
    //         console.log(response.data);
    //     } else {
    //         console.log(`Request failed with status code ${response.status}.`);
    //     }

    // })
    // .catch((error) => {
    //     console.error(error);
    // });
}