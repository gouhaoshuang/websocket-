//1. 导入nodejs-websocket 包
const ws = require('nodejs-websocket')
const PORT = 3000

//2. 创建一个server
//2.1 如何处理用户请求

//每次只要有用户连接，函数就会被执行，就会给当前连接的用户创建一个connect对象
const server = ws.createServer(connect=>{
    console.log('有用户连接上来了')
    //每当接收到用户传递过来的数据，这个text事件就会被触发
    connect.on('text',data=>{
        console.log('接收到了用户的数据',data)
        //对用户发送过来数据，将小写变成大写
        connect.send(data.toUpperCase()+'!!!')
    })
    //只要WebSocket连接断开，close事件就会触发
    connect.on('close',()=>{
        console.log('连接断开了')
    })
    //注册一个error事件，处理用户的错误信息
    connect.on('error',()=>{
        console.log('用户连接异常')
    })
})

server.listen(PORT,()=>{
    console.log('websocket 服务启动成功了:' + PORT)
})