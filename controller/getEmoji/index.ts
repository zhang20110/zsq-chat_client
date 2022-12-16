import Koa from 'koa';
import Emoji from '../../models/Emoji';
export default async function getEmoji(ctx: Koa.Context, next: Koa.Next) {
    const data = await Emoji.find(null, null, {lean: true});
    const res = data.reduce((pre, cur) => {
        const item = pre.find(v => v.type === cur.type);
        if (item) {
            item.unicode.push(cur.unicode);
        } else {
            pre.push({type: cur.type, unicode: [cur.unicode]});
        }
        return pre;
    }, []);
    console.log('getEmoji: ', res);
    ctx.body = res;
    ctx.status = 200;
}