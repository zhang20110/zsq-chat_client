import Koa from 'koa';
import Message from '../../models/Message';
import User from '../../models/User';
import sendMessageStatus from '../sendMessageStatus';
export default async function getMessage(ctx: Koa.Context, next: Koa.Next) {
    const { to, limit=15, skip=0 } = ctx.request.body;
    const {id: from} = ctx.state.user;
    // 发送 和 接受 的消息
    // 注意： {sort: {time: -1}} 表示从后插入的文档开始开始查找
    const res = await Message.find({
        from: {$in: [from, to]},
        to: {$in: [from, to]},
    },null, {limit, lean: true, skip, sort: {_id: -1}});
    ctx.body = {data: res.sort((a, b) => a.time - b.time)};
    ctx.status = 200;
    // 将所有的未读消息更新为已读
    await sendMessageStatus({ids: res.filter(v => v.to === from).map(v => String(v._id))});
}