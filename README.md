### websocket

怎么操作呢？
其实原理很简单，服务器保存好所有的 Client->Server 的 Socket 连接，Client A 发送消息给 Client B 的实质是：Client A -> Server -> Client B。
即 Client A 发送类似 {from:'Client A', to:'Client B', body: 'hello'} 的数据给 Server。Server 接收数据根据 to 值找到 Client B 的 Socket 连接并将消息转发给 Client B。

Client A 只是给的一个例子，实际上所有的 from 和 to 值都应该是一个 UUID 值，你起码得保证在你的系统里类似 QQ 号一样有个一对一的关系，这样才方便查找。所以实际上可能 Client A 的属性是 {id: 'A', nickname:'Client A'}。



是怎么来获取数据的？？
  解答：前端：输入完数据以后，点击发送，
  后端：ws会接收到数据，然后处理数据，最后在遍历server.clients，将消息发送给客户端，用于展示





那么问题？如何将消息分为左右展示呢？
  答：只要是我发的消息就在右侧，系统返回的就在左侧，
  那么我发完消息之后还用在通知websocket吗？
  答：需要通知，因为需要给聊天的那个人展示消息


如何存储：比如张三、李四登录，只获取这个人消息的详情，使用mock.js 完成数据存储

当用户输入完消息之后，服务端如何推送给指定用户呢？

还有一个系统消息，所有人都应该能接受到通知？
