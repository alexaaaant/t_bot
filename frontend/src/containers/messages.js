import Message from '../components/message';

class Messages {
    render(messages, ) {
        const container = document.createElement('div',);
        container.className = 'messages d-flex';

        const { messagesList: messagesListTodo, messages: todoMessages, } = this.createColumn('To do',);
        const { messagesList: messagesListDone, messages: doneMessages, } = this.createColumn('Done',);

        messages.forEach((message, ) => {
            const messageComponent = new Message(message.text, message.date, message.status,);
            const messageElement = messageComponent.render();
            const status = messageComponent.getData().status;

            if (status === '0') {
                messagesListTodo.appendChild(messageElement,);
            }
            if (status === '1') {
                messagesListDone.appendChild(messageElement,);
            }
        },);
        todoMessages.appendChild(messagesListTodo,);
        doneMessages.appendChild(messagesListDone,);

        container.appendChild(todoMessages,);
        container.appendChild(doneMessages,);
        document.body.appendChild(container,);
    }
    createColumn(name, ) {
        const messages = document.createElement('div',);
        const header = document.createElement('h4',);
        messages.className = 'messages__container';
        header.innerText = name;
        messages.appendChild(header,);
        const messagesList = document.createElement('div',);
        messagesList.className = 'messages__list';
        return { messagesList, messages, };
    }
}

export default Messages;
