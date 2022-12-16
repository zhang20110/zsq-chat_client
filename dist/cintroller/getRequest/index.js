"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../../models/User"));
const chatList_1 = __importDefault(require("../../models/chatList"));
async function getRequest(ctx, next) {
    const { id } = ctx.state.user;
    const reqData = await chatList_1.default.find({
        from: id
    }, { _id: 0, status: 1, to: 1 }, { lean: true }) || [];
    const res = await Promise.all(reqData.reduce((pre, cur) => {
        pre.push(User_1.default.findById(cur.to, { _id: 0, name: 1, headPorUrl: 1 }, { lean: true })
            .then(res => (Object.assign(Object.assign({}, res), { status: cur.status, from: cur.to }))));
        return pre;
    }, []));
    console.log('getRequest: ', res, reqData);
    ctx.status = 200;
    ctx.body = res;
    await next();
}
exports.default = getRequest;
//# sourceMappingURL=index.js.map