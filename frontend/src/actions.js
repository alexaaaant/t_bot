import Store from './store';
import Message from './components/message';

const store = Store.getInstance();

export const planTask = (params, message, ) => {
    const chat_id = 9408538;
    const { date, text, } = params;
    fetch(encodeURI(`http://localhost:${process.env.PORT}/api/task/plan?text=${text}&date=${date}&chat_id=${chat_id}`,),)
        .then((res, ) => {
            if (res.ok) {
                res.json()
                    .then((body, ) => {
                        if (message && message.messageElement) {
                            message.setDate(new Date(date,).toString(),);
                            message.setText(text,);
                            store.addMessage(body.id, message,);
                            store.changeMessageStatus(body.id, '0',);
                        } else {
                            const message = new Message(text, new Date(date,).toString(), '0',);
                            store.addMessage(body.id, message,);
                            store.changeMessageStatus(body.id, '0',);
                        }
                    },);
            } else {
                throw res;
            }
        },)
        .catch((e, ) => console.log('e', e,),);
};
