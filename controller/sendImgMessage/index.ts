import Koa from 'koa';
import uploadImg from '../uploadImg'
export default async function sendImgMessage(ctx: Koa.Context, next: Koa.Next) {
    const file = ctx.request.files.imgMsg as any;
    if (!file) {
        ctx.status = 400;
        ctx.body = {
            data: "没有文件"
        }
        return;
    }
    console.log('sendImgMessage: ', file);
    const name = await uploadImg(file);
    ctx.status = 200
    ctx.body = {
        name
    }
}