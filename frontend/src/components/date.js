class DateComponent {
    constructor() {
        this.form = null;
        this.r = new RegExp(/(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01]) (([01][0-9])|(2[0-3])):[0-5][0-9]$/, 'i',);
    }
    render(x, y, ) {
        this.form = this.createForm();
        this.form.style.left = `${x}px`;
        this.form.style.top = `${y}px`;
        document.body.appendChild(this.form,);
        // this.form.focus();
        // this.form.addEventListener('input', (e, ) => this.changeInput(e,),);
    }

    createForm() {
        const form = document.createElement('form',);
        const inputDate = document.createElement('input',);
        const inputTime = document.createElement('input',);
        const submitButton = document.createElement('button',);

        form.className = 'form-date d-flex flex-column';
        inputDate.className = 'form-date__input';
        inputDate.placeholder = 'Дата';
        inputTime.className = 'form-date__input';
        inputTime.placeholder = 'Время';
        submitButton.type = 'submit';
        submitButton.className = 'form-date__button';
        submitButton.textContent = 'Принять';

        form.appendChild(inputDate,);
        form.appendChild(inputTime,);
        form.appendChild(submitButton,);
        return form;
    }

    changeInput(e, ) {
        if (this.r.test(this.form.value,) && !this.form.classList.contains('valid',)) {
            this.form.classList.add('valid',);
            this.form.classList.remove('invalid',);
        }
        if (!this.r.test(this.form.value,) && !this.form.classList.contains('invalid',)) {
            this.form.classList.add('invalid',);
            this.form.classList.remove('valid',);
        }
    }

    checkValid() {
        if (this.form !== null) {
            return this.form.classList.contains('valid',);
        }
    }

    getDate() {
        return new Date(this.form.value,);
    }

    setUnRenderHandler(handler, ) {
        this.form.addEventListener('blur', () => {
            handler();
            this.unRender();
        },);
    }

    unRender() {
        document.body.removeChild(this.form,);
    }

}

export default DateComponent;
