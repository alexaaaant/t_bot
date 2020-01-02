import Router from 'koa-router';
import request from 'request-promise';
import jsdom from 'jsdom';

const url = 'https://newtonew.com/archive';

const router = new Router({ prefix: '/newtonew', },);

router
    .get('/articles', async (ctx, ) => {
        const res = await request(url,);
        const dom = new jsdom.JSDOM(res,);
        let articles = dom.window.document.getElementsByClassName('n2-card_common',);
        articles = [...articles,];

        const articlesObj = new Map();

        articles.forEach((article, ) => {
            const title = article.querySelector('.n2-card__title',).textContent.trim();
            articlesObj.set(title, {
                link: `https://newtonew.com${article.querySelector('a',).href}`,
                preamble: '',
            },);
        },);
        ctx.body = JSON.stringify([...articlesObj,],);
    },);

export default router;
