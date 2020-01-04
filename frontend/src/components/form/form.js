import { planTask, } from '../../actions';

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

    async handleSubmit(e, ) {
        e.preventDefault();
        const { date, time, text, } = e.target.elements;
        this.unRender();
        this.date = new Date(`${date.value} ${time.value}`,);
        this.text = text.value;

        const regLink = new RegExp('(http|https)://(.*)',);
        const link = this.text.match(regLink,)[0];
        const shortLink = await this.shortLink(link,);

        planTask({ date: this.date.toUTCString(), text: this.text.replace(link, shortLink.url,), }, this.message,);
    }

    async shortLink(link, ) {
        const res = await fetch(`http://localhost:${process.env.PORT}/api/task/shortLink?url=${link}`,);
        return await res.json();
    }

    createForm() {
        const elements = this.createElements();

        const form = document.createElement('form',);

        form.addEventListener('submit', (e, ) => this.handleSubmit(e,),);
        form.className = 'form-date d-flex flex-column';
        elements.forEach((element, ) => {
            form.appendChild(element,);
        },);
        return form;
    }

    createElements() {
        const inputDate = this.createInputDate();
        const inputTime = this.createInputTime();
        const textArea = this.createTextArea();
        const submitButton = this.createSubmitButton();
        return [inputDate, inputTime, textArea, submitButton,];
    }

    createInputDate() {
        const inputDate = document.createElement('input',);

        inputDate.className = 'form-date__input';
        inputDate.autofocus = true;
        inputDate.name = 'date';
        inputDate.placeholder = 'Дата';
        inputDate.type = 'date';
        inputDate.value = this.date;
        return inputDate;
    }
    createInputTime() {
        const inputTime = document.createElement('input',);

        inputTime.className = 'form-date__input';
        inputTime.name = 'time';
        inputTime.type = 'time';
        inputTime.placeholder = 'Время';
        inputTime.value = this.time;
        return inputTime;
    }

    createTextArea() {
        const textArea = document.createElement('textarea',);

        textArea.className = 'form-date__text';
        textArea.value = this.text;
        textArea.name = 'text';
        return textArea;
    }
    createSubmitButton() {
        const submitButton = document.createElement('button',);

        submitButton.type = 'submit';
        submitButton.className = 'form-date__button';
        submitButton.textContent = 'Запланировать';
        return submitButton;
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
}

export default FormComponent;
