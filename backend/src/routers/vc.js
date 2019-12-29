import Router from 'koa-router';
import request from 'request-promise';
import jsdom from 'jsdom';

const url = 'https://www.the-village.ru';

const router = new Router({ prefix: '/vc', },);

router
    .get('/articles', async (ctx, ) => {
        const { theme, } = ctx.request.query;
        const res = await request(`${url}/village/${theme}`,);
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

export default router;
