import Column from '../components/column';
import Message from '../components/message';

class Messages {
    constructor() {
        this.container = this.createContainer();
    }
    createContainer() {
        const container = document.createElement('div',);
        container.className = 'messages d-flex';
        return container;
    }
    addColumn(column, ) {
        this.container.appendChild(column,);
    }
    render() {
        document.body.appendChild(this.container,);
    }
    createColumn(name, messages, clickHandler = null,) {
        const messageComponents = messages.map((message, ) => new Message(message.text, message.date, message.status,),);
        const column = new Column(name, messageComponents,clickHandler,);
        return column.render();
    }
}

export default Messages;
