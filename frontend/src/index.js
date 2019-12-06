import ArticlesComponent from './articlesComponent';

const Articles = new ArticlesComponent();

const getArticles = async () => {
    const res = await fetch('http://localhost:3000/api/vc/articles',);
    const articles = await res.json(); 
    Articles.renderArticles(new Map(articles,),);
};

getArticles();