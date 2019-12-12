import Router from 'koa-router';
import vcRouter from './vc';
import botRouter from './tBot';
import taskRouter from './tasks';

const apiRouter = new Router({ prefix: '/api', },);

apiRouter.use(vcRouter.routes(), vcRouter.allowedMethods(),);
apiRouter.use(botRouter.routes(), botRouter.allowedMethods(),);
apiRouter.use(taskRouter.routes(), taskRouter.allowedMethods(),);

export default apiRouter;
