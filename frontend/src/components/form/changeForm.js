import Form from './form';

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
}

export default ChangeForm;
