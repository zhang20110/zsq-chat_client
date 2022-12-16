"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../../models/User"));
const chatList_1 = __importDefault(require("../../models/chatList"));
async function getUsers(ctx, next) {
    const { name } = ctx.request.body;
    const { id } = ctx.state.user;
    // 通过用户名查询用户
    const user = await User_1.default.findOne({
        name,
    }, 'name headPorUrl', { lean: true });
    // 没有此用户名
    if (!user) {
        ctx.status = 200;
        ctx.body = {
            data: {},
            msg: "没有此用户"
        };
        return;
    }
    // 查询是否向name发起过请求
    const statusFrom = await chatList_1.default.findOne({
        from: id,
        to: user._id
    }, { _id: 0, status: 1 }, { lean: true });
    // 查询name是否向我发起过请求
    const statusTo = await chatList_1.default.findOne({
        from: user._id,
        to: id
    }, { _id: 0, status: 1 }, { lean: true });
    ctx.status = 200;
    ctx.body = {
        data: {
            from: statusFrom && statusFrom.status,
            to: statusTo && statusTo.status,
            isSelf: String(user._id) === id,
            user
        }
    };
    await next();
}
exports.default = getUsers;
//# sourceMappingURL=index.js.map