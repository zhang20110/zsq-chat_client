"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
async function Img(ctx, next) {
    const { id } = ctx.params;
    let data;
    console.log('imgs: ', path_1.default.normalize(process.cwd() + '/static/imgs/' + id));
    try {
        data = fs_1.default.readFileSync(path_1.default.normalize(process.cwd() + '/static/imgs/' + id));
    }
    catch (err) {
        ctx.status = 400;
        ctx.body = {
            msg: '图片不存在'
        };
        console.log('img err: ', err);
        return;
    }
    ctx.body = data;
    await next();
}
exports.default = Img;
//# sourceMappingURL=index.js.map