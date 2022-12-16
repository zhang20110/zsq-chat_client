import Message, { MessageType } from '../../models/Message'
import { isLine, sendMes } from '../websocket';
export default async function sendMessage(data: MessageType) {
    // 保存消息 到数据库
    const resDB = (await Message.create({
        ...data,
        time: +(new Date()), // 时间以服务器时间为准
        status: 'unread'
    })).toJSON();
    const res = {
        ...resDB,
        mesType: 'sendMessage',
    }
    // 返回消息
    sendMes(data.from, res)
    // 如果好友在线 则推送消息
    if (isLine(data.to)) {
        sendMes(data.to, res);
    }
    console.log('sendMessage: ', res);
}