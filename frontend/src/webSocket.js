import io from 'socket.io-client';
const socket = io('http://localhost:3000',);

socket.on('task_done', (msg, ) => {
    const element = document.getElementById(msg.task_id,);
    element.classList.add('done',);
},);

export default socket;
