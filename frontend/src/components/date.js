class DateComponent {
    constructor() {
        this.popup = null;
        this.r = new RegExp(/(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01]) (([01][0-9])|(2[0-3])):[0-5][0-9]$/, 'i',);
    }
    render(x, y, ) {
        this.popup = this.createPopup();
        this.popup.style.left = `${x}px`;
        this.popup.style.top = `${y}px`;
        document.body.appendChild(this.popup,);
        this.popup.focus();
        this.popup.addEventListener('input', (e, ) => this.changeInput(e,),);
    }

    changeInput(e, ) {
        if (this.r.test(this.popup.value,) && !this.popup.classList.contains('valid',)) {
            this.popup.classList.add('valid',);
            this.popup.classList.remove('invalid',);
        }
        if (!this.r.test(this.popup.value,) && !this.popup.classList.contains('invalid',)) {
            this.popup.classList.add('invalid',);
            this.popup.classList.remove('valid',);
        }
    }

    createPopup() {
        const popup = document.createElement('input',);
        popup.className = 'popup';
        return popup;
    }

    checkValid() {
        if (this.popup !== null) {
            return this.popup.classList.contains('valid',);
        }
    }

    getDate() {
        return new Date(this.popup.value,);
    }

    setUnRenderHandler(handler, ) {
        this.popup.addEventListener('blur', () => {
            handler();
            this.unRender();
        },);
    }

    unRender() {
        document.body.removeChild(this.popup,);
    }

}

export default DateComponent;
