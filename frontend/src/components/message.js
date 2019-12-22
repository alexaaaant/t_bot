class Message {
    constructor(text = '', date = '', status = '', ) {
        this.text = text;
        this.date = date;
        this.status = status;
        this.handlerClick = () => { };
        this.messageElement = document.createElement('div',);
        this.messageElement.className = 'message';
    }
    getData() {
        return {
            text: this.text,
            date: this.date,
            status: this.status,
        };
    }
    createDate(date, ) {
        const dateElement = document.createElement('span',);
        dateElement.innerText = date;
        dateElement.className = 'message__date';
        return dateElement;
    }
    render() {
        if (this.status === '0') {
            this.messageElement.classList.add('message_to-do',);
        } else if (this.status === '1') {
            this.messageElement.classList.add('message_done',);
        }

        const textElement = document.createElement('span',);
        textElement.innerText = this.text;
        this.messageElement.appendChild(textElement,);

        this.messageElement.appendChild(this.createDate(this.date,),);
        this.setClickHandler(this.handler,);

        return this.messageElement;
    }

    setClickHandler(handler = null, ) {
        if (handler) {
            this.handlerClick = handler;
            this.messageElement.onclick = () => this.handlerClick();
        }
    }

}

export default Message;
