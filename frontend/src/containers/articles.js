import Message from '../components/message';
import Column from '../components/column';
import { sites, } from '../constants';
import * as actions from '../actions/articlesActions';

class Articles {
    constructor() {
        this.date = null;
        this.columns = new Map();
    }
    render(params, ) {
        params.articles.forEach(async (article, title, ) => {
            const newEl = await this.createArticleElement(title, article,);
            this.columns.get(params.name,).addMessage(newEl,);
        },);
    }

    createColumns(handler, ) {
        Object.values(sites,).forEach((site, ) => {
            this.columns.set(site, new Column(site, [], handler,),);
        },);
    }

    getColumns() {
        return this.columns;
    }

    async createArticleElement(title, article, ) {
        const text = await this.createText(title, article,);
        return new Message(text,);
    }

    async createText(title, article, ) {
        return `*${title}*\n\n${article.preamble}\n${article.link}`;
    }

    renderArticles(container, ) {
        this.getColumns().forEach((val, ) => {
            container.addColumn(val,);
        },);
        this.loadArticles();
    }

    loadArticles() {
        Object.values(actions,).forEach((action, ) => {
            action(this.render.bind(this,),);
        },);
    }
}

export default Articles;
