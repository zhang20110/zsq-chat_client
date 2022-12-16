import { verifyToken } from '../verify';
import ws from 'ws';
import { Server } from 'http';
const map = new Map<string, ws.WebSocket>(); // 记录登陆状态的用户
const mapFun = new Map<string, Function>();
export function isLine(id: string) {
    return map.has(id);
}
export function sendMes<T>(id: string, data: T) {
    const wsTo = map.get(id);
    if (typeof data !== 'object') {
        throw new Error("websocket 请发送对象数据")
    }
    wsTo.send(JSON.stringify(data));
}
export function emitBind(type: string, f: Function) {
    mapFun.set(type, f);
}
export default function connecWC(server: Server) {
    // 建立websocket连接
    // clientTracking 必须为false才能获取到cookie
    const wss = new ws.Server({ noServer: true, clientTracking: false });
    wss.on('connection', (ws: ws.WebSocket, request: any, client: { id: string; }) => {
        console.log('websocket on: ', client);
        map.set(client.id, ws);
        ws.on('message', function (str: string) {
            // 保存消息
            const data = {
                ...JSON.parse(str),
                from: client.id, // 写在后面 防止发消息人被伪造
            };
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
                mapFun.get(data.mesType).call(null, {...data});
            }
        })
        ws.on('error', function (err) {
            console.log('websocket err: ', err);
        })
        ws.on('close', function (...args) {
            map.delete(client.id);
            console.log('websocket close: ', args, map.size);
        })
    })
    // webwocket用户验证
    // 验证websocket的握手阶段(是http请求)的cookie
    server.on('upgrade', (request, socket, head) => {
        const { cookie = "" } = request.headers;
        const cookies = {} as { [k: string]: string };
        cookie.split('; ').forEach((item: any) => {
            const [k, v] = item.split('=');
            cookies[k] = v;
        })
        const data = verifyToken(cookies.token) as { id: string };
        if (!Object.keys(data).length) {
            console.log('webwocket err: ', cookies);
            socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
            socket.destroy();
            return;
        }
        console.log('webwocket upgrade: ', data);
        wss.handleUpgrade(request, socket, head, ws => {
            wss.emit('connection', ws, request, data);
        })
    })
}