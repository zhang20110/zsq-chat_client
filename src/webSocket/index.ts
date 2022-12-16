const handles = []; // 存储订阅者
let wss = null;
const url = process.env.NODE_ENV === 'production' 
? 'ws://106.13.180.104:80' : 'ws://127.0.0.1:80/';
// const url = 'ws://127.0.0.1:80';
export const connect = () => {
    wss = new WebSocket(url);
    wss.onmessage = (res) => {
        console.log('接受数据：', res);
        // 向所有订阅者发布消息
        for (let i = 0; i < handles.length; ++i) {
            handles[i](JSON.parse(res.data));
        }
    }
    wss.onclose = (...args) => {
        console.log('关闭：', args);
        // wss.send('624abd23eaa9daa288dd4d31');
        // connect();
    }
    wss.onopen = () => {
        console.log('链接成功');
    }
}
// 加载app时自动进行连接
// connect()
// 订阅
const emit = (handle) => {
    handles.push(handle);
};
// 删除订阅
export const cancelEmit = (handle) => {
    console.log('开始删除重复的订阅', handles.length, handle);
    for (let i = 0; i < handles.length; ++i) {
        if (handles[i] === handle) {
            console.log('成功删除：', handles.length);
            handles.splice(i, 1);
            return;
        }
    }
}
const res = {
    emit,
    send: data => {
        if (typeof data === 'object') {
            console.log('发送数据：', data);
            wss.send(JSON.stringify(data))
        } else {
            throw new Error("请发送对象数据");
        }
    }
};
export default res;