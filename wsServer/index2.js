/*
 * @Author: 郭志明 zhiming.guo@zingbiz.com
 * @Date: 2023-05-15 17:25:19
 * @LastEditors: 郭志明 zhiming.guo@zingbiz.com
 * @LastEditTime: 2023-05-31 10:04:15
 * @FilePath: /websocketDemo/wsServer/index2.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
console.log('12345')
const WebSocket = require('ws')
// 启动一个服务器，接受 张3 发过来的消息，并给 李4 发通知
const server = new WebSocket.Server({port: 8888})
const clients = []
const getParam = (url, param) => new URLSearchParams(url).get(param); // es6获取URL参数方法

// console.log('WebSocket', WebSocket)
// console.log('server', server)

server.on('connection',function connection(ws,req){
  const url = req.url.slice(2)
  console.log('connection',  url)
  const toUserId = getParam(url, 'toId')
  // const fromUserId = getParam(url, 'fromId')
  if (toUserId) {
    clients.push({ toUserId, ws: ws });
  }
  console.log('toUserId', toUserId)

  console.log('clients', clients)
  ws.on('message',function incoming(msg){
    const message = JSON.parse(msg)
    console.log('message', message)
    clients.forEach( item => {
      if (item.toUserId === message.toId) {
        console.log('1234-->', message)
        item['ws'].send(`${msg}`)
      }
    })
  })

  /*
    存在的问题？？ A （from） 发消息给 B（to），需要经过 server：8888
    在 clients 中拿到 a 发送给 b 链接， ws1， 当 a 用户发送之后，触发 ws.message
    通过b 的链接，将数据转发给 b socket.onmessage， b的FE接受到这条消息，
  */


  //此时客户端发送一个消息给服务端，就走到了 ws.on(‘message’)里
  // ws.on('message',function incoming(message){
  //   message = message.toString()// 在此之后就会变成字符串类型
  //   console.log('server.clients', server.clients)
  //   // console.log('node-收到消息', message)// {"id":1670209570343,"user":"Jaybird","dateTime":1670209570343,"message":"去去去"}
  //   // 遍历所有的客户端，将消息发送给某个人
  //   server.clients.forEach((c) => {// 等转换为字符串类型之后再传回前端
  //     // console.log('ccccc', c)
  //     c.send(message);
  //   })
  // })
})

server.on('close',function close(){
  console.log('close')
})

server.on('open',function open(){
  console.log('open')
})

server.on('error',function error(){
  console.log('error')
})
