"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uploadImg_1 = __importDefault(require("../uploadImg"));
async function sendImgMessage(ctx, next) {
    const file = ctx.request.files.imgMsg;
    if (!file) {
        ctx.status = 400;
        ctx.body = {
            data: "没有文件"
        };
        return;
    }
    console.log('sendImgMessage: ', file);
    const name = await (0, uploadImg_1.default)(file);
    ctx.status = 200;
    ctx.body = {
        name
    };
}
exports.default = sendImgMessage;
//# sourceMappingURL=index.js.map