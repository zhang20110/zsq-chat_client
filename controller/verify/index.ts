import jwt, { JwtPayload } from 'jsonwebtoken';
import Koa from 'koa';
export default async function verify(ctx: Koa.Context, next: Koa.Next) {
    // 排除登陆和注册页面
    const { path } = ctx;
    console.log('verify path: ', path);
    // 登陆、注册、静态资源不需要验证
    if (path === '/api/login' || path === '/api/register' || !(/^[\/\\]api/).test(path)) {
        await next();
        return;
    }
    // 检查token
    const token = ctx.cookies.get('token'); // 没有返回undefined
    console.log('verify token: ', token);
    const data = verifyToken(token);
    if (!Object.keys(data).length) {
        ctx.status = 401;
        ctx.body = {
            msg: '无权访问'
        };
        return;
    }
    // 挂载用户信息到ctx
    ctx.state.user = data;
    await next();
}
export function verifyToken(token: string) {
    if (!token) {
        return {};
    }
    let data = {};
    try {
        data = jwt.verify(token, 'graduation-token-jwt') as JwtPayload;
    } catch (err) {
        console.log('verify token过期或错误：', err);
        data = {};
    }
    return data;
}