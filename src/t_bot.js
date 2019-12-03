
class Bot {
    constructor() {
        this.chats = new Map();
        this.url = `${process.env.ADRESS}/bot${process.env.TOKEN}`;

    }

    getUpdate() {
        fetch(`${this.url}/getUpdates`)
            .then((res) => res.json())
            .then((updates) => {
                updates.result.forEach((update) => {
                    if (update.message) {
                        const { id, first_name, } = update.message.chat;
                        this.chats.set(id, first_name);
                    }
                    // sendMessageEveryone();
                });
            })
            .catch((err) => console.log(err));
    }

    sendMessageEveryone() {
        this.chats.forEach((personName, chat_id) => {
            const text = `${personName}, *ночь*`;
            this.sendMessage(chat_id, text);
        });
    }

    sendMessage(chat_id, text) {
        fetch(encodeURI(`${this.url}/sendMessage?chat_id=${chat_id}&text=${text}&parse_mode=markdown`))
            .then((res) => res.json())
            .then((data) => console.log(data))
            .catch((err) => console.log(err));
    }

    getMe() {
        fetch(`${this.url}/getMe`)
            .then((res) => res.json())
            .then((data) => console.log(data))
            .catch((err) => console.log(err));
    }
}

export default Bot;
