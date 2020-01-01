import Router from 'koa-router';
import request from 'request-promise';
import jsdom from 'jsdom';

const url = 'https://vc.ru/';

const router = new Router({ prefix: '/vc', },);

router
    .get('/articles', async (ctx, ) => {
        const res = await request(url,);
        const dom = new jsdom.JSDOM(res,);
        let articles = dom.window.document.getElementsByClassName('content-feed',);
        articles = [...articles,];
        const articlesObj = new Map();
        articles.forEach((article, ) => {
            const title = article.querySelector('.content-header__title',).textContent.trim();
            const preamble = article.querySelector('p',);
            articlesObj.set(title, {
                link: article.querySelector('.content-feed__link',).href,
                preamble: preamble ? preamble.textContent : '',
            },);
        },);
        ctx.body = JSON.stringify([...articlesObj,],);
    },);

export default router;
