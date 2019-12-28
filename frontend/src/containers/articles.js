import FormComponent from '../components/form/form';
import Message from '../components/message';
import Column from '../components/column';

class Articles {
    constructor(handler = () => { },) {
        this.allArticles = new Map();
        this.date = null;
        this.column = new Column('Articles VC', [],handler,);
    }
    render(articles, ) {
        articles.forEach(async (article, title, ) => {
            this.allArticles.set(title, article,);
            const newEl = await this.createArticleElement(title,);
            // newEl.onclick = (e, ) => this.selectArticle(e, title,);
            // list.appendChild(newEl,);
            this.column.addMessage(newEl,);
        },);
    }

    getColumn() {
        return this.column;
    }

    async createArticleElement(title, ) {
        const text = await this.createText(title,);
        return new Message(text,);
    }

    selectArticle(e, title, ) {
        const coords = e.currentTarget.getBoundingClientRect();
        const y = (window.scrollY + coords.top + coords.height) - 5;
        const x = (window.scrollX + coords.left + coords.width) - 5;
        this.form = new FormComponent();
        this.form.render(x, y,);
        // this.date.setSubmitHandler(() => this.planTask(e.target, title,),);
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
