import Koa from 'koa';
import Router from 'koa-router';
import http from 'http';

const HOST = 'localhost';
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


http.createServer(app.callback(),)
    .listen(HTTP_PORT, HOST, listeningReporter,);

function listeningReporter() {
    const { address, port, } = this.address();
    const protocol = this.addContext ? 'https' : 'http';
    console.log(`Listening on ${protocol}://${address}:${port}...`,);
}