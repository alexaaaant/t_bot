import Column from '../components/column';
import Message from '../components/message';

class Messages {
    render(columns, ) {
        const container = document.createElement('div',);
        container.className = 'messages d-flex';
        columns.forEach((column, ) => {
            container.appendChild(column,);
        },);

        document.body.appendChild(container,);
    }
    createColumn(name, messages, ) {
        const messageComponents = messages.map((message, ) => new Message(message.text, message.date, message.status,),);
        const column = new Column(name, messageComponents,);
        return column.render();
    }
}

export default Messages;
