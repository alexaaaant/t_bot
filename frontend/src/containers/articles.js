import Message from '../components/message';
import Column from '../components/column';

class Articles {
    constructor() {
        this.date = null;
        this.columns = new Map();
    }
    render(articles, name, ) {
        articles.forEach(async (article, title, ) => {
            const newEl = await this.createArticleElement(title, article,);
            this.columns.get(name,).addMessage(newEl,);
        },);
    }

    createColumn(name, handler, ) {
        this.columns.set(name, new Column(name, [], handler,),);
        return this.columns.get(name,);
    }

    getColumn() {
        return this.column;
    }

    async createArticleElement(title, article, ) {
        const text = await this.createText(title, article,);
        return new Message(text,);
    }

    async createText(title, article, ) {
        const res = await fetch(`http://localhost:${process.env.PORT}/api/task/shortLink?url=${article.link}`,);
        const url = await res.json();
        return `*${title}*\n\n${article.preamble}\n${url.url}`;
    }

}

export default Articles;
