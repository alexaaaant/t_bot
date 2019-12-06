import Router from 'koa-router';
import vcRouter from './vc';

const apiRouter = new Router({ prefix: '/api', },);

apiRouter.use(vcRouter.routes(), vcRouter.allowedMethods(),);

export default apiRouter;
