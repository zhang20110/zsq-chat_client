import Koa from 'koa';
import User from '../../models/User';
import jwt from 'jsonwebtoken';
import paramsUser from '../utils/paramsUser'
export default async function register(ctx: Koa.Context, next: Koa.Next) {
    const { body } = ctx.request;
    // name 和 password 是否合法
    if (!paramsUser(body)) {
        ctx.status = 400;
        ctx.body = {
            code: 421,
            msg: "用户名或密码为空",
            // headPorUrl: "default.jpg", // 默认头像
        }
        return;
    }
    console.log('register: ', body);
    // 用户名称是否重复
    const {name} = body;
    const one = await User.findOne({name});
    console.log('register one: ', one);
    if (one) {
        ctx.status = 422;
        ctx.body = {
            code: 422,
            msg: '用户名已存在'
        }
        return;
    }
    // 注册用户数据
    const data = await User.create(body);
    console.log('register data: ', data);
    // 生成jwt
    const token = jwt.sign({id: data._id}, 'graduation-token-jwt');
    const maxAge = 60 * 60 * 1000 * 24 * 7; // 7天
    ctx.cookies.set('token', token, {
        maxAge
    });
    ctx.status = 200;
    await next();
}