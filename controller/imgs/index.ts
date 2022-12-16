import Koa from 'koa'
import fs from 'fs';
import path from 'path';
export default async function Img(ctx: Koa.Context, next: Koa.Next) {
    const { id } = ctx.params;
    let data:Buffer;
    console.log('imgs: ', path.normalize(process.cwd() + '/static/imgs/' + id));
    try{
        data = fs.readFileSync(path.normalize(process.cwd() + '/static/imgs/' + id));
    }catch(err) {
        ctx.status = 400;
        ctx.body = {
            msg: '图片不存在'
        }
        console.log('img err: ', err)
        return;
    } 
    ctx.body = data;
    await next();
}