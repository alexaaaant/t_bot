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

    selectArticle(e, title, ) {
        const coords = e.currentTarget.getBoundingClientRect();
        const y = (window.scrollY + coords.top + coords.height) - 5;
        const x = (window.scrollX + coords.left + coords.width) - 5;
        this.date = new DateComponent();
        this.date.render(x, y,);
        this.date.setSubmitHandler(() => this.planTask(e.target, title,),);
    }

    async planTask(article, title, ) {
        const chat_id = 9408538;
        const date = this.date.getDate();
        article.id = chat_id + date.getDate() + date.getHours() + Math.floor(Math.random() * 100000,);
        let day = date.getDate();
        let month = date.getMonth() + 1;
        const year = date.getFullYear();
        let hours = date.getHours();
        let minunes = date.getMinutes();
        if (day < 10) {
            day = '0' + day;
        }
        if (month < 10) {
            month = '0' + month;
        }
        if (minunes < 10) {
            minunes = '0' + minunes;
        }
        if (hours < 10) {
            hours = '0' + hours;
        }
        const dateStr = `${day}.${month}.${year}`;
        const timeStr = `${hours}:${minunes}`;
        const text = await this.createText(title,);
        fetch(encodeURI(`http://localhost:${process.env.PORT}/api/task/plan?text=${text}&date=${dateStr}&time=${timeStr}&chat_id=${chat_id}&task_id=${article.id}`,),)
            .then((res, ) => {
                if (res.ok) {
                    article.classList.add('planned',);
                } else {
                    throw 'error';
                }
            },)
            .catch((e, ) => console.log('e', e,),);
    }

    static doneTask(id, ) {
        const article = document.getElementById(id,);
        article.classList.remove('planned',);
        article.classList.add('done',);
    }

    async createText(title, ) {
        const article = this.allArticles.get(title,);
        const res = await fetch(`http://localhost:${process.env.PORT}/api/task/shortLink?url=${article.link}`,);
        const url = await res.json();
        return `*${title}*\n\n${article.preamble}\n${url.url}`;
    }

}

export default Articles;
