const  ws = require('nodejs-websocket');
const PORT = 3000

//记录当前连接上来的用户总数
let count = 0;

//conn 每个连接到服务器的用户都会有一个conn对象
const server  = ws.createServer(conn=>{
    count ++;
    conn.userName = `用户${count}`;
    console.log(`${conn.userName}加入了聊天室`)
    //告诉所有用户，有人加入了聊天室
    broadcast(`${conn.userName}进入了聊天室`);

    conn.on('text',data=>{
        //当我们接收到某个用户的消息的时候，告诉所有用户，发送的消息内容是什么？
        broadcast(`${conn.userName}:${data}`);
    })
    conn.on('close',data=>{
        count--;
        //告诉所有的用户，有人离开了聊天室
        broadcast(`${conn.userName}离开了聊天室`)
    })

    conn.on('error',data=>{

    })
    
})

function broadcast(msg){
    //server.connections:表示所有的用户
    server.connections.forEach(item=>{
        item.send(msg)
    })
}

server.listen(PORT,()=>{
    console.log('监听端口3000')
})
