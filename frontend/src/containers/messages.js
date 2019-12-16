class Messages {
    constructor() {

    }
    render(messages, ) {
        const container = document.createElement('div',);
        container.className = 'messages d-flex';

        const todoMessages = document.createElement('div',);
        const headerTodo = document.createElement('h4',);
        todoMessages.className = 'messages__container';
        headerTodo.innerText = 'To do';
        todoMessages.appendChild(headerTodo,);
        const messagesListTodo = document.createElement('div',);
        messagesListTodo.className = 'messages__list';

        const doneMessages = document.createElement('div',);
        const headerDone = document.createElement('h4',);
        doneMessages.className = 'messages__container';
        headerDone.innerText = 'Done';
        doneMessages.appendChild(headerDone,);
        const messagesListDone = document.createElement('div',);
        messagesListDone.className = 'messages__list';

        messages.forEach((message, ) => {
            const messageElement = document.createElement('div',);
            messageElement.className = 'message';
            messageElement.innerText = message.text;
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
}

export default Messages;
