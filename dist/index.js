"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const index_1 = __importDefault(require("./routes/index"));
const koa_body_1 = __importDefault(require("koa-body"));
const db_1 = __importDefault(require("./db"));
const verify_1 = __importDefault(require("./cintroller/verify"));
const websocket_1 = __importStar(require("./cintroller/websocket"));
const page_1 = __importDefault(require("./cintroller/page"));
const sendMessage_1 = __importDefault(require("./cintroller/sendMessage"));
const sendFriReq_1 = __importDefault(require("./cintroller/sendFriReq"));
const sendFriReply_1 = __importDefault(require("./cintroller/sendFriReply"));
const sendMessageStatus_1 = __importDefault(require("./cintroller/sendMessageStatus"));
const app = new koa_1.default();
// 连接数据库
(0, db_1.default)();
// 鉴权
app.use(verify_1.default);
// 解析请求 body 中的信息
app.use((0, koa_body_1.default)({
    multipart: true // 支持二进制文件数据解析
}));
// 路由
app.use(index_1.default.routes());
app.use(index_1.default.allowedMethods()); // 处理options方法
// 解析静态资源
app.use(page_1.default);
// 监听 80 端口
const server = app.listen(80, () => {
    console.log("成功启动！");
});
// 同一端口建立websocket连接
(0, websocket_1.default)(server);
// 添加处理消息的函数
(0, websocket_1.emitBind)('sendMessage', sendMessage_1.default);
(0, websocket_1.emitBind)('sendFriReq', sendFriReq_1.default);
(0, websocket_1.emitBind)('sendFriReply', sendFriReply_1.default);
(0, websocket_1.emitBind)('sendMessageStatus', sendMessageStatus_1.default);
//# sourceMappingURL=index.js.map