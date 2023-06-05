/*
 * @Author: 郭志明 zhiming.guo@zingbiz.com
 * @Date: 2023-05-15 11:34:03
 * @LastEditors: 郭志明 zhiming.guo@zingbiz.com
 * @LastEditTime: 2023-05-15 17:16:11
 * @FilePath: /websocketDemo/wsServer/wsserver.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const WebSocket = require('ws')
const server = new WebSocket.Server({port: 8888})

// connection 连接
//只要有WebSocket连接到该服务器，就会触发'connection'事件；req对象可以用来获取客户端的信息，如ip、端口号
//获取所有已连接的客户端信息，则可以使用server.clients数据集

 /* send(data [,options][,callback])
       data：发送的数据
       options对象：
         (1)compress：指定数据是否需要压缩。默认为true
         (2)binary：指定数据是否通过二进制传送。默认是自动检测
         (3)mask：指定是否应遮罩数据。
         (4)fin：指定数据是否为消息的最后一个片段。默认为true
 */
server.on('connection',function connection(ws,req){
  console.log('connection-ws', ws)
  console.log('connection-req', req)
  const ip = req.socket.remoteAddress
  const port = req.socket.remotePort
  const clientName = ip + port
​
  console.log('%s is connected ',clientName)
​
  // 发送消息 
  ws.send('Welcome ' + clientName)

  // 接收消息
  ws.on('message',function incoming(message){
    console.log('收到消息', message,clientName)
    server.clients.forEach(function each(client){
        if(client.readyState === WebSocket.OPEN){
            client.send(clientName +" -> " + message)
        }
    })
  })
  
})

//准备的状态：ws中WebSocket类具有以下4中准备状态
server.clients.forEach(function each(client){
  if(client.readyState === WebSocket.OPEN){
      client.send(clientName +" -> " + message)
  }
})

//关闭WebSocket服务器：通过监听close事件关闭服务器
server.on('close',function close(){
  console.log('close')
})


server.on('open',function open(){
  console.log('open')
})

server.on('error',function error(){
  console.log('error')
})
