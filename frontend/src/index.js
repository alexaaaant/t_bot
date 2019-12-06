const allArticles = new Map();
const r = new RegExp(/(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01]) (([01][0-9])|(2[0-3])):[0-5][0-9]$/, 'i',);

function renderArticles(articles, ) {
    const list = document.getElementsByClassName('articles',)[0];
    articles.forEach((article, title, ) => {
        allArticles.set(title, article,);
        const newEl = document.createElement('button',);
        newEl.innerText = title;
        newEl.className = 'articles__item border-radius';
        newEl.onclick = (e, ) => selectArticle(e, title,);
        list.appendChild(newEl,);
    },);
}

const createPopup = () => {
    const popup = document.createElement('input',);
    popup.className = 'popup';
    return popup;
};

const selectArticle = (e, ) => {
    const coords = e.currentTarget.getBoundingClientRect();
    const y = (window.scrollY + coords.top + coords.height) - 5;
    const x = (window.scrollX + coords.left + coords.width) - 5;
    const popup = createPopup();
    popup.style.left = `${x}px`;
    popup.style.top = `${y}px`;
    document.body.appendChild(popup,);
    popup.focus();
    popup.addEventListener('input', changeInput,);
    popup.addEventListener('blur', (event, ) => {
        if (event.currentTarget.classList.contains('valid',)) {
            const date = new Date(event.currentTarget.value,);
            e.target.classList.add('planned',);
            setTimeout(() => {
                e.target.classList.remove('planned',);
                e.target.classList.add('done',);
            }, date - new Date(),);
        }
        document.body.removeChild(popup,);
    },);
};

const changeInput = (e, ) => {
    if (r.test(e.currentTarget.value,) && !e.currentTarget.classList.contains('valid',)) {
        e.currentTarget.classList.add('valid',);
        e.currentTarget.classList.remove('invalid',);
    }
    if (!r.test(e.currentTarget.value,) && !e.currentTarget.classList.contains('invalid',)) {
        e.currentTarget.classList.add('invalid',);
        e.currentTarget.classList.remove('valid',);
    }
};

// getUpdate();
// TheVillage.getArticles(TheVillage.themes[2], 15)
//     .then((articles) => renderArticles(articles));

const getArticles = async () => {
    const res = await fetch('http://localhost:3000/api/vc/articles',);
    const articles = await res.json(); 
    console.log(new Map(articles,),);
};

getArticles();