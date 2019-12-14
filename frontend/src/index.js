import ArticlesContainer from './containers/articles';
import io from 'socket.io-client';

const Articles = new ArticlesContainer();
const socket = io('http://localhost:3000',);

const getArticles = async () => {
    const res = await fetch('http://localhost:3000/api/vc/articles',);
    const articles = await res.json();
    Articles.render(new Map(articles,),);
};

getArticles();