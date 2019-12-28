import Router from 'koa-router';
import { exec, } from 'child_process';
import { insertMessage, changeMessageStatus, deleteMessage, } from '../bd/index';
import request from 'request-promise';
import webSocket from '../index';

const router = new Router({ prefix: '/task', },);

function formattingDate(dateWithoutFormatting, ) {
    let day = dateWithoutFormatting.getDate();
    let month = dateWithoutFormatting.getMonth() + 1;
    const year = dateWithoutFormatting.getFullYear();
    let hours = dateWithoutFormatting.getHours();
    let minunes = dateWithoutFormatting.getMinutes();
    if (day < 10) {
        day = '0' + day;
    }
    if (month < 10) {
        month = '0' + month;
    }
    if (minunes < 10) {
        minunes = '0' + minunes;
    }
    if (hours < 10) {
        hours = '0' + hours;
    }
    return {
        dateStr: `${day}.${month}.${year}`,
        timeStr: `${hours}:${minunes}`,
    };
}

router.get('/plan', async (ctx, ) => {
    const { chat_id, text, date, } = ctx.request.query;
    const currentDate = new Date(new Date(date,).toString(),);
    const { dateStr, timeStr, } = formattingDate(currentDate,);
    const res = await insertMessage(chat_id, text, `${currentDate}`, 0,);
    exec(`SCHTASKS /CREATE /SC ONCE /TN TASK${res.id} /TR "powershell Invoke-WebRequest http://localhost:3000/api/bot/sendPlannedMessage?task=${res.id} -UseBasicParsing" /SD ${dateStr} /ST ${timeStr}`,
        (e, stdout, stderr, ) => console.log('errors', e, stdout, stderr,),);
    Object.assign(ctx, { body: JSON.stringify(res,), },);
},);

router.get('/done', async (ctx, ) => {
    const { task_id, } = ctx.request.query;
    await changeMessageStatus(task_id, 1,);
    await request(`http://localhost:${process.env.PORT}/api/task/deleteSchtask?task_id=${task_id}`,);
    webSocket.sockets.emit('task_done', { task_id, },);
    Object.assign(ctx, { body: 'Success', },);
},);

router.get('/deleteSchtask', async (ctx, ) => {
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

router.get('/delete', async (ctx, ) => {
    const { id, } = ctx.request.query;
    await deleteMessage(id,);
    await request(`http://localhost:${process.env.PORT}/api/task/deleteSchtask?task_id=${id}`,);
    Object.assign(ctx, { body: 'Success', },);
},);

export default router;
