const ws = require('nodejs-websocket');
const POST = 8888;
const server = ws.createServer(connect => {
  connect.on("text", data => {
    console.log("received: "+data);
    connect.sendText(data);
  });
  connect.on("close", (code, reason) => {
    console.log("connection closed!");
  });
  connect.on('error', ()=>{
    console.log("connection error!");
  });
});

server.listen(POST, ()=>{
  console.log("websocket server start success!");
});