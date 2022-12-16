import Message from '../../models/Message'
import { isLine,sendMes } from '../websocket';
/**
 * 更新消息是否已读  
 * 暂时只实现接受消息方是否已读
 * 发送消息方是否知道对方已读暂不实现
 */
export default async function sendMessageStatus(data: {ids: string[]}) {
    const mesType = 'sendMessageStatus'
    const {ids} = data;
    // // 更新消息为已读
    console.log('sendMessageStatus ids: ', ids);
    const updateData = await Message.find({
        _id: {$in: ids},
        status: 'unread'
    },{from: 1, to: 1}, {lean: true});
    if (!updateData.length) {
        return;
    }
    const updateIds = updateData.map(v => v._id);
    const {from, to} = updateData[0];
    await Message.updateMany({
        _id: {$in: updateIds},
        status: 'unread'
    },{
        status: 'read'
    }, {lean: true});
    // 通知发送消息人
    if (isLine(from)) {
        sendMes(from, {
            mesType,
            updateIds
        })
    }
    // 通知消息接受者
    // if (isLine(to)) {
    //     sendMes(to, {
    //         mesType,
    //         updateIds
    //     })
    // }
}