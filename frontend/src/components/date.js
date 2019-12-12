class DateComponent {
    constructor() {
        document.addEventListener('click', (e, ) => this.outsideClickListener(e,), true,);
        this.form = null;
        this.isVisible = false;
        this.submitHandler = null;
        this.date = null;
        this.time = null;
    }
    render(x, y, ) {
        this.form = this.createForm();
        this.form.style.left = `${x}px`;
        this.form.style.top = `${y}px`;
        this.isVisible = true;
        document.body.appendChild(this.form,);
    }

    handleSubmit(e, ) {
        e.preventDefault();
        const { date, time, } = e.target.elements;
        this.unRender();
        this.date = date;
        this.time = time;
        this.submitHandler();
    }

    createForm() {
        const form = document.createElement('form',);
        const inputDate = document.createElement('input',);
        const inputTime = document.createElement('input',);
        const submitButton = document.createElement('button',);
        form.addEventListener('submit', (e, ) => this.handleSubmit(e,),);

        form.className = 'form-date d-flex flex-column';
        inputDate.className = 'form-date__input';
        inputDate.autofocus = true;
        inputDate.name = 'date';
        inputDate.placeholder = 'Дата';
        inputDate.type = 'date';
        inputTime.className = 'form-date__input';
        inputTime.name = 'time';
        inputTime.type = 'time';
        inputTime.placeholder = 'Время';
        submitButton.type = 'submit';
        submitButton.className = 'form-date__button';
        submitButton.textContent = 'Запланировать';

        form.appendChild(inputDate,);
        form.appendChild(inputTime,);
        form.appendChild(submitButton,);
        return form;
    }

    getDate() {
        if (!this.date.value || !this.time.value) return null;
        return new Date(this.date.value + ' ' + this.time.value,);
    }

    setSubmitHandler(handler, ) {
        this.submitHandler = handler;
    }

    unRender() {
        this.isVisible = false;
        document.body.removeChild(this.form,);
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

export default DateComponent;
