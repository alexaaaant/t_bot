import Router from 'koa-router';
import { exec, } from 'child_process';

const router = new Router({ prefix: '/task', },);

router.get('/plan', async () => {
    exec('SCHTASKS /CREATE /SC ONCE /TN MY_TASK_888 /TR "powershell Invoke-WebRequest http://localhost:3000/api/bot/sendMessage?chat_id=9408538&text=hui&task=MY_TASK_888 -UseBasicParsing" /SD 07.12.2019 /ST 17:53',
        (e, stdout, stderr, ) => console.log('errors', e, stdout, stderr,),);
},);

router.get('/delete', async (ctx, ) => {
    exec(`schtasks /delete /tn "${ctx.request.query.task}" /f`,
        (e, stdout, stderr, ) => console.log('errors', e, stdout, stderr,),);
},);

export default router;
