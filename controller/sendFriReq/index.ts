import ChatList, { ChatListType } from '../../models/chatList'
import { isLine,sendMes } from '../websocket';
export default async function sendFriReq(data: ChatListType) {
    // 已经发送过请求或请求被同意 则忽略请求
    const pro1 = await ChatList.findOne({from: data.from, to: data.to, status: 
        {$in: ['agree', 'wait']}});
    if (pro1) {
        return;
    };
    // 删除已经拒绝的数据
    await ChatList.deleteOne({from: data.from, to: data.to, status: 'reject'});
    // 保存消息 到数据库
    await ChatList.create({
        ...data,
        waitTime: +(new Date()),
        agreeTime: 0,
        status: 'wait'
    });
    // 返回结果：
    sendMes(data.from, {
        mesType: 'sendFriReq',
    })
    // 如果好友在线 则推送消息
    if (isLine(data.to)) {
        sendMes(data.to, {
            mesType: 'sendFriReq',
        });
    }
    console.log('sendFriReq: ', data);
}
