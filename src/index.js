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
        newEl.className = 'articles__item border-radius';
        newEl.onclick = (e) => selectArticle(e, title);
        list.appendChild(newEl);
    });
}

const selectArticle = (e) => {
    const coords = e.currentTarget.getBoundingClientRect();
    const y = (coords.top + coords.height) - 5;
    const x = (coords.left + coords.width) - 5;
    const popup = document.getElementsByClassName('popup')[0];
    popup.style.left = `${x}px`;
    popup.style.top = `${y}px`;
    popup.classList.remove('d-none');
    popup.focus();
    popup.addEventListener('input', changeInput);
    popup.addEventListener('blur', (e) => {
        e.currentTarget.classList.add('d-none');
const selectArticle = (title) => {
    console.log(allArticles.get(title));
        e.currentTarget.value = '';
    });
};
};

// getUpdate();
TheVillage.getArticles(TheVillage.themes[2], 15)
    .then((articles) => renderArticles(articles));