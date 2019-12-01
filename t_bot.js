import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

const url = `${process.env.adress}/bot${process.env.token}`;

const chats = new Map();

function getUpdate() {
    fetch(`${url}/getUpdates`)
        .then((res) => res.json())
        .then((updates) => {
            console.log(updates)
            updates.result.forEach((update) => {
                if (update.message) {
                    const { id, first_name } = update.message.chat;
                    chats.set(id, first_name);
                }
            });
        })
        .catch((err) => console.log(err))
}
