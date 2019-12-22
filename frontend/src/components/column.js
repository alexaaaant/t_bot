class Column {
    constructor(name, messages = [], clickHandler = null, ) {
        this.name = name;
        this.messages = messages;
        this.column = null;
        this.messagesList = document.createElement('div',);
        this.messagesList.className = 'messages__list';
        this.clickHandler = clickHandler;
    }
    render() {
        this.column = document.createElement('div',);
        const header = document.createElement('h4',);
        this.column.className = 'messages__container';
        header.innerText = this.getName();
        this.column.appendChild(header,);

        const messages = this.getMessages();
        messages.forEach((message, ) => {
            this.addMessage(message,);
        },);
        this.column.appendChild(this.messagesList,);

        return this.column;
    }
    addMessage(message, ) {
        message.setClickHandler(this.clickHandler,);
        this.messagesList.appendChild(message.render(),);
    }
    getName() {
        return this.name;
    }
    getMessages() {
        return this.messages;
    }
}

export default Column;
