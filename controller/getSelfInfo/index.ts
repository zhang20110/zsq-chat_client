import Koa from 'koa';
import User from '../../models/User';
export default async function getSelfInfo(ctx: Koa.Context, next: Koa.Next) {
    const { id } = ctx.state.user;
    const data = await User.findById(id, 
        {_id: 0, name: 1, headPorUrl: 1, signatrue: 1, location: 1}, {lean: true})
    ctx.status = 200;
    ctx.body = data;
    console.log('getSelfInfo: ', data);
    await next();
}