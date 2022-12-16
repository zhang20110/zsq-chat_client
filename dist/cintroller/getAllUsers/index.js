"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../../models/User"));
const Message_1 = __importDefault(require("../../models/Message"));
const chatList_1 = require("../chatList");
async function getAllUsers(ctx, next) {
    const { ids: allIds } = ctx.request.body;
    const { id: to } = ctx.state.user;
    // 获取 to 的好友
    const friendId = await (0, chatList_1.getFriend)(to);
    // 排除非好友
    const ids = allIds.filter(v => friendId.indexOf(v) !== -1);
    console.log("ids: ", ids, friendId);
    // 保证ids的顺序
    const dataUsers = await Promise.all(ids.reduce((pre, cur) => {
        pre.push(User_1.default.findById(cur, 'name headPorUrl', { lean: true }));
        return pre;
    }, []));
    // 查询 最新一条数据
    const dataMessages = await Promise.all(ids.reduce((pre, cur) => {
        // 不会出现自己给自己发送消息的情况
        pre.push(Message_1.default.findOne({
            from: { $in: [cur, to] },
            to: { $in: [cur, to] },
        }, 'from to type msg time', { lean: true, sort: { _id: -1 } }));
        return pre;
    }, []));
    console.log('dataMessages: ', dataMessages);
    // 查询所有的未读消息的数目
    const dataCounts = await Promise.all(ids.reduce((pre, cur) => {
        pre.push(Message_1.default.find({
            from: cur,
            to,
            status: 'unread'
        }, 'from', { lean: true }).count().then(count => ({ count, from: cur })));
        return pre;
    }, []));
    const countObj = dataCounts.reduce((pre, cur) => {
        pre[cur.from] = cur.count;
        return pre;
    }, {});
    console.log('dataCounts: ', countObj);
    const MessagesObj = dataMessages.reduce((pre, cur) => {
        // 可能 from 到 to 消息记录没有 无法查询的消息
        if (!cur)
            return pre;
        // 最新的消息可能来自 from 也可能来自 to
        pre[cur.from] = cur;
        pre[cur.to] = cur;
        return pre;
    }, {});
    const data = dataUsers.reduce((pre, cur) => {
        const id = String(cur._id);
        pre[id] = Object.assign(Object.assign(Object.assign({}, cur), MessagesObj[id]), { count: countObj[id], from: id, _id: undefined });
        return pre;
    }, {});
    console.log('getAllUsers: ', data, ids, allIds, friendId, to);
    ctx.body = {
        data: Object.values(data)
    };
}
exports.default = getAllUsers;
//# sourceMappingURL=index.js.map