class Message {
    constructor(text = '', date = '', status = '', id = null, chatId = null, ) {
        this.text = text;
        this.date = date;
        this.status = status;
        this.id = id;
        this.chatId = chatId;
        this.handlerClick = () => { };
        this.messageElement = document.createElement('div',);
        this.messageElement.className = 'message';
        this.textElement = null;
        this.dateElement = null;
    }
    setChatId(id, ) {
        this.chatId = id;
    }
    getChatId() {
        return this.chatId;
    }
    setId(id, ) {
        this.id = id;
    }
    getId() {
        return this.id;
    }
    getData() {
        return {
            text: this.text,
            date: this.date,
            status: this.status,
        };
    }
    createDate(date, ) {
        this.dateElement = document.createElement('span',);
        this.dateElement.innerText = date;
        this.dateElement.className = 'message__date';
        return this.dateElement;
    }
    render() {
        this.messageElement.remove();
        this.messageElement = document.createElement('div',);
        this.messageElement.className = 'message';
        
        this.textElement = document.createElement('span',);
        this.textElement.innerText = this.text;
        this.textElement.className = 'message__text';
        this.messageElement.appendChild(this.textElement,);

        this.messageElement.appendChild(this.createDate(this.date,),);
        this.setClickHandler(this.handlerClick,);

        return this.messageElement;
    }
    delete() {
        this.messageElement.remove();
        delete this;
    }

    setClickHandler(handler = null, ) {
        if (handler) {
            this.handlerClick = handler;
            this.messageElement.onclick = () => this.handlerClick(this,);
        }
    }
    setStatus(status, ) {
        this.status = status;
    }
    setDate(date, ) {
        this.date = date;
        if (this.dateElement) {
            this.dateElement.innerText = this.date;
        }
    }
    setText(text, ) {
        this.text = text;
        if (this.textElement) {
            this.textElement.innerText = this.text;
        }
    }

}

export default Message;
