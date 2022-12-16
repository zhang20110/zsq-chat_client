"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verify_1 = require("../verify");
async function login(ctx, next) {
    // 如果cookie没有过期 则自动登陆
    const tokenObj = (0, verify_1.verifyToken)(ctx.cookies.get('token'));
    console.log('login tokenObj: ', tokenObj, ctx.cookies.get('token'));
    if (Object.keys(tokenObj).length) {
        ctx.status = 200;
        // await next();
        return;
    }
    // cookie过期 或 没有cookie则密码登陆
    const { name = "", password = "" } = ctx.request.body;
    const data = await User_1.default.findOne({ name });
    console.log('login data: ', data);
    if (!data || data.password !== password) {
        ctx.status = 401;
        ctx.body = {
            code: 401,
            msg: '密码或用户名错误'
        };
        return;
    }
    // 生成jwt
    const token = jsonwebtoken_1.default.sign({ id: data._id }, 'graduation-token-jwt');
    const maxAge = 60 * 60 * 1000 * 48; // 48小时
    // const maxAge = 4000; // 4s
    ctx.cookies.set('token', token, {
        maxAge
    });
    ctx.status = 200;
    // await next();
}
exports.default = login;
//# sourceMappingURL=index.js.map