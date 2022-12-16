"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Emoji_1 = __importDefault(require("../../models/Emoji"));
async function getEmoji(ctx, next) {
    const data = await Emoji_1.default.find(null, null, { lean: true });
    const res = data.reduce((pre, cur) => {
        const item = pre.find(v => v.type === cur.type);
        if (item) {
            item.unicode.push(cur.unicode);
        }
        else {
            pre.push({ type: cur.type, unicode: [cur.unicode] });
        }
        return pre;
    }, []);
    console.log('getEmoji: ', res);
    ctx.body = res;
    ctx.status = 200;
}
exports.default = getEmoji;
//# sourceMappingURL=index.js.map