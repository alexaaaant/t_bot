import Column from '../components/column';
import Message from '../components/message';

class Messages {
    constructor() {
        this.container = this.createContainer();
        this.columns = new Map();
    }
    createContainer() {
        const container = document.createElement('div',);
        container.className = 'messages d-flex';
        return container;
    }
    addColumn(column, ) {
        this.columns.set(column.getName(), column,);
        this.container.appendChild(column.render(),);
    }
    render() {
        document.body.appendChild(this.container,);
    }
    createColumn(name, messages, clickHandler = null, ) {
        const messageComponents = messages.map((message, ) => new Message(message.text, message.date, message.status, message.id, message.chat_id,),);
        const column = new Column(name, messageComponents, clickHandler,);
        this.columns.set(name, column,);
        return column;
    }
    getColumn(name, ) {
        return this.columns.get(name,);
    }
}

export default Messages;
