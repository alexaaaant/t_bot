import TheVillage from './sites/theVillage';
import Bot from './t_bot';

const TBot = new Bot();

console.log(TBot.getMe());

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
    .then((articles) => renderArticles(articles));