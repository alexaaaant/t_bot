import ArticlesContainer from './containers/articles';
import MessagesContainer from './containers/messages';
import CreateButton from './components/createButton';
import FormComponent from './components/form/form';
import ChangeForm from './components/form/changeForm';
import Store from './store';
import './webSocket';

const store = Store.getInstance();

const renderForm = (message, ) => {
    const Form = new FormComponent(message,);
    document.body.appendChild(Form.render(0, 0,),);
};

const renderChangeForm = (message, ) => {
    const Form = new ChangeForm(message,);
    document.body.appendChild(Form.render(0, 0,),);
};

const getMessagesFromDb = async () => {
    const res = await fetch('http://localhost:3000/api/messages/all',);
    const messages = await res.json();
    return messages.sort((a, b,) => new Date(b.date,) - new Date(a.date,),);
};

const getAllMessages = async () => {
    const messages = await getMessagesFromDb();
    let todoMessages = [];
    let doneMessages = [];
    console.log(messages,);
    messages.forEach((message, ) => {
        if (message.status === '0') {
            todoMessages.push(message,);
        } else if (message.status === '1') {
            doneMessages.push(message,);
        }
    },);

    const Messages = new MessagesContainer();
    const todoColumn = Messages.createColumn('To do', todoMessages, (message, ) => renderChangeForm(message,),);
    const doneColumn = Messages.createColumn('Done', doneMessages,);

    const Articles = new ArticlesContainer();
    Articles.createColumns((message, ) => renderForm(message,),);

    const Button = new CreateButton();
    Button.setHandlerClick(() => renderForm({},),);
    Button.render();

    Messages.render();
    store.addColumn('0', todoColumn,);
    store.addColumn('1', doneColumn,);

    Messages.addColumn(todoColumn,);
    Messages.addColumn(doneColumn,);

    Articles.renderArticles(Messages,);
};

getAllMessages();
