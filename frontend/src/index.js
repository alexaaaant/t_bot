import ArticlesContainer from './containers/articles';

const Articles = new ArticlesContainer();

const getArticles = async () => {
    const res = await fetch('http://localhost:3000/api/vc/articles',);
    const articles = await res.json(); 
    Articles.render(new Map(articles,),);
};

getArticles();