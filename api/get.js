import fs from 'node:fs';
import axios from 'axios';

export default function geting (id) 
{
const token = "D9mVxKH7CxY12dqLWNe8qORtMcST2i3C";

const url = `https://makenude.ai/api/photo?id=${id}&token=${token}`;

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
        console.error(error);
    });
}