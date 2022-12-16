import Koa from 'koa';
import User from '../../models/User';
import ChatList from '../../models/chatList';
export default async function getUsers(ctx: Koa.Context, next: Koa.Next) {
    const { name } = ctx.request.body;
    const {id} = ctx.state.user;
    // 通过用户名查询用户
    const user = await User.findOne({
        name,
    }, 'name headPorUrl', {lean: true});
    // 没有此用户名
    if (!user) {
        ctx.status = 200;
        ctx.body = {
            data: {},
            msg: "没有此用户"
        }
        return;
    }
    // 查询是否向name发起过请求
    const statusFrom = await ChatList.findOne({
        from: id,
        to: user._id
    }, {_id: 0, status: 1}, {lean: true});
    // 查询name是否向我发起过请求
    const statusTo = await ChatList.findOne({
        from: user._id,
        to: id
    }, {_id: 0, status: 1}, {lean: true});
    ctx.status = 200;
    ctx.body = {
        data: {
            from: statusFrom && statusFrom.status,
            to: statusTo && statusTo.status,
            isSelf: String(user._id) === id, // 是否是自己
            user
        }
    }
    await next();
}