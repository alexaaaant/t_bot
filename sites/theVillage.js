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
            let articles = doc.getElementsByClassName('post-block-featured');
            articles = [...articles,].slice(0, count);

            const articlesObj = new Map();

            articles.forEach((article) => {
                const tmpArticle = article.firstChild;
                const title = tmpArticle.children[1].firstChild.textContent;
                articlesObj.set(title, {
                    link: `${url}${tmpArticle.pathname}`,
                    preamble: tmpArticle.children[1].lastChild.textContent,
                });
            });

            const list = document.getElementsByClassName('articles')[0];
            articlesObj.forEach((article, title) => {
                const newEl = document.createElement('button');
                newEl.innerText = title;
                newEl.className = 'articles__item';
                newEl.onclick = () => getArticle(article.link);
                list.appendChild(newEl);
            });
        })
        .catch((err) => console.log(err));
}

function getArticle(link) {
    fetch(link)
        .then((res) => res.text())
        .then((html) => {
            const doc = new DOMParser().parseFromString(html, 'text/html');
        })
        .catch((err) => console.log(err));
}

getArticles(themes[0], 10);