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
        const messagesElement = document.createElement('div',);
        const header = document.createElement('h4',);
        messagesElement.className = 'messages__container';
        header.innerText = name;
        messagesElement.appendChild(header,);
        const messagesList = document.createElement('div',);
        messagesList.className = 'messages__list';
        messages.forEach((message, ) => {
            const messageComponent = new Message(message.text, message.date, message.status,);
            messagesList.appendChild(messageComponent.render(),);
        },);
        messagesElement.appendChild(messagesList,);

        return messagesElement;
    }
}

export default Messages;
