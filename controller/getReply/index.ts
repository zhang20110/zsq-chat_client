import Koa from 'koa';
import User from '../../models/User';
import ChatList from '../../models/chatList';
export default async function getReply(ctx: Koa.Context, next: Koa.Next) {
    const { id } = ctx.state.user;
    const reqData = await ChatList.find({
        to: id
    }, {_id: 0, status: 1, from: 1}, {lean: true}) || [];
    const res = await Promise.all(reqData.reduce((pre, cur) => {
        pre.push(
            User.findById(cur.from, {_id: 0, name: 1, headPorUrl: 1}, {lean: true})
            .then(res => ({...res, status: cur.status, from: cur.from}))
        )
        return pre;
    }, []));
    console.log('getReply: ', res, reqData);
    ctx.status = 200;
    ctx.body = res;
    await next();
}