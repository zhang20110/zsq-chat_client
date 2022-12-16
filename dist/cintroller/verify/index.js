"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
async function verify(ctx, next) {
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
exports.default = verify;
function verifyToken(token) {
    if (!token) {
        return {};
    }
    let data = {};
    try {
        data = jsonwebtoken_1.default.verify(token, 'graduation-token-jwt');
    }
    catch (err) {
        console.log('verify token过期或错误：', err);
        data = {};
    }
    return data;
}
exports.verifyToken = verifyToken;
//# sourceMappingURL=index.js.map