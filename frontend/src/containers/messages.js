import Column from '../components/column';
class Messages {
    render(columns, ) {
        const container = document.createElement('div',);
        container.className = 'messages d-flex';

        columns.forEach((column, ) => {
            container.appendChild(column,);
        },);

        document.body.appendChild(container,);
    }
    createColumn(name, messages, ) {
        const column = new Column(name, messages,);
        return column.render();
    }
}

export default Messages;
