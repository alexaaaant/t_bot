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

        this.container = document.createElement('div',);
        this.container.classList.add('creating-container',);
        this.container.appendChild(this.button,);
        return this.container;
    }
    handleClick() {
        this.container.appendChild(this.dateComponent.render(-130, -175,),);
        console.log('handleClick',);
    }
    something() {
        console.log('something',);
    }
}

export default CreateButton;
