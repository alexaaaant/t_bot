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

    handleSubmit(e, ) {
        e.preventDefault();
        const { date, time, text, } = e.target.elements;
        this.unRender();
        this.date = new Date(`${date.value} ${time.value}`,);
        this.text = text.value;
        planTask({ date: this.date.toUTCString(), text: this.text, }, this.message,);
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
}

export default FormComponent;
