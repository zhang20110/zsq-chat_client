"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const paramsUser_1 = __importDefault(require("../utils/paramsUser"));
async function register(ctx, next) {
    const { body } = ctx.request;
    // name 和 password 是否合法
    if (!(0, paramsUser_1.default)(body)) {
        ctx.status = 400;
        ctx.body = {
            code: 421,
            msg: "用户名或密码为空",
            // headPorUrl: "default.jpg", // 默认头像
        };
        return;
    }
    console.log('register: ', body);
    // 用户名称是否重复
    const { name } = body;
    const one = await User_1.default.findOne({ name });
    console.log('register one: ', one);
    if (one) {
        ctx.status = 422;
        ctx.body = {
            code: 422,
            msg: '用户名已存在'
        };
        return;
    }
    // 注册用户数据
    const data = await User_1.default.create(body);
    console.log('register data: ', data);
    // 生成jwt
    const token = jsonwebtoken_1.default.sign({ id: data._id }, 'graduation-token-jwt');
    const maxAge = 60 * 60 * 1000 * 24 * 7; // 7天
    ctx.cookies.set('token', token, {
        maxAge
    });
    ctx.status = 200;
    await next();
}
exports.default = register;
//# sourceMappingURL=index.js.map