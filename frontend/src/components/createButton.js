class CreateButton {
    constructor() {
        this.button = document.createElement('div',);
        this.button.classList.add('create-button',);
        this.container = null;
        this.handlerClick = null;
    }
    render() {
        this.setHandlerClick(this.handlerClick,);
        document.body.appendChild(this.button,);
    }
    setHandlerClick(handler, ) {
        if (handler) {
            this.handlerClick = handler;
            this.button.addEventListener('click', () => this.handlerClick(),);
        }
    }
}

export default CreateButton;
