import Koa from 'koa';
import cors from '@koa/cors';
import routers from './routers/routers';
import dotenv from 'dotenv';
import io from 'socket.io';
import http from 'http';
dotenv.config();

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
    .use(cors({ origin: 'http://localhost:8000', credentials: true, },),)
    .use(routers.routes(), routers.allowedMethods(),);

const server = http.createServer(app.callback(),);

server.listen(process.env.PORT,);

const webSocket = io.listen(server,);

webSocket.on('connection', (socket, ) => {
    console.log('a user connected',);
},);

console.log(`Listeting on http://localhost:${process.env.PORT}`,);

export default webSocket;
