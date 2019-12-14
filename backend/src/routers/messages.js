import Router from 'koa-router';
import { getAllMessages, } from '../bd/index';

const router = new Router({ prefix: '/messages', },);

router
    .get('/all', async (ctx, ) => {
        const res = await getAllMessages();
        Object.assign(ctx, { body: res, },);
    },);

export default router;
