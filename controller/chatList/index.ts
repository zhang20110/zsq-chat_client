import Koa from 'koa';
import ChatList from '../../models/chatList'
import User from '../../models/User'
export default async function chatList(ctx: Koa.Context, next: Koa.Next) {
    const { id } = ctx.state.user;
    const DataId = await getFriend(id);
    // 获取 好友的用户名和头像信息
    const res = await Promise.all(DataId.reduce((pre, cur) => {
        pre.push(User.findById(cur, "name headPorUrl"))
        return pre;
    }, []));
    ctx.body = res;
    await next();
    console.log('chatlist res: ', res);
}
export async function getFriend (id: string){
    // 获取 和 id 是好友的user
    const pro1 = ChatList.find({
        from: id,
        status: 'agree'
    }, {'to': 1, _id: 0}, {lean: true});
    const pro2 = ChatList.find({
        to: id,
        status: 'agree'
    }, {'from': 1, _id: 0}, {lean: true});
    const data = await Promise.all([pro1, pro2]);
    const DataId = data.reduce((pre, cur) => {
        const res = cur.reduce((pre, cur) => {
            pre.push(...Object.values(cur));
            return pre;
        }, []);
        pre.push(...res);
        return pre;
    }, []);
    return (DataId as any as string[]);
}