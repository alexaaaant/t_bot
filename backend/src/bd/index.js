const { Pool, } = require('pg',);

const pool = new Pool;

const getAllMessages = () => {
    return pool.query('select * from messages',)
    .then((res,) => {
        return res.rows;

    },)
    .catch((err,) => {
        console.log(err,);
    },);
};


export {
    getAllMessages,
};
