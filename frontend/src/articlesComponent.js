class Articles {
    constructor() {
        this.allArticles = new Map();
        this.r = new RegExp(/(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01]) (([01][0-9])|(2[0-3])):[0-5][0-9]$/, 'i',);

    }
    renderArticles(articles, ) {
        const list = document.getElementsByClassName('articles',)[0];
        articles.forEach((article, title, ) => {
            this.allArticles.set(title, article,);
            const newEl = document.createElement('button',);
            newEl.innerText = title;
            newEl.className = 'articles__item border-radius';
            newEl.onclick = (e, ) => this.selectArticle(e, title,);
            list.appendChild(newEl,);
        },);
    }

    selectArticle(e, ) {
        const coords = e.currentTarget.getBoundingClientRect();
        const y = (window.scrollY + coords.top + coords.height) - 5;
        const x = (window.scrollX + coords.left + coords.width) - 5;
        const popup = this.createPopup();
        popup.style.left = `${x}px`;
        popup.style.top = `${y}px`;
        document.body.appendChild(popup,);
        popup.focus();
        popup.addEventListener('input', this.changeInput,);
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
    }

    createPopup() {
        const popup = document.createElement('input',);
        popup.className = 'popup';
        return popup;
    }

    hangeInput(e, ) {
        if (this.r.test(e.currentTarget.value,) && !e.currentTarget.classList.contains('valid',)) {
            e.currentTarget.classList.add('valid',);
            e.currentTarget.classList.remove('invalid',);
        }
        if (!this.r.test(e.currentTarget.value,) && !e.currentTarget.classList.contains('invalid',)) {
            e.currentTarget.classList.add('invalid',);
            e.currentTarget.classList.remove('valid',);
        }
    }

}

export default Articles;
