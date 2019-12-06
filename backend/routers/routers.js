import Router from 'koa-router';
import vcRouter from './vc';
import botRouter from './tBot';

const apiRouter = new Router({ prefix: '/api', },);

apiRouter.use(vcRouter.routes(), vcRouter.allowedMethods(),);
apiRouter.use(botRouter.routes(), botRouter.allowedMethods(),);

export default apiRouter;
