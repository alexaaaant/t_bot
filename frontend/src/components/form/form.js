import Message from '../message';
import Store from '../../store';

const store = Store.getInstance();
class FormComponent {
    constructor(params = {}, ) {
        this.message = params;
        this.form = null;
        this.isVisible = false;
        this.date = this.formatDate(new Date(params.date,),);
        this.time = this.formatTime(new Date(params.date,),);
        this.text = params.text || '';
        this.formContainer = null;
    }

    getTwoDigits(value, ) {
        return value < 10 ? `0${value}` : value;
    }
    formatDate(date, ) {
        const day = this.getTwoDigits(date.getDate(),);
        const month = this.getTwoDigits(date.getMonth() + 1,);
        const year = date.getFullYear();

        return `${year}-${month}-${day}`;
    }
    formatTime(date, ) {
        const hours = this.getTwoDigits(date.getHours(),);
        const mins = this.getTwoDigits(date.getMinutes(),);
        return `${hours}:${mins}`;
    }

    render() {
        this.form = this.createForm();
        this.isVisible = true;
        document.addEventListener('click', (e, ) => this.outsideClickListener(e,), true,);
        this.formContainer = document.createElement('div',);
        this.formContainer.classList.add('form-container',);
        this.formContainer.appendChild(this.form,);
        return this.formContainer;
    }

    handleSubmit(e, ) {
        e.preventDefault();
        const { date, time, text, } = e.target.elements;
        this.unRender();
        this.date = new Date(`${date.value} ${time.value}`,);
        this.text = text.value;
        this.planTask({ date: this.date.toUTCString(), text: this.text, },);
    }

    createForm() {
        const form = document.createElement('form',);
        const inputDate = document.createElement('input',);
        const inputTime = document.createElement('input',);
        const textArea = document.createElement('textarea',);
        const submitButton = document.createElement('button',);
        form.addEventListener('submit', (e, ) => this.handleSubmit(e,),);

        form.className = 'form-date d-flex flex-column';

        inputDate.className = 'form-date__input';
        inputDate.autofocus = true;
        inputDate.name = 'date';
        inputDate.placeholder = 'Дата';
        inputDate.type = 'date';
        inputDate.value = this.date;

        inputTime.className = 'form-date__input';
        inputTime.name = 'time';
        inputTime.type = 'time';
        inputTime.placeholder = 'Время';
        inputTime.value = this.time;

        textArea.className = 'form-date__text';
        textArea.value = this.text;
        textArea.name = 'text';

        submitButton.type = 'submit';
        submitButton.className = 'form-date__button';
        submitButton.textContent = 'Запланировать';

        form.appendChild(inputDate,);
        form.appendChild(inputTime,);
        form.appendChild(textArea,);
        form.appendChild(submitButton,);
        return form;
    }

    getDate() {
        if (!this.date || !this.time) return null;
        return new Date(this.date + ' ' + this.time,);
    }

    unRender() {
        this.isVisible = false;
        this.formContainer.remove();
    }

    outsideClickListener(event, ) {
        if (!this.form.contains(event.target,) && this.isVisible) {
            if (this.handler) {
                this.handler();
            }
            this.unRender();
            this.removeClickListener();
        }
    }

    removeClickListener() {
        document.removeEventListener('click', (e, ) => this.outsideClickListener(e,),);
    }

    async planTask(params,) {
        const chat_id = 9408538;
        const { date, text, } = params;
        fetch(encodeURI(`http://localhost:${process.env.PORT}/api/task/plan?text=${text}&date=${date}&chat_id=${chat_id}`,),)
            .then((res, ) => {
                if (res.ok) {
                    res.json()
                        .then((body, ) => {
                            if (this.message && this.message.messageElement) {
                                this.message.setDate(new Date(date,).toString(),);
                                this.message.setText(text,);
                                store.addMessage(body.id, this.message,);
                                store.changeMessageStatus(body.id, '0',);
                            } else {
                                const message = new Message(text, new Date(date,).toString(), '0',);
                                store.addMessage(body.id, message,);
                                store.changeMessageStatus(body.id, '0',);
                            }
                        },);
                } else {
                    throw res;
                }
            },)
            .catch((e, ) => console.log('e', e,),);
    }
}

export default FormComponent;
