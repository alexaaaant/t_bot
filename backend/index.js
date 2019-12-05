import Koa from 'koa';
import Router from 'koa-router';
import request from 'request-promise';
import jsdom from 'jsdom';
import cors from '@koa/cors';

const HTTP_PORT = 3000;
const url = 'https://www.the-village.ru';

const app = new Koa();
const router = new Router();

app
    .use(async (ctx, next, ) => {
        await next();
        const rt = ctx.response.get('X-Response-Time',);
        console.log(`${ctx.method} ${ctx.url} - ${rt}`,);
    },)
    .use(cors({ origin: '*', },),)
    .use(router.routes(),)
    .use(router.allowedMethods(),);

router
    .get('/', async (ctx, ) => {
        const res = await request(`${url}/village/city`,);
        const dom = new jsdom.JSDOM(res,);
        let articles = dom.window.document.getElementsByClassName('post-block-featured',);
        articles = [...articles,].slice(0, 10,);
        const articlesObj = new Map();

        articles.forEach((article, ) => {
            const tmpArticle = article.firstChild;
            const title = tmpArticle.children[1].firstChild.textContent;
            articlesObj.set(title, {
                link: `${url}${tmpArticle.href}`,
                preamble: tmpArticle.children[1].lastChild.textContent,
            },);
        },);
        ctx.body = JSON.stringify([...articlesObj,],);
    },);

app.listen(HTTP_PORT,);
console.log('Listeting on http://localhost:3000',);
