# 项目思路和设计

项目功能：

1. 私聊、加人
2. 群聊、加群
3. 发送文字、emoij标签、图片、语音、视频
4. 识别数学表达式[参考](https://webdemo.myscript.com/views/math/index.html#)
5. websocket双向通信
6. 登录登出（token验证）

# 项目结构：
    - public 
        - index.html // 首页
    - src
        - component
            - main  // 首页
            - chat  // 聊天页面
            - chat_list  // 聊天列表
            - address_list  // 通讯录
            - user
        - app.js   
        - index.js // 入口文件

项目启动：
1. master分支是前端代码，server是服务端代码。服务端代码实现了静态服务器管理功能。
   下载前端和服务端代码（保证在同一个文件夹里），然后启动服务端代码即可
2. 服务端npm start 启动，然后浏览器访问127.0.0.1即可
