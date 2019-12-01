import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

const url = `${process.env.adress}/bot${process.env.token}`;

const chats = new Map();

function getUpdate() {
    fetch(`${url}/getUpdates`)
        .then((res) => res.json())
        .then((updates) => {
            console.log(updates);
            updates.result.forEach((update) => {
                if (update.message) {
                    const { id, first_name } = update.message.chat;
                    chats.set(id, first_name);
                }
            });
        })
        .catch((err) => console.log(err));
}

function sendMessageEveryone() {
    chats.forEach((personName, chat_id) => {
        const text = `${personName}, интересная статистика.`;
        sendMessage(chat_id, text);
    });
}

function sendMessage(chat_id, text) {
    fetch(encodeURI(`${url}/sendMessage?chat_id=${chat_id}&text=${text}`))
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
}

function getMe() {
    fetch(`${url}/getMe`)
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
}

getUpdate();
