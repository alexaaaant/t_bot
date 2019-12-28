const { Pool, } = require('pg',);

const pool = new Pool();

const getAllMessages = () => {
    return pool.query('select * from messages',)
        .then((res, ) => {
            return res.rows;
        },)
        .catch((err, ) => {
            throw err;
        },);
};

const insertMessage = (chatId, text, date, status, ) => {
    return pool.query(`insert into messages values (${chatId}, '${text}', '${date}', ${status}) returning id`,)
        .then((res, ) => {
            return res.rows[0];
        },)
        .catch((err, ) => {
            throw err;
        },);
};

const getMessage = (taskId, ) => {
    return pool.query(`select * from messages where id=${taskId}`,)
        .then((res, ) => {
            return res.rows[0];
        },)
        .catch((err, ) => {
            throw err;
        },);
};

const changeMessageStatus = (taskId, status, ) => {
    return pool.query(`update messages set status=${status} where id=${taskId}`,)
        .then((res, ) => {
            return res.rows[0];
        },)
        .catch((err, ) => {
            throw err;
        },);
};

const deleteMessage = (id,) => {
    return pool.query(`delete from messages where id=${id} returning id`,)
        .then((res,) => {
            return res.rows[0];
        },)
        .catch((err, ) => {
            throw err;
        },);
};

export {
    getAllMessages,
    insertMessage,
    getMessage,
    changeMessageStatus,
    deleteMessage,
};
