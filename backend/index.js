import Koa from 'koa';
import Router from 'koa-router';

const HTTP_PORT = 3000;

const app = new Koa();
const router = new Router();

app
    .use(async (ctx, next, ) => {
        await next();
        const rt = ctx.response.get('X-Response-Time',);
        console.log(`${ctx.method} ${ctx.url} - ${rt}`,);
    },)
    .use(router.routes(),)
    .use(router.allowedMethods(),);

router
    .get('/', (ctx, next, ) => {
        ctx.body = 'Hello World!';
    },);

app.listen(HTTP_PORT,);
console.log('Listeting on http://localhost:3000',);
