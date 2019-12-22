import ArticlesContainer from './containers/articles';
import MessagesContainer from './containers/messages';
import CreateButton from './components/createButton';
import DateComponent from './components/date';
import './webSocket';

const planTask = async (article, title, ) => {
    const chat_id = 9408538;
    const dateWithoutFormatting = this.date.getDate();
    const { dateStr, timeStr, } = this.formattingDate(dateWithoutFormatting,);

    const text = await this.createText(title,);
    fetch(encodeURI(`http://localhost:${process.env.PORT}/api/task/plan?text=${text}&date=${dateStr}&time=${timeStr}&chat_id=${chat_id}`,),)
        .then((res, ) => {
            if (res.ok) {
                res.json()
                    .then((body, ) => {
                        article.id = body.id;
                        article.classList.add('planned',);
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
    const todoColumn = Messages.createColumn('To do', todoMessages, (message,) => renderDateForm(message,),);
    const doneColumn = Messages.createColumn('Done', doneMessages,);

    const Articles = new ArticlesContainer((message, ) => renderDateForm(message,),);
    const articleColumn = Articles.getColumn();

    const Button = new CreateButton();
    Button.setHandlerClick(() => renderDateForm(),);
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
