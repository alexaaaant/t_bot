import Router from 'koa-router';
import { exec, } from 'child_process';
import { insertMessage, } from '../bd/index';

const router = new Router({ prefix: '/task', },);

router.get('/plan', async (ctx, ) => {
    const { chat_id, text, date, time, task_id, } = ctx.request.query;
    await insertMessage(task_id, chat_id, text, `${date} ${time}`,);
    exec(`SCHTASKS /CREATE /SC ONCE /TN TASK${task_id} /TR "powershell Invoke-WebRequest http://localhost:3000/api/bot/sendPlannedMessage?task=${task_id} -UseBasicParsing" /SD ${date} /ST ${time}`,
        (e, stdout, stderr, ) => console.log('errors', e, stdout, stderr,),);
    Object.assign(ctx, { body: 'Success', },);
},);

router.get('/delete', async (ctx, ) => {
    exec(`schtasks /delete /tn "TASK${ctx.request.query.task}" /f`,
        (e, stdout, stderr, ) => {
            if (e) {
                console.log('errors', e, stdout, stderr,);
            }
        },);
    Object.assign(ctx, { body: 'Success', },);
},);

export default router;
