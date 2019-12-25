export default class Store {
    constructor() {
        this.state = {
            messages: new Map(),
            columns: new Map(),
        };
    }
    addMessage(id, message, ) {
        this.state.messages.set(id, message,);
    }
    getMessage(id, ) {
        return this.state.messages.get(id,);
    }
    deleteMessage(id, ) {
        this.state.messages.delete(id,);
    }

    addColumn(id, column, ) {
        this.state.columns.set(id, column,);
    }
    getColumn(id, ) {
        return this.state.columns.get(id,);
    }
    deleteColumn(id, ) {
        this.state.columns.delete(id,);
    }
    changeMessageStatus(messageId, status,) {
        const message = this.state.messages.get(messageId,);
        message.setStatus(status,);
        const column = this.state.columns.get(status,);
        column.addMessage(message,);
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new Store();
        return this.instance;
    }
}

Store.instance = null;