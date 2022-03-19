# 项目思路和设计

项目功能：

1. 私聊、加人
2. 群聊、加群
3. 发送文字、emoij标签、图片、语音、视频
4. 识别数学表达式[参考](https://webdemo.myscript.com/views/math/index.html#)

项目解构：
    - public 
        - index.html // 首页
    - component
        - main  // 首页
        - chat  // 聊天页面
        - chat_list  // 聊天列表
        - address_list  // 通讯录
        - user
    - src
        - app.js   
        - index.js // 入口文件