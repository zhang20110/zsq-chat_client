import Koa from 'koa';
import User from '../../models/User';
import ChatList from '../../models/chatList';
export default async function getRequest(ctx: Koa.Context, next: Koa.Next) {
    const { id } = ctx.state.user;
    const reqData = await ChatList.find({
        from: id
    }, {_id: 0, status: 1, to: 1}, {lean: true}) || [];
    const res = await Promise.all(reqData.reduce((pre, cur) => {
        pre.push(
            User.findById(cur.to, {_id: 0, name: 1, headPorUrl: 1}, {lean: true})
            .then(res => ({...res, status: cur.status, from: cur.to}))
        )
        return pre;
    }, []));
    console.log('getRequest: ', res, reqData);
    ctx.status = 200;
    ctx.body = res;
    await next();
}