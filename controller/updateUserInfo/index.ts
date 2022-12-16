import Koa from 'koa';
import User from '../../models/User';
export default async function updateUserInfo(ctx: Koa.Context, next: Koa.Next) {
    const {id} = ctx.state.user;
    const query = ctx.request.body;
    // 用户名必须唯一
    if ('name' in query) {
        const nameInfo = await User.findById(id);
        if (nameInfo) {
            ctx.body = {
                msg: '已经存在此用户名'
            };
            ctx.status = 400;
            return;
        }
    }
    const res = await User.findByIdAndUpdate(id, {
        ...query
    }, {
        returnDocument: 'after', // 获取更新后的数据
        lean: true,
    }).then(res => ({...res, password: undefined}));
    ctx.body = res;
    ctx.status = 200;
    console.log('updateUserINfo: ', res);
}