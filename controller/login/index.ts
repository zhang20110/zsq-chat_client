import Koa from 'koa';
import User from '../../models/User'
import jwt from 'jsonwebtoken';
import { verifyToken } from '../verify';
export default async function login(ctx: Koa.Context, next: Koa.Next) {
    // 如果cookie没有过期 则自动登陆
    const tokenObj = verifyToken(ctx.cookies.get('token'));
    console.log('login tokenObj: ', tokenObj, ctx.cookies.get('token'));
    if (Object.keys(tokenObj).length) {
        ctx.status = 200;
        // await next();
        return;
    }
    // cookie过期 或 没有cookie则密码登陆
    const { name = "", password = "" } = ctx.request.body;
    const data = await User.findOne({ name });
    console.log('login data: ', data);
    if (!data || data.password !== password) {
        ctx.status = 401;
        ctx.body = {
            code: 401, // 不符合规范
            msg: '密码或用户名错误'
        }
        return;
    }
    // 生成jwt
    const token = jwt.sign({ id: data._id }, 'graduation-token-jwt');
    const maxAge = 60 * 60 * 1000 * 48; // 48小时
    // const maxAge = 4000; // 4s
    ctx.cookies.set('token', token, {
        maxAge
    });
    ctx.status = 200;
    // await next();
}