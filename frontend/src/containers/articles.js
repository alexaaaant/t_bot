import DateComponent from '../components/date';
import Message from '../components/message';
import Column from '../components/column';

class Articles {
    constructor() {
        this.allArticles = new Map();
        this.date = null;
        this.column = new Column('Articles VC',[],);
    }
    render(articles, ) {
        articles.forEach(async (article, title,) => {
            this.allArticles.set(title, article,);
            const newEl = await this.createArticleElement(title,);
            // newEl.onclick = (e, ) => this.selectArticle(e, title,);
            // list.appendChild(newEl,);
            this.column.addMessage(newEl,);
        },);
    }

    getColumn() {
        return this.column.render();
    }

    async createArticleElement(title, ) {
        const text = await this.createText(title,);
        return new Message(text,);
    }

    selectArticle(e, title, ) {
        const coords = e.currentTarget.getBoundingClientRect();
        const y = (window.scrollY + coords.top + coords.height) - 5;
        const x = (window.scrollX + coords.left + coords.width) - 5;
        this.date = new DateComponent();
        this.date.render(x, y,);
        this.date.setSubmitHandler(() => this.planTask(e.target, title,),);
    }

    formattingDate(dateWithoutFormatting, ) {
        let day = dateWithoutFormatting.getDate();
        let month = dateWithoutFormatting.getMonth() + 1;
        const year = dateWithoutFormatting.getFullYear();
        let hours = dateWithoutFormatting.getHours();
        let minunes = dateWithoutFormatting.getMinutes();
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
        return {
            dateStr: `${day}.${month}.${year}`,
            timeStr: `${hours}:${minunes}`,
        };
    }

    async planTask(article, title, ) {
        const chat_id = 9408538;
        const dateWithoutFormatting = this.date.getDate();
        const { dateStr, timeStr, } = this.formattingDate(dateWithoutFormatting,);

        const text = await this.createText(title,);
        fetch(encodeURI(`http://localhost:${process.env.PORT}/api/task/plan?text=${text}&date=${dateStr}&time=${timeStr}&chat_id=${chat_id}`,),)
            .then((res, ) => {
                if (res.ok) {
                    res.json()
                        .then((body, ) => {
                            article.id = body.id;
                            article.classList.add('planned',);
                        },);
                } else {
                    throw res;
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
