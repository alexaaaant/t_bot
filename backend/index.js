import Koa from 'koa';
import cors from '@koa/cors';
import routers from './routers/routers';

const HTTP_PORT = 3000;

const app = new Koa();

app
    .use(async (ctx, next, ) => {
        await next();
        const rt = ctx.response.get('X-Response-Time',);
        console.log(`${ctx.method} ${ctx.url} - ${rt}`,);
    },)
    .use(async (ctx, next, ) => {
        const start = Date.now();
        await next();
        const ms = Date.now() - start;
        ctx.set('X-Response-Time', `${ms}ms`,);
    },)
    .use(cors({ origin: '*', },),)
    .use(routers.routes(), routers.allowedMethods(),);

app.listen(HTTP_PORT,);
console.log('Listeting on http://localhost:3000',);
