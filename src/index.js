import TheVillage from './sites/theVillage';
import Bot from './t_bot';

const TBot = new Bot();

const allArticles = new Map();
const r = new RegExp(/^([0-2][0-9]|(3)[0-1])(\.)(((0)[0-9])|((1)[0-2]))(\.)\d{4} (([01][0-9])|(2[0-3])):[0-5][0-9]$/, 'i');

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
        e.currentTarget.classList.remove('valid');
        e.currentTarget.classList.remove('invalid');
        e.currentTarget.value = '';
    });
};

const changeInput = (e) => {
    if (r.test(e.currentTarget.value) && !e.currentTarget.classList.contains('valid')) {
        e.currentTarget.classList.add('valid');
        e.currentTarget.classList.remove('invalid');
    }
    if (!r.test(e.currentTarget.value) && !e.currentTarget.classList.contains('invalid')) {
        e.currentTarget.classList.add('invalid');
        e.currentTarget.classList.remove('valid');
    }
};

// getUpdate();
TheVillage.getArticles(TheVillage.themes[2], 15)
    .then((articles) => renderArticles(articles));