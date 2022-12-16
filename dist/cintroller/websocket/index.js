"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emitBind = exports.sendMes = exports.isLine = void 0;
const verify_1 = require("../verify");
const ws_1 = __importDefault(require("ws"));
const map = new Map(); // 记录登陆状态的用户
const mapFun = new Map();
function isLine(id) {
    return map.has(id);
}
exports.isLine = isLine;
function sendMes(id, data) {
    const wsTo = map.get(id);
    if (typeof data !== 'object') {
        throw new Error("websocket 请发送对象数据");
    }
    wsTo.send(JSON.stringify(data));
}
exports.sendMes = sendMes;
function emitBind(type, f) {
    mapFun.set(type, f);
}
exports.emitBind = emitBind;
function connecWC(server) {
    // 建立websocket连接
    // clientTracking 必须为false才能获取到cookie
    const wss = new ws_1.default.Server({ noServer: true, clientTracking: false });
    wss.on('connection', (ws, request, client) => {
        console.log('websocket on: ', client);
        map.set(client.id, ws);
        ws.on('message', function (str) {
            // 保存消息
            const data = Object.assign(Object.assign({}, JSON.parse(str)), { from: client.id });
            // 触发相应类型信息的处理函数
            /**
            * mesType: 'sendMessage' | 'sendFriReq' | 'sendFriReply';
            * sendMessage  消息
            * sendFriReq  好友请求
            * sendFriReply  好友请求回应
            * sendMessageStatus  更新消息状态
            */
            console.log('message mesType: ', data.mesType);
            if (mapFun.has(data.mesType)) {
                mapFun.get(data.mesType).call(null, Object.assign({}, data));
            }
        });
        ws.on('error', function (err) {
            console.log('websocket err: ', err);
        });
        ws.on('close', function (...args) {
            map.delete(client.id);
            console.log('websocket close: ', args, map.size);
        });
    });
    // webwocket用户验证
    // 验证websocket的握手阶段(是http请求)的cookie
    server.on('upgrade', (request, socket, head) => {
        const { cookie = "" } = request.headers;
        const cookies = {};
        cookie.split('; ').forEach((item) => {
            const [k, v] = item.split('=');
            cookies[k] = v;
        });
        const data = (0, verify_1.verifyToken)(cookies.token);
        if (!Object.keys(data).length) {
            console.log('webwocket err: ', cookies);
            socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
            socket.destroy();
            return;
        }
        console.log('webwocket upgrade: ', data);
        wss.handleUpgrade(request, socket, head, ws => {
            wss.emit('connection', ws, request, data);
        });
    });
}
exports.default = connecWC;
//# sourceMappingURL=index.js.map