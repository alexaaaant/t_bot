import Router from 'koa-router';
import request from 'request-promise';
import jsdom from 'jsdom';

const url = 'https://www.vice.com/ru/read';

const router = new Router({ prefix: '/vice', },);

router
    .get('/articles', async (ctx, ) => {
        const res = await request(url,);
        const dom = new jsdom.JSDOM(res,);
        let articles = dom.window.document.querySelectorAll('a.grid__wrapper__card',);
        articles = [...articles,];
        const articlesObj = new Map();
        articles.forEach((article, ) => {
            const title = article.querySelector('.grid__wrapper__card__text__title',).textContent.trim();
            articlesObj.set(title, {
                link: `https://www.vice.com${article.href}`,
                preamble: article.querySelector('.grid__wrapper__card__text__summary',).textContent,
            },);
        },);
        ctx.body = JSON.stringify([...articlesObj,],);
    },);

export default router;
