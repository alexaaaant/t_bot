import TheVillage from './sites/theVillage';
import Bot from './t_bot';

const TBot = new Bot();

const allArticles = new Map();

function renderArticles(articles) {
    const list = document.getElementsByClassName('articles')[0];
    articles.forEach((article, title) => {
        allArticles.set(title, article);
        const newEl = document.createElement('button');
        newEl.innerText = title;
        newEl.className = 'articles__item';
        newEl.onclick = () => selectArticle(title);
        list.appendChild(newEl);
    });
}

const selectArticle = (title) => {
    console.log(allArticles.get(title));
};

// getUpdate();
TheVillage.getArticles(TheVillage.themes[2], 15)
    .then((articles) => renderArticles(articles));