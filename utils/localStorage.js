/*
 * @Author: 郭志明 zhiming.guo@zingbiz.com
 * @Date: 2023-05-23 17:10:58
 * @LastEditors: 郭志明 zhiming.guo@zingbiz.com
 * @LastEditTime: 2023-05-23 17:11:08
 * @FilePath: /websocketDemo/utils/localStorage.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const localStorage = window.localStorage

/**
 * localStorage 设置
 * @param {String} key 键
 * @param {String} val 值
 */
export function set(key, val) {
  try {
    if (!key) return
    return localStorage.setItem(key, val)
  } catch (err) {}
}

/**
 * localStorage 获取
 * @param {String} key 键
 * @return {Boolean} key 对应 localStorage 的值
 */
export function get(key) {
  try {
    if (!key) return ''
    return localStorage.getItem(key)
  } catch (err) {
    return ''
  }
}

/**
 * 清除 localStorage，若不填参数 key ，则清除所有 localStorage
 * @param {String} key 键
 * @return {Boolean} 是否清除成功
 */
export function remove(key) {
  try {
    if (typeof key === 'undefined') return localStorage.clear()
    return localStorage.removeItem(key)
  } catch (err) {
    return false
  }
}

/**
 * 检查是否支持 localStorage
 * @return {Boolean} 当前浏览器是否支持 localStorage
 */
export function support() {
  try {
    localStorage.setItem('key', 'value')
    if (localStorage.getItem('key') === 'value') {
      localStorage.removeItem('key')
      return true
    } else {
      return false
    }
  } catch (err) {
    return false
  }
}

// 默认导出全量方法
export default {
  get,
  set,
  remove,
  support
}