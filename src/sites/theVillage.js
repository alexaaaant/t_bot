const url = 'https://www.the-village.ru';

const themes = [
    'city',
    'people',
    'business',
    'weekend',
    'children',
];

function getArticles(theme = themes[0], count = 10) {
    return fetch(`${url}/village/${theme}`)
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
            document.getElementsByClassName('theme')[0].innerText = theme;
            return articlesObj;
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

export default {
    getArticles,
    getArticle,
    themes,
};
