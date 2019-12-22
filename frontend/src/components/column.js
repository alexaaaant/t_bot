class Column {
    constructor(name, messages = [], ) {
        this.name = name;
        this.messages = messages;
    }
    render() {
        const messagesElement = document.createElement('div',);
        const header = document.createElement('h4',);
        messagesElement.className = 'messages__container';
        header.innerText = this.getName();
        messagesElement.appendChild(header,);
        const messagesList = document.createElement('div',);
        messagesList.className = 'messages__list';
        const messages = this.getMessages();
        messages.forEach((message, ) => {
            messagesList.appendChild(message.render(),);
        },);
        messagesElement.appendChild(messagesList,);

        return messagesElement;
    }
    getName() {
        return this.name;
    }
    getMessages() {
        return this.messages;
    }
}

export default Column;
