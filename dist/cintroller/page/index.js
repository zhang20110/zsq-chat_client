"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
async function page(ctx, next) {
    // 请求网站
    if (/favicon\.png$/.test(ctx.path)) {
        // const fav = fs.readFileSync('/favicon.png');
        const fav = fs_1.default.readFileSync(path_1.default.join(process.cwd() + '/favicon.png'));
        ctx.body = fav;
        ctx.status = 200;
        return;
    }
    // api 请求不是静态资源
    if ((/^[\/\\]api/).test(ctx.path)) {
        await next();
        return;
    }
    const url = getStaticPath(ctx.path);
    console.log('static url: ', url);
    try {
        const data = fs_1.default.readFileSync(url);
        const suffix = url.match(/(?<=\.)[\w]+$/)[0];
        console.log('static suffix: ', suffix);
        ctx.type = 'text/' + suffix;
        ctx.body = data;
    }
    catch (err) {
        ctx.redirect('/');
    }
    await next();
}
exports.default = page;
function getStaticPath(pathname) {
    const myPath = pathname === '/' ? '/index.html' : pathname;
    const root = path_1.default.normalize(process.cwd() + '/..');
    const url = path_1.default.normalize(root + '/my-graduation-client/build/' + myPath);
    return url;
}
//# sourceMappingURL=index.js.map