"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Message_1 = __importDefault(require("../../models/Message"));
const sendMessageStatus_1 = __importDefault(require("../sendMessageStatus"));
async function getMessage(ctx, next) {
    const { to, limit = 15, skip = 0 } = ctx.request.body;
    const { id: from } = ctx.state.user;
    // 发送 和 接受 的消息
    // 注意： {sort: {time: -1}} 表示从后插入的文档开始开始查找
    const res = await Message_1.default.find({
        from: { $in: [from, to] },
        to: { $in: [from, to] },
    }, null, { limit, lean: true, skip, sort: { _id: -1 } });
    ctx.body = { data: res.sort((a, b) => a.time - b.time) };
    ctx.status = 200;
    // 将所有的未读消息更新为已读
    await (0, sendMessageStatus_1.default)({ ids: res.filter(v => v.to === from).map(v => String(v._id)) });
}
exports.default = getMessage;
//# sourceMappingURL=index.js.map