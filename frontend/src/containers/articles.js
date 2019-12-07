import DateComponent from '../components/date';

class Articles {
    constructor() {
        this.allArticles = new Map();
        this.date = null;

    }
    render(articles, ) {
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
        this.date = new DateComponent();
        this.date.render(x, y,);
        this.date.setSubmitHandler(() => this.planTask(e,),);
    }

    planTask(article, ) {
        const dateA = this.date.getDate();
        article.target.classList.add('planned',);
        console.log('dasdadad',);
        setTimeout(() => {
            article.target.classList.remove('planned',);
            article.target.classList.add('done',);
        }, dateA - new Date(),);
    }

}

export default Articles;
