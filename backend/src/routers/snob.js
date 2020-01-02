import Router from 'koa-router';
import request from 'request-promise';
import jsdom from 'jsdom';

const url = 'https://snob.ru';

const router = new Router({ prefix: '/snob', },);

router
    .get('/articles', async (ctx, ) => {
        const { params, } = ctx.request.query;
        const res = await request(`${url}/${params}`,);
        const dom = new jsdom.JSDOM(res,);
        let articles = dom.window.document.querySelectorAll('[href*=entry]',);
        articles = [...articles,];
        articles = articles.filter((article,) => !!article.querySelector('.title',),);

        const articlesObj = new Map();

        articles.forEach((article, ) => {
            const title = article.querySelector('.title',).textContent.trim();
            articlesObj.set(title, {
                link: `${url}${article.href}`,
                preamble: '',
            },);
        },);
        ctx.body = JSON.stringify([...articlesObj,],);
    },);

export default router;
