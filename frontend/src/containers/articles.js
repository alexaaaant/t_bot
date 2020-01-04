import Message from '../components/message';
import Column from '../components/column';

const themesVillage = [
    'city',
    'people',
    'business',
    'weekend',
    'children',
];

const themesSnob = [
    'theme/257/',
    'theme/161/',
    'theme/904/',
    'tag/52837/',
    'tag/1768/',
    'theme/545/',
    'theme/214/',
    'theme/154/',
    'theme/164/',
];

class Articles {
    constructor() {
        this.date = null;
        this.columns = new Map();
        this.sites = [
            'Village',
            'Knife',
            'VC',
            'Snob',
            'NakedScience',
            'Newtonew',
            'Vice',
            'Nplus',
            'Forbes',
        ];
    }
    render(articles, name, ) {
        articles.forEach(async (article, title, ) => {
            const newEl = await this.createArticleElement(title, article,);
            this.columns.get(name,).addMessage(newEl,);
        },);
    }

    createColumns(handler, ) {
        this.sites.forEach((site, ) => {
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

    loadArticles() {
        this.loadForbes();
        this.loadKnife();
        this.loadNakedScience();
        this.loadNewtonew();
        this.loadNplus();
        this.loadSnob();
        this.loadVC();
        this.loadVice();
        this.loadVillage();
    }

    loadVillage() {
        themesVillage.forEach(async (theme, ) => {
            const result = await fetch(`http://localhost:3000/api/village/articles?theme=${theme}`,);
            const articles = await result.json();
            this.render(new Map(articles,), 'Village',);
        },);
    }

    loadSnob() {
        themesSnob.forEach(async (theme, ) => {
            const result = await fetch(`http://localhost:3000/api/snob/articles?params=${theme}`,);
            const articles = await result.json();
            this.render(new Map(articles,), 'Snob',);
        },);
    }

    async loadKnife() {
        const result = await fetch('http://localhost:3000/api/knife/articles',);
        const articles = await result.json();
        this.render(new Map(articles,), 'Knife',);
    }

    async loadVC() {
        const result = await fetch('http://localhost:3000/api/vc/articles',);
        const articles = await result.json();
        this.render(new Map(articles,), 'VC',);
    }

    async loadNakedScience() {
        const result = await fetch('http://localhost:3000/api/nakedScience/articles',);
        const articles = await result.json();
        this.render(new Map(articles,), 'NakedScience',);
    }

    async loadNewtonew() {
        const result = await fetch('http://localhost:3000/api/newtonew/articles',);
        const articles = await result.json();
        this.render(new Map(articles,), 'Newtonew',);
    }

    async loadVice() {
        const result = await fetch('http://localhost:3000/api/vice/articles',);
        const articles = await result.json();
        this.render(new Map(articles,), 'Vice',);
    }

    async loadNplus() {
        const result = await fetch('http://localhost:3000/api/nplus/articles',);
        const articles = await result.json();
        this.render(new Map(articles,), 'Nplus',);
    }

    async loadForbes() {
        const result = await fetch('http://localhost:3000/api/forbes/articles',);
        const articles = await result.json();
        this.render(new Map(articles,), 'Forbes',);
    }

}

export default Articles;
