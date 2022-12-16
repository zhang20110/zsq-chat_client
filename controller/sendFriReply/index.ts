import ChatList, { ChatListType } from '../../models/chatList'
import { isLine,sendMes } from '../websocket';
export default async function sendFriReply(data: ChatListType) {
    // 保存消息 到数据库
    await ChatList.updateOne({from: data.to, to: data.from}, {
        agreeTime: +(new Date()),
        status: data.status,
        // mesType: 'sendFriReply',
    });
    sendMes(data.from, {
        mesType: 'sendFriReply',
        status: data.status,
        to: data.to
    });
    // 如果好友在线 则推送消息
    if (isLine(data.to)) {
        sendMes(data.to, {
            mesType: 'sendFriReply',
            status: data.status,
            to: data.from
        });
    }
    console.log('sendFriReply: ', data);
}
