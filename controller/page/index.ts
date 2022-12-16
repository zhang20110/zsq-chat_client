import Koa from 'koa'
import fs from 'fs';
import path from 'path';
export default async function page(ctx: Koa.Context, next: Koa.Next) {
    // 请求网站
    if (/favicon\.png$/.test(ctx.path)) {
        // const fav = fs.readFileSync('/favicon.png');
        const fav = fs.readFileSync(path.join(process.cwd()+'/favicon.png'));
        ctx.body = fav;
        ctx.status = 200;
        return;
    }
    // api 请求不是静态资源
    if ((/^[\/\\]api/).test(ctx.path)) {
        await next();
        return;
    }
    const url = getStaticPath(ctx.path);
    console.log('static url: ', url);
    try {
        const data = fs.readFileSync(url);
        const suffix = url.match(/(?<=\.)[\w]+$/)[0];
        console.log('static suffix: ', suffix);
        ctx.type = 'text/' + suffix;
        ctx.body = data;
    } catch (err) {
        ctx.redirect('/')
    }
    await next();
}
function getStaticPath(pathname: string):string {
    const myPath = pathname === '/' ? '/index.html' : pathname;
    const root = path.normalize(process.cwd() + '/..');
    const url = path.normalize(root + '/my-graduation-client/build/' + myPath); 
    return url;
}