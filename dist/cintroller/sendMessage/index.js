"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Message_1 = __importDefault(require("../../models/Message"));
const websocket_1 = require("../websocket");
async function sendMessage(data) {
    // 保存消息 到数据库
    const resDB = (await Message_1.default.create(Object.assign(Object.assign({}, data), { time: +(new Date()), status: 'unread' }))).toJSON();
    const res = Object.assign(Object.assign({}, resDB), { mesType: 'sendMessage' });
    // 返回消息
    (0, websocket_1.sendMes)(data.from, res);
    // 如果好友在线 则推送消息
    if ((0, websocket_1.isLine)(data.to)) {
        (0, websocket_1.sendMes)(data.to, res);
    }
    console.log('sendMessage: ', res);
}
exports.default = sendMessage;
//# sourceMappingURL=index.js.map