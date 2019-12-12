const { Pool, } = require('pg',);

const pool = new Pool;

const getAllMessages = () => {
    return pool.query('select * from messages',)
        .then((res, ) => {
            return res.rows;

        },)
        .catch((err, ) => {
            return err;
        },);
};

const insertMessage = (taskId, chatId, text, date, ) => {
    return pool.query(`insert into messages values
    (${taskId},${chatId}, '${text}', '${date}')`,)
        .then((res, ) => {
            return res;
        },)
        .catch((err, ) => {
            return err;
        },);
};

const getMessage = (taskId, ) => {
    return pool.query(`select * from messages where task_id=${taskId}`,)
        .then((res, ) => {
            return res.rows[0];
        },)
        .catch((err, ) => {
            return err;
        },);
};

export {
    getAllMessages,
    insertMessage,
    getMessage,
};
