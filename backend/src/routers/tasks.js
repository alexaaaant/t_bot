import Router from 'koa-router';
import { exec, } from 'child_process';
import { insertMessage, changeMessageStatus, } from '../bd/index';
import request from 'request-promise';

const router = new Router({ prefix: '/task', },);

router.get('/plan', async (ctx, ) => {
    const { chat_id, text, date, time, task_id, } = ctx.request.query;
    await insertMessage(task_id, chat_id, text, `${date} ${time}`, 0,);
    exec(`SCHTASKS /CREATE /SC ONCE /TN TASK${task_id} /TR "powershell Invoke-WebRequest http://localhost:3000/api/bot/sendPlannedMessage?task=${task_id} -UseBasicParsing" /SD ${date} /ST ${time}`,
        (e, stdout, stderr, ) => console.log('errors', e, stdout, stderr,),);
    Object.assign(ctx, { body: 'Success', },);
},);

router.get('/done', async (ctx, ) => {
    const { task_id, } = ctx.request.query;
    await changeMessageStatus(task_id, 1,);
    await request(`http://localhost:${process.env.PORT}/api/task/delete?task_id=${task_id}`,);
    Object.assign(ctx, { body: 'Success', },);
},);

router.get('/delete', async (ctx, ) => {
    exec(`schtasks /delete /tn "TASK${ctx.request.query.task_id}" /f`,
        (e, stdout, stderr, ) => {
            if (e) {
                console.log('errors', e, stdout, stderr,);
            }
        },);
    Object.assign(ctx, { body: 'Success', },);
},);

router.get('/shortLink', async (ctx, ) => {
    const { url, } = ctx.request.query;
    const res = await request({
        uri: 'https://cutt.ly/scripts/shortenUrl.php',
        method: 'POST',
        form: {
            url: url,
        },

    },);
    Object.assign(ctx, { body: JSON.stringify({ url: res, },), },);
},);
export default router;
