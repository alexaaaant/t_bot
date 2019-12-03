import TheVillage from './sites/theVillage';

const url = `${process.env.ADRESS}/bot${process.env.TOKEN}`;

const chats = new Map();

function getUpdate() {
    fetch(`${url}/getUpdates`)
        .then((res) => res.json())
        .then((updates) => {
            updates.result.forEach((update) => {
                if (update.message) {
                    const { id, first_name, } = update.message.chat;
                    chats.set(id, first_name);
                }
                // sendMessageEveryone();
            });
        })
        .catch((err) => console.log(err));
}

function sendMessageEveryone() {
    chats.forEach((personName, chat_id) => {
        const text = `${personName}, *ночь*`;
        sendMessage(chat_id, text);
    });
}

function sendMessage(chat_id, text) {
    fetch(encodeURI(`${url}/sendMessage?chat_id=${chat_id}&text=${text}&parse_mode=markdown`))
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

function renderArticles(articles) {
    const list = document.getElementsByClassName('articles')[0];
    articles.forEach((article, title) => {
        const newEl = document.createElement('button');
        newEl.innerText = title;
        newEl.className = 'articles__item';
        // newEl.onclick = () => getArticle(article.link);
        list.appendChild(newEl);
    });
}

// getUpdate();
TheVillage.getArticles(TheVillage.themes[2], 15)
    .then(articles => renderArticles(articles));