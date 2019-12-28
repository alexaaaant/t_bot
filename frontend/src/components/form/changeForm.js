import Form from './form';
import { deleteTask, } from '../../actions';

class ChangeForm extends Form {
    constructor(params = {}, ) {
        super(params,);
    }
    createSubmitButton() {
        const submitButton = document.createElement('button',);

        submitButton.type = 'submit';
        submitButton.className = 'form-date__button';
        submitButton.textContent = 'Изменить';
        return submitButton;
    }

    createDeleteButton() {
        const deleteButton = document.createElement('button',);

        deleteButton.type = 'button';
        deleteButton.className = 'form-date__button';
        deleteButton.textContent = 'Удалить';
        deleteButton.addEventListener('click', () => this.deleteTask(this.message.getId(),),);
        return deleteButton;
    }

    handleSubmit(e, ) {
        e.preventDefault();
        const { date, time, text, } = e.target.elements;
        this.unRender();
        this.date = new Date(`${date.value} ${time.value}`,);
        this.text = text.value;
        console.log('some function',);
        // planTask({ date: this.date.toUTCString(), text: this.text, }, this.message,);
    }
    createElements() {
        const elements = super.createElements();
        elements.push(this.createDeleteButton(),);
        return elements;
    }
    deleteTask(id, ) {
        deleteTask(id,)
            .then(() => {
                this.unRender();
            },)
            .catch((err, ) => {
                console.log('err', err,);
            },);
    }
}

export default ChangeForm;
