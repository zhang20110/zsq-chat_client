import Koa from 'koa';
import router from './routes/index'
import bodyParser from 'koa-body'
import mongo from './db'
import verify from './controller/verify';
import connecWC, { emitBind } from './controller/websocket'
import page from './controller/page'
import sendMessage from './controller/sendMessage'
import sendFriReq from './controller/sendFriReq'
import sendFriReply from './controller/sendFriReply'
import sendMessageStatus from './controller/sendMessageStatus';
const app = new Koa();
// 连接数据库
mongo()
// 鉴权
app.use(verify);
// 解析请求 body 中的信息
app.use(bodyParser({
    multipart: true // 支持二进制文件数据解析
}));
// 路由
app.use(router.routes());
app.use(router.allowedMethods()); // 处理options方法
// 解析静态资源
app.use(page);
// 监听 80 端口
const server = app.listen(80, () => {
    console.log("成功启动！");
})
// 同一端口建立websocket连接
connecWC(server);
// 添加处理消息的函数
emitBind('sendMessage', sendMessage);
emitBind('sendFriReq', sendFriReq);
emitBind('sendFriReply', sendFriReply);
emitBind('sendMessageStatus', sendMessageStatus);
