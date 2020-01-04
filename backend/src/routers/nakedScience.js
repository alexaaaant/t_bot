import Router from 'koa-router';
import request from 'request-promise';
import jsdom from 'jsdom';

const url = 'https://naked-science.ru';

const router = new Router({ prefix: '/nakedScience', },);

router
    .get('/articles', async (ctx, ) => {
        const res = await request(url,);
        const dom = new jsdom.JSDOM(res,);
        let articles = dom.window.document.getElementsByClassName('news-item',);
        articles = [...articles,];

        const articlesObj = new Map();

        articles.forEach((article, ) => {
            const title = article.querySelector('a',).textContent.trim();
            articlesObj.set(title, {
                link: `${article.querySelector('a',).href}`,
                preamble: `${article.querySelector('p',).textContent}`,
            },);
        },);
        ctx.body = JSON.stringify([...articlesObj,],);
    },);

export default router;
