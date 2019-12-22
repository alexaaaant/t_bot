class Message {
    constructor(text = '', date = '', status = '', ) {
        this.text = text;
        this.date = date;
        this.status = status;
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
        const messageElement = document.createElement('div',);
        messageElement.className = 'message';

        if (this.status === '0') {
            messageElement.classList.add('message_to-do',);
        } else if (this.status === '1') {
            messageElement.classList.add('message_done',);
        }

        const textElement = document.createElement('span',);
        textElement.innerText = this.text;
        messageElement.appendChild(textElement,);

        messageElement.appendChild(this.createDate(this.date,),);

        return messageElement;
    }

}

export default Message;
