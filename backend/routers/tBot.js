import Router from 'koa-router';
import request from 'request-promise';
import dotenv from 'dotenv';
dotenv.config();

const url = `${process.env.T_BOT_ADRESS}/bot${process.env.T_BOT_TOKEN}`;

const router = new Router({ prefix: '/bot', },);

router
    .get('/getMe', async (ctx, ) => {
        const res = await request(`${url}/getMe`,);
        ctx.body = res;
    },);

router
    .get('/getUpdates', async (ctx, ) => {
        const res = await request(`${url}/getUpdates?offset=${ctx.request.query.offset}&timeout=100`,);
        Object.assign(ctx, { body: res, },);
        const updates = JSON.parse(res,);
        let lastUpdateID = 0;
        if (updates.ok === true && updates.result.length) {
            updates.result.forEach((update, ) => {
                const text = `${update.message.from.first_name}, пока что единственное, что я могу сказать абсолютно точно, что вареники с вишней лучше чем с картошкой`;
                request(encodeURI(`http://localhost:3000/api/bot/sendMessage?chat_id=${update.message.chat.id}&text=${text}`,),);
            },);
            lastUpdateID = updates.result[updates.result.length - 1].update_id + 1;
        }
        request(`http://localhost:3000/api/bot/getUpdates?offset=${lastUpdateID}`,);
    },);

router
    .get('/sendMessage', async (ctx, ) => {
        const { chat_id, text, } = ctx.request.query;
        await request(encodeURI(`${url}/sendMessage?chat_id=${chat_id}&text=${text}&parse_mode=markdown`,),);
        Object.assign(ctx, { body: 'Send success!', },);
    },);

request(`http://localhost:${process.env.PORT}/api/bot/getUpdates`,);

export default router;
