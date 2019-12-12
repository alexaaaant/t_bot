import Router from 'koa-router';
import { exec, } from 'child_process';

const router = new Router({ prefix: '/task', },);

router.get('/plan', async (ctx, ) => {
    const { chat_id, text, date, time, task_id, } = ctx.request.query;
    exec(`SCHTASKS /CREATE /SC ONCE /TN TASK${task_id} /TR "powershell Invoke-WebRequest http://localhost:3000/api/bot/sendMessage?chat_id=${chat_id}&text=${text}&task=${task_id} -UseBasicParsing" /SD ${date} /ST ${time}`,
        (e, stdout, stderr, ) => console.log('errors', e, stdout, stderr,),);
    ctx.body = 'Success';
},);

router.get('/delete', async (ctx, ) => {
    exec(`schtasks /delete /tn "${ctx.request.query.task}" /f`,
        (e, stdout, stderr, ) => console.log('errors', e, stdout, stderr,),);
},);

export default router;
