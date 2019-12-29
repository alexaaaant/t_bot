import Router from 'koa-router';
import vcRouter from './vc';
import botRouter from './tBot';
import taskRouter from './tasks';
import messagesRouter from './messages';
import knifeRouter from './knife';

const apiRouter = new Router({ prefix: '/api', },);

apiRouter.use(vcRouter.routes(), vcRouter.allowedMethods(),);
apiRouter.use(botRouter.routes(), botRouter.allowedMethods(),);
apiRouter.use(taskRouter.routes(), taskRouter.allowedMethods(),);
apiRouter.use(messagesRouter.routes(), messagesRouter.allowedMethods(),);
apiRouter.use(knifeRouter.routes(), knifeRouter.allowedMethods(),);

export default apiRouter;
