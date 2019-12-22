class DateComponent {
    constructor(params = {}, ) {
        this.form = null;
        this.isVisible = false;
        this.submitHandler = null;
        this.date = this.formatDate(new Date(params.date,),) || '';
        this.time = this.formatTime(new Date(params.date,),) || '';
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

        return `${year}-${day}-${month}`;
    }
    formatTime(date, ) {
        const hours = this.getTwoDigits(date.getHours(),);
        const mins = this.getTwoDigits(date.getMinutes(),);
        return `${hours}:${mins}`;
    }

    formattingDate(dateWithoutFormatting, ) {
        let day = dateWithoutFormatting.getDate();
        let month = dateWithoutFormatting.getMonth() + 1;
        const year = dateWithoutFormatting.getFullYear();
        let hours = dateWithoutFormatting.getHours();
        let minunes = dateWithoutFormatting.getMinutes();
        if (day < 10) {
            day = '0' + day;
        }
        if (month < 10) {
            month = '0' + month;
        }
        if (minunes < 10) {
            minunes = '0' + minunes;
        }
        if (hours < 10) {
            hours = '0' + hours;
        }
        return {
            dateStr: `${day}.${month}.${year}`,
            timeStr: `${hours}:${minunes}`,
        };
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
        this.date = date.value;
        this.time = time.value;
        this.text = text.value;
        const { dateStr, timeStr, } = this.formattingDate(new Date(`${this.date} ${this.time}`,),);
        this.submitHandler({ date: dateStr, time: timeStr, text: this.text, },);
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

    setSubmitHandler(handler, ) {
        this.submitHandler = handler;
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

export default DateComponent;
