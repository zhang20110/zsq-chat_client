"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../../models/User"));
const uploadImg_1 = __importDefault(require("../uploadImg"));
async function updateHeadPorUrl(ctx, next) {
    const { id } = ctx.state.user;
    const file = ctx.request.files.image;
    if (!file) {
        const data = await User_1.default.findById(id, { headPorUrl: 1, _id: 0 }, { lean: true });
        ctx.body = data;
        ctx.status = 200;
        return;
    }
    ;
    console.log('updateHeadPorUrl: ', file);
    try {
        const name = await (0, uploadImg_1.default)(file, 90);
        ctx.status = 200;
        // 更新数据库
        await User_1.default.updateOne({ _id: id }, {
            headPorUrl: name
        });
        ctx.body = {
            headPorUrl: name
        };
        ctx.status = 200;
    }
    catch (err) {
        ctx.status = 500;
        ctx.body = {
            err: '图片上传失败'
        };
    }
}
exports.default = updateHeadPorUrl;
//# sourceMappingURL=index.js.map