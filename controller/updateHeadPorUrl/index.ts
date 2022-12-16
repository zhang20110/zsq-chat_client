import Koa from 'koa';
import User from '../../models/User';
import uploadImg from '../uploadImg'
export default async function updateHeadPorUrl(ctx: Koa.Context, next: Koa.Next) {
    const { id } = ctx.state.user;
    const file = ctx.request.files.image as any;
    if (!file) {
        const data = await User.findById(id, {headPorUrl: 1, _id: 0}, {lean: true});
        ctx.body = data
        ctx.status = 200;
        return;
    };
    console.log('updateHeadPorUrl: ', file);
    try {
        const name = await uploadImg(file, 90);
        ctx.status = 200;
        // 更新数据库
        await User.updateOne({ _id: id }, {
            headPorUrl: name
        })
        ctx.body = {
            headPorUrl: name
        };
        ctx.status = 200;
    } catch (err) {
        ctx.status = 500;
        ctx.body = {
            err: '图片上传失败'
        };
    }
}