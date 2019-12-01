const url = 'https://www.the-village.ru';

const themes = [
    'city',
    'people',
    'business',
    'weekend',
    'children',
];

function getArticles(theme, count) {
    fetch(`${url}/village/${theme}`)
        .then((res) => res.text())
        .then((html) => {
            const doc = new DOMParser().parseFromString(html, 'text/html');
            let articles = doc.getElementsByClassName('post-link');
            articles = [...articles,].slice(0, count + 4);
            articles = articles.map((article) => (article.pathname));
            articles = [...new Set(articles),];
            const list = document.getElementsByClassName('articles')[0];
            articles.forEach((article) => {
                const newEl = document.createElement('button');
                newEl.innerText = article;
                newEl.className='articles__item';
                list.appendChild(newEl);
            });
        })
        .catch((err) => console.log(err));
}

getArticles(themes[1], 10);