import Router from 'koa-router';
import villageRouter from './village';
import botRouter from './tBot';
import taskRouter from './tasks';
import messagesRouter from './messages';
import knifeRouter from './knife';
import vcRouter from './vc';
import snobRouter from './snob';
import nakedScienceRouter from './nakedScience';
import newtonewRouter from './newtonew';
import viceRouter from './vice';
import nplus from './nplus';
import forbes from './forbes';

const apiRouter = new Router({ prefix: '/api', },);

apiRouter.use(villageRouter.routes(), villageRouter.allowedMethods(),);
apiRouter.use(botRouter.routes(), botRouter.allowedMethods(),);
apiRouter.use(taskRouter.routes(), taskRouter.allowedMethods(),);
apiRouter.use(messagesRouter.routes(), messagesRouter.allowedMethods(),);
apiRouter.use(knifeRouter.routes(), knifeRouter.allowedMethods(),);
apiRouter.use(vcRouter.routes(), vcRouter.allowedMethods(),);
apiRouter.use(snobRouter.routes(), snobRouter.allowedMethods(),);
apiRouter.use(nakedScienceRouter.routes(), nakedScienceRouter.allowedMethods(),);
apiRouter.use(newtonewRouter.routes(), newtonewRouter.allowedMethods(),);
apiRouter.use(viceRouter.routes(), viceRouter.allowedMethods(),);
apiRouter.use(nplus.routes(), nplus.allowedMethods(),);
apiRouter.use(forbes.routes(), forbes.allowedMethods(),);

export default apiRouter;
