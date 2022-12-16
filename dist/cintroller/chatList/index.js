"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFriend = void 0;
const chatList_1 = __importDefault(require("../../models/chatList"));
const User_1 = __importDefault(require("../../models/User"));
async function chatList(ctx, next) {
    const { id } = ctx.state.user;
    const DataId = await getFriend(id);
    // 获取 好友的用户名和头像信息
    const res = await Promise.all(DataId.reduce((pre, cur) => {
        pre.push(User_1.default.findById(cur, "name headPorUrl"));
        return pre;
    }, []));
    ctx.body = res;
    await next();
    console.log('chatlist res: ', res);
}
exports.default = chatList;
async function getFriend(id) {
    // 获取 和 id 是好友的user
    const pro1 = chatList_1.default.find({
        from: id,
        status: 'agree'
    }, { 'to': 1, _id: 0 }, { lean: true });
    const pro2 = chatList_1.default.find({
        to: id,
        status: 'agree'
    }, { 'from': 1, _id: 0 }, { lean: true });
    const data = await Promise.all([pro1, pro2]);
    const DataId = data.reduce((pre, cur) => {
        const res = cur.reduce((pre, cur) => {
            pre.push(...Object.values(cur));
            return pre;
        }, []);
        pre.push(...res);
        return pre;
    }, []);
    return DataId;
}
exports.getFriend = getFriend;
//# sourceMappingURL=index.js.map