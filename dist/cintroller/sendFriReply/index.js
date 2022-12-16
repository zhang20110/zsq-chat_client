"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chatList_1 = __importDefault(require("../../models/chatList"));
const websocket_1 = require("../websocket");
async function sendFriReply(data) {
    // 保存消息 到数据库
    await chatList_1.default.updateOne({ from: data.to, to: data.from }, {
        agreeTime: +(new Date()),
        status: data.status,
        // mesType: 'sendFriReply',
    });
    (0, websocket_1.sendMes)(data.from, {
        mesType: 'sendFriReply',
        status: data.status,
        to: data.to
    });
    // 如果好友在线 则推送消息
    if ((0, websocket_1.isLine)(data.to)) {
        (0, websocket_1.sendMes)(data.to, {
            mesType: 'sendFriReply',
            status: data.status,
            to: data.from
        });
    }
    console.log('sendFriReply: ', data);
}
exports.default = sendFriReply;
//# sourceMappingURL=index.js.map