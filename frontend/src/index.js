import ArticlesContainer from './containers/articles';
import MessagesContainer from './containers/messages';
import CreateButton from './components/createButton';
import './webSocket';

const Articles = new ArticlesContainer();
const Messages = new MessagesContainer();
const Button = new CreateButton();

const getAllMessages = async () => {
    const res = await fetch('http://localhost:3000/api/messages/all',);
    const messages = await res.json();
    const todoMessages = messages.filter((message, ) => message.status === '0',);
    const doneMessages = messages.filter((message, ) => message.status === '1',);
    const todoColumn = Messages.createColumn('To do', todoMessages,);
    const doneColumn = Messages.createColumn('Done', doneMessages,);
    const articleColumn = Articles.getColumn();

    Button.render();

    Messages.render();
    Messages.addColumn(todoColumn,);
    Messages.addColumn(doneColumn,);
    Messages.addColumn(articleColumn,);

    const result = await fetch('http://localhost:3000/api/vc/articles',);
    const articles = await result.json();
    Articles.render(new Map(articles,),);

};

getAllMessages();
