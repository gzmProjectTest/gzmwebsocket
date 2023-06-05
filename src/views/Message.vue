<!--
 * @Author: 郭志明 zhiming.guo@zingbiz.com
 * @Date: 2023-05-15 10:30:37
 * @LastEditors: 郭志明 zhiming.guo@zingbiz.com
 * @LastEditTime: 2023-05-31 14:19:34
 * @FilePath: /websocketDemo/src/views/Message.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE《
-->

<!-- 
  
  https://blog.csdn.net/sinat_15955423/article/details/127949531 

  截取url的参数
  https://blog.csdn.net/weixin_57780816/article/details/128136416
-->
<template>
  <div class="message">
    <h1>用户聊天界面</h1>
    <div style="display: flex;">
      <div class="message-body">
        <div class="message-body-heard">
          <div>消息</div>
          <div v-if="userInfo.name">您正在跟 {{ userInfo.name }} 聊天</div>
        </div>
        <div class="message-body-content">
          <div 
            :class="{
              'message-body-content-right': item.right,
              'message-body-content-left': item.left,
            }"
            v-for="item in messageContentArr" :key="item.id">
            <div class="time">{{ item.createDate }}</div>
            <div class="message">{{ item.message }}</div>
          </div>
        </div>
        <div class="message-body-footer">
          <input v-model="value" placeholder="请输入内容"/>
          <button @click="handleSend">发送</button>
        </div>
      </div>
      <div class="message-body">
        <div class="message-body-heard">
          <div>可聊天用户</div>
        </div>
        <div class="message-body-content">
          <div
            class="message-body-content-name"
            @click="handleNameClick(item)"
            :style="userInfo.id === item.id ? 'background: red;' : ''"
            v-for="item in filterContentArr"
            :key="item.id">
            <div>{{ item.name }}</div>
          </div>
        </div>
      </div>
    </div>
    <div id="responseTest">
      哈哈哈？
    </div>
  </div>
</template>

<script>
import localStorage from '../../utils/localStorage.js'
let socket
export default {
  data() {
    return {
      value: '',
      filterContentArr: [],
      userInfo: {},
      contentArr: [
        {
          id: 'zhangsan',
          name: '张三',
          message: 'hello,您好呀',
          createDate: '2023-3-29 3:30:33'
        },
        {
          id: 'lisi',
          name: '李四',
          message: 'hello,您好呀',
          createDate: '2023-3-28 3:30:33'
        },
        {
          id: 'wangwu',
          name: '王五',
          message: 'hello,您好呀',
          createDate: '2023-3-27 3:30:33'
        },
      ],
      messageContentArr: [],
      localUserInfo: {}
    }
  },
  mounted() {
    const userInfo = localStorage.get('userInfo')
    console.log('userInfo', JSON.parse(userInfo))
    if (!userInfo || !Object.keys(userInfo).length) {
      this.$router.push({
        path: '/',
      })
      return this.$message.error('请先登录')
    }
    this.localUserInfo = JSON.parse(userInfo)
    this.handleFilterContentArr(this.localUserInfo)
    // userInfo
    if (!window.WebSocket) {
      window.WebSocket = window.MozWebSocket
    }
  },
  methods: {
    handleFilterContentArr(userInfo) {
      this.filterContentArr = this.contentArr.filter( item => userInfo.accountNumber !== item.name)
    },
    handleSend(){
      if(!window.WebSocket){
        return
      }
      if(socket.readyState === WebSocket.OPEN){
        const obj = {
          name: this.localUserInfo.accountNumber,
          toId: this.localUserInfo.id,
          message: this.value,
          createDate: new Date(),
          right: true
        }
        this.messageContentArr.push(obj)
        socket.send(JSON.stringify(obj))
        this.value = ''
      }else{
        alert('连接没有开启')
      }
    },
    handleNameClick(item) {
      this.userInfo = item
      const that = this
      if(window.WebSocket){
        // 启动一个张三的websocket的聊天
        // 客户端连接服务器端，并且传递参数
        socket = new WebSocket(`ws://localhost:8888?toId=${item.id}&from=${this.localUserInfo.id}`)
        // socket = new WebSocket(`ws://localhost:8888?id=${this.localUserInfo.id}`)
        socket.onmessage = function(event){
          // var ta = document.getElementById('responseTest')
          // ta.value = ta.value + '\n' + event.data
          const data = JSON.parse(event.data)
          that.$set(data, 'left', true)
          console.log('FE-接受消息', )
          that.messageContentArr.push(data)
        }
        socket.onopen = function(event) {
          // var ta = document.getElementById('responseTest')
          // ta.value = '连接开启!'
          console.log('FE-开启', )
        }
        socket.onclose = function(event) {
          // var ta = document.getElementById('responseTest')
          // ta.value = '连接关闭!'
          console.log('FE-关闭')
        }
      }else{
        alert('你的浏览器不支持WebSocket')
      }
    }
  }
}
</script>

<style lang="stylus">
.message-body{
  border: 1px solid red;
  height: 300px;
  overflow: auto;
  width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &-heard{
    div{
      text-align: left;
      font-weight: bold;
      border-bottom: 1px solid;
    }
  }

  &-content{
    flex: 1;
    overflow: auto;

    &-name{
      cursor: pointer;
    }

    &-right{

      .message{
        text-align: right;
        margin-right: 10px;
        background-color: #97cd30;
      }
    }

    &-left{

      .message{
        text-align: left;
        margin-left: 10px;
        background-color: #f5f6f7;
      }
    }
  }

  &-footer{
    border-top: 1px solid;
    height: 100px;
    text-align: left;
    input{
      width: calc(100% - 20px);
    }
  }
}
</style>
