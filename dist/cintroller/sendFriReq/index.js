"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chatList_1 = __importDefault(require("../../models/chatList"));
const websocket_1 = require("../websocket");
async function sendFriReq(data) {
    // 已经发送过请求或请求被拒绝 则忽略请求
    const pro1 = await chatList_1.default.findOne({ from: data.from, to: data.to, status: { $in: ['agree', 'wait'] } });
    if (pro1) {
        return;
    }
    ;
    // 删除已经拒绝的数据
    const pro2 = await chatList_1.default.deleteOne({ from: data.from, to: data.to, status: 'reject' });
    // 保存消息 到数据库
    await chatList_1.default.create(Object.assign(Object.assign({}, data), { waitTime: +(new Date()), agreeTime: 0, status: 'wait' }));
    // 返回结果：
    (0, websocket_1.sendMes)(data.from, {
        mesType: 'sendFriReq',
    });
    // sendMes(data.from, {
    //     mesType: 'sendFriReq',
    // });
    // 如果好友在线 则推送消息
    if ((0, websocket_1.isLine)(data.to)) {
        (0, websocket_1.sendMes)(data.to, {
            mesType: 'sendFriReq',
        });
    }
    console.log('sendFriReq: ', data);
}
exports.default = sendFriReq;
//# sourceMappingURL=index.js.map