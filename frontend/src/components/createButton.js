import DateComponent from './date';

class CreateButton {
    constructor() {
        this.button = null;
        this.container = null;
    }
    render() {
        this.dateComponent = new DateComponent();
        this.dateComponent.setSubmitHandler(this.something,);

        this.button = document.createElement('div',);
        this.button.classList.add('create-button',);
        this.button.addEventListener('click', () => this.handleClick(),);

        document.body.appendChild(this.button,);
    }
    handleClick() {
        document.body.appendChild(this.dateComponent.render(0, 0,),);
        console.log('handleClick',);
    }
    something() {
        console.log('something',);
    }
}

export default CreateButton;
