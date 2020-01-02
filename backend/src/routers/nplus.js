import Router from 'koa-router';
import request from 'request-promise';
import jsdom from 'jsdom';

const url = 'https://nplus1.ru';

const router = new Router({ prefix: '/nplus', },);

router
    .get('/articles', async (ctx, ) => {
        const res = await request(url,);
        const dom = new jsdom.JSDOM(res,);
        let articles = dom.window.document.getElementsByClassName('item',);
        articles = [...articles,];

        const articlesObj = new Map();

        articles.forEach((article, ) => {
            const title = article.querySelector('h3',);
            const preamble = article.querySelector('.subtitle',) ? article.querySelector('.subtitle',).textContent : '';
            if (title) {
                articlesObj.set(title.textContent.trim(), {
                    link: `${url}${article.querySelector('a',).href}`,
                    preamble,
                },);
            }
        },);
        ctx.body = JSON.stringify([...articlesObj,],);
    },);

export default router;
