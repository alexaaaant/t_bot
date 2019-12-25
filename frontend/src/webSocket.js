import io from 'socket.io-client';
import Store from './store';

const store = Store.getInstance();

const socket = io('http://localhost:3000',);

socket.on('task_done', (msg, ) => {
    store.changeMessageStatus(+msg.task_id, '1',);
},);

export default socket;
