const  ws = require('nodejs-websocket');
const PORT = 3000
const  TYPE_ENTER = 0
const TYPE_LEAVE = 1
const TYPE_MSG = 2

let count = 0;

/**
 * 分析：
 *     消息不应该是一个简单的字符串
 *      这个消息应该是一个对象
 *      type：消息的类型，0:表示进入聊天室的消息，1：用户离开聊天室的消息，2：正常的聊天消息
 *      msg：消息的内容
 *      time:聊天的具体时间。
 */

const server  = ws.createServer(conn=>{
    count ++;
    conn.userName = `用户${count}`;
    console.log(`${conn.userName}加入了聊天室`)
    broadcast({
        type:TYPE_ENTER,
        msg: `${conn.userName}进入了聊天室`,
        time:new Date().toLocaleTimeString()
    });

    conn.on('text',data=>{
        broadcast({
            type:TYPE_MSG,
            msg: `${conn.userName}: ${data}`,
            time:new Date().toLocaleTimeString()
        });
    })
    conn.on('close',data=>{
        count--;
        broadcast({
            type:TYPE_LEAVE,
            msg: `${conn.userName}离开了聊天室`,
            time:new Date().toLocaleTimeString()
        });
    })

    conn.on('error',data=>{

    })
    
})

function broadcast(msg){
    server.connections.forEach(item=>{
        item.send(JSON.stringify(msg))
    })
}

server.listen(PORT,()=>{
    console.log('监听端口3000')
})
