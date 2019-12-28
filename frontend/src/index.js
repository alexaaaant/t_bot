import ArticlesContainer from './containers/articles';
import MessagesContainer from './containers/messages';
import CreateButton from './components/createButton';
import DateComponent from './components/form/date';
import Message from './components/message';
import Store from './store';
import './webSocket';

const store = Store.getInstance();

const planTask = async (params, message, ) => {
    const chat_id = 9408538;
    const { date, text, } = params;
    fetch(encodeURI(`http://localhost:${process.env.PORT}/api/task/plan?text=${text}&date=${date}&chat_id=${chat_id}`,),)
        .then((res, ) => {
            if (res.ok) {
                res.json()
                    .then((body, ) => {
                        if (message && message.messageElement) {
                            message.setDate(new Date(date,).toString(),);
                            message.setText(text,);
                            store.addMessage(body.id, message,);
                            store.changeMessageStatus(body.id, '0',);
                        } else {
                            const message = new Message(text, new Date(date,).toString(), '0',);
                            store.addMessage(body.id, message,);
                            store.changeMessageStatus(body.id, '0',);
                        }
                        console.log(store,);
                    },);
            } else {
                throw res;
            }
        },)
        .catch((e, ) => console.log('e', e,),);
};

const renderDateForm = (message, handler = () => { }, ) => {
    const DateForm = new DateComponent(message,);
    DateForm.setSubmitHandler(handler,);
    document.body.appendChild(DateForm.render(0, 0,),);
};

const getAllMessages = async () => {
    const res = await fetch('http://localhost:3000/api/messages/all',);
    const messages = await res.json();
    const todoMessages = messages.filter((message, ) => message.status === '0',);
    const doneMessages = messages.filter((message, ) => message.status === '1',);

    const Messages = new MessagesContainer();
    const todoColumn = Messages.createColumn('To do', todoMessages, (message, ) => renderDateForm(message, (params, ) => planTask(params, message,),),);
    const doneColumn = Messages.createColumn('Done', doneMessages,);

    const Articles = new ArticlesContainer((message, ) => renderDateForm(message, (params, ) => planTask(params, message,),),);
    const articleColumn = Articles.getColumn();

    const Button = new CreateButton();
    Button.setHandlerClick(() => renderDateForm({}, (params, ) => planTask(params,),),);
    Button.render();

    Messages.render();
    store.addColumn('0', todoColumn,);
    store.addColumn('1', doneColumn,);
    Messages.addColumn(todoColumn,);
    Messages.addColumn(doneColumn,);
    Messages.addColumn(articleColumn,);

    const result = await fetch('http://localhost:3000/api/vc/articles',);
    const articles = await result.json();
    Articles.render(new Map(articles,),);

};

getAllMessages();
