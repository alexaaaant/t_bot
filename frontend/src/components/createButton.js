import DateComponent from './date';

class CreateButton {
    constructor() {
        this.dateComponent = new DateComponent();
        this.button = null;
    }
    render() {
        this.button = document.createElement('div',);
        this.button.classList.add('create-button',);
        this.button.addEventListener('click', this.handleClick,);
        return this.button;
    }
    handleClick() {
        this.dateComponent.render(0, 0,);
        this.dateComponent.setSubmitHandler(this.something,);
    }
    something() {
        console.log('something',);
    }
}

export default CreateButton;
