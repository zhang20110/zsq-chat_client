"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../../models/User"));
async function updateUserInfo(ctx, next) {
    const { id } = ctx.state.user;
    const query = ctx.request.body;
    // 用户名必须唯一
    if ('name' in query) {
        const nameInfo = await User_1.default.findById(id);
        if (nameInfo) {
            ctx.body = {
                msg: '已经存在此用户名'
            };
            ctx.status = 400;
            return;
        }
    }
    const res = await User_1.default.findByIdAndUpdate(id, Object.assign({}, query), {
        returnDocument: 'after',
        lean: true,
    }).then(res => (Object.assign(Object.assign({}, res), { password: undefined })));
    ctx.body = res;
    ctx.status = 200;
    console.log('updateUserINfo: ', res);
}
exports.default = updateUserInfo;
//# sourceMappingURL=index.js.map