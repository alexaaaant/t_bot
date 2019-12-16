import ArticlesContainer from './containers/articles';
import MessagesContainer from './containers/messages';
import './webSocket';

const Articles = new ArticlesContainer();
const Messages = new MessagesContainer();

const getArticles = async () => {
    const res = await fetch('http://localhost:3000/api/vc/articles',);
    const articles = await res.json();
    // Articles.render(new Map(articles,),);
};
const getAllMessages = async () => {
    const res = await fetch('http://localhost:3000/api/messages/all',);
    const messages = await res.json();
    Messages.render(messages,);
};

getAllMessages();

getArticles();