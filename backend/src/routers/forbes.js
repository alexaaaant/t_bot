import Router from 'koa-router';
import request from 'request-promise';
import jsdom from 'jsdom';

const url = 'https://www.forbes.ru';

const router = new Router({ prefix: '/forbes', },);

router
    .get('/articles', async (ctx, ) => {
        const res = await request(url,);
        const dom = new jsdom.JSDOM(res,);
        let articles = dom.window.document.querySelectorAll('.card',);
        articles = [...articles,];
        const articlesObj = new Map();

        articles.forEach((article, ) => {
            const title = article.querySelector('.card__title',).textContent;
            articlesObj.set(title, {
                link: article.querySelector('a',).href,
                preamble: article.querySelector('a',).title,
            },);
        },);
        ctx.body = JSON.stringify([...articlesObj,],);
    },);

export default router;
