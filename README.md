# koa结合ts
1. 下载koa 和 @types/koa 包
2. 在tsconfig.json中添加`"esModuleInterop": true`, 能够使用import引入包(因为require不支持ts静态类型检测)



# 部署静态服务器

什么是静态服务器

> 即返回html、css、js等代码的服务器，一般使用server包直接部署。比如前端访问127.1.1.1/static/1.html时，可以返回服务器/static/1.html路径的文件给浏览器

为了前后端同一在一个端口上，所以自己原生实现了一个静态服务器

# 目录结构
    - controller 
        - chatlist 获取用户的所有好友
        - getAllUsers 获取发送过消息的好友信息
        - getEmoji 获取表情
        - getMessage 获取好友间的消息往来
        - getReply 获取收到的好友申请
        - getRequest 获取发送的好友申请
        - getSelfInfo 获取个人信息
        - getUser 查询用户信息
        - imgs 获取图片
        - login 登陆
        - register 注册
        - page 静态资源请求
        - sendFriReply 同意好友请求
        - sendFriReq 发起好友请求
        - sendMessage 发送消息
        - updateHeadPorUrl 更新头像
        - updateUserInfo 更能用户个人信息
        - uploadImg 上传图片
        - urils 工具函数
        - verify 验证用户身份
        - websocket websocket连接以及消息处理事件绑定
    - db 数据库连接
    - routes 路由
    - models 数据库模型
    - dist ts文件的数据文件夹
    - spiderNode 爬虫获取表情

# websocket