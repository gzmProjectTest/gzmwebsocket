<!--
 * @Author: 郭志明 zhiming.guo@zingbiz.com
 * @Date: 2023-05-15 10:30:37
 * @LastEditors: 郭志明 zhiming.guo@zingbiz.com
 * @LastEditTime: 2023-05-23 16:47:14
 * @FilePath: /websocketDemo/src/App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/message">Message</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app{
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
