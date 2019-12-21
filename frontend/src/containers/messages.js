class Messages {
    constructor() {

    }
    render(messages, ) {
        const container = document.createElement('div',);
        container.className = 'messages d-flex';

        const { messagesList: messagesListTodo, messages: todoMessages, } = this.createColumn('To do',);
        const { messagesList: messagesListDone, messages: doneMessages, } = this.createColumn('Done',);

        messages.forEach((message, ) => {
            const messageElement = this.createMessage(message,);

            if (message.status === '0') {
                messageElement.classList.add('message_to-do',);
                messagesListTodo.appendChild(messageElement,);
            }
            if (message.status === '1') {
                messageElement.classList.add('message_done',);
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
    createMessage(message, ) {
        const messageElement = document.createElement('div',);
        messageElement.className = 'message';
        const textElement = document.createElement('span',);
        textElement.innerText = message.text;
        messageElement.appendChild(textElement,);

        const dateElement = this.createDate(message.date,);
        messageElement.appendChild(dateElement,);

        return messageElement;
    }
    createDate(date, ) {
        const dateElement = document.createElement('span',);
        dateElement.innerText = date;
        dateElement.className = 'message__date';
        return dateElement;
    }
}

export default Messages;
