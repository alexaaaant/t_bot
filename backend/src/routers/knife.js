import Router from 'koa-router';
import request from 'request-promise';
import jsdom from 'jsdom';

const url = 'https://knife.media/label/editorial/';

const router = new Router({ prefix: '/knife', },);

router
    .get('/articles', async (ctx, ) => {
        const res = await request(`${url}`,);
        const dom = new jsdom.JSDOM(res,);
        ctx.body = res;
        let articles = dom.window.document.getElementsByClassName('unit__content-link',);
        articles = [...articles,];
        const articlesObj = new Map();

        articles.forEach((article, ) => {
            const link = article.href;
            const title = article.childNodes[0].textContent;
            const preamble = article.childNodes[1] ? article.childNodes[1].textContent : '';
            articlesObj.set(title, {
                link: link,
                preamble: preamble,
            },);
        },);
        ctx.body = JSON.stringify([...articlesObj,],);
    },);

export default router;
