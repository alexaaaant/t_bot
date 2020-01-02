import Router from 'koa-router';
import villageRouter from './village';
import botRouter from './tBot';
import taskRouter from './tasks';
import messagesRouter from './messages';
import knifeRouter from './knife';
import vcRouter from './vc';
import snobRouter from './snob';
import nakedScienceRouter from './nakedScience';
import newtonew from './newtonew';

const apiRouter = new Router({ prefix: '/api', },);

apiRouter.use(villageRouter.routes(), villageRouter.allowedMethods(),);
apiRouter.use(botRouter.routes(), botRouter.allowedMethods(),);
apiRouter.use(taskRouter.routes(), taskRouter.allowedMethods(),);
apiRouter.use(messagesRouter.routes(), messagesRouter.allowedMethods(),);
apiRouter.use(knifeRouter.routes(), knifeRouter.allowedMethods(),);
apiRouter.use(vcRouter.routes(), vcRouter.allowedMethods(),);
apiRouter.use(snobRouter.routes(), snobRouter.allowedMethods(),);
apiRouter.use(nakedScienceRouter.routes(), nakedScienceRouter.allowedMethods(),);
apiRouter.use(newtonew.routes(), newtonew.allowedMethods(),);

export default apiRouter;
