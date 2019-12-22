import ArticlesContainer from './containers/articles';
import MessagesContainer from './containers/messages';
import CreateButton from './components/createButton';
import './webSocket';

const Articles = new ArticlesContainer();
const Messages = new MessagesContainer();
const Button = new CreateButton();

const getArticles = async () => {
    const res = await fetch('http://localhost:3000/api/vc/articles',);
    const articles = await res.json();
    Articles.render(new Map(articles,),);
};
const getAllMessages = async () => {
    const res = await fetch('http://localhost:3000/api/messages/all',);
    const messages = await res.json();
    const todoMessages = messages.filter((message, ) => message.status === '0',);
    const doneMessages = messages.filter((message, ) => message.status === '1',);
    const todoColumn = Messages.createColumn('To do', todoMessages,);
    const doneColumn = Messages.createColumn('Done', doneMessages,);

    Messages.render([todoColumn, doneColumn,],);
    const button = Button.render();
    document.body.appendChild(button,);
};

getAllMessages();

getArticles();