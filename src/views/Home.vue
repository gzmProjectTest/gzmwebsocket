<!--
 * @Author: 郭志明 zhiming.guo@zingbiz.com
 * @Date: 2023-05-15 10:30:37
 * @LastEditors: 郭志明 zhiming.guo@zingbiz.com
 * @LastEditTime: 2023-05-30 17:54:20
 * @FilePath: /websocketDemo/src/views/Home.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="home">
    <h2>用户登录界面</h2>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="账号" style="width: 300px;" prop="accountNumber">
        <el-input type="text"  v-model="ruleForm.accountNumber"></el-input>
      </el-form-item>
      <el-form-item label="密码" style="width: 300px;" prop="pass">
        <el-input type="password"  v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" style="width: 300px;" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <el-button @click="handleReset">清楚缓存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import localStorage from '../../utils/localStorage.js'
export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: '',
        checkPass: '',
        accountNumber: '',
        companyId: ''
      },
      rules: {
        accountNumber: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        pass: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      const userInfo = localStorage.get('userInfo')
      if (userInfo && !Object.keys(userInfo).length > 0) {
        this.$router.push({
          path: 'Message'
        })
        return this.$message.error('已经登录过了')
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.ruleForm.companyId = this.uuid()
          const obj = {
            '张三': 'zhangsan',
            '李四': 'lisi',
            '王五': 'wangwu',
          }
          this.ruleForm.id = obj[this.ruleForm.accountNumber]
          localStorage.set('userInfo', JSON.stringify(this.ruleForm))
          this.$router.push({
            path: 'Message'
          })
        } else {
          this.$message.error('请输入账号跟密码')
          return false;
        }
      });
    },
    uuid() {
      var s = []
      var hexDigits = '0123456789abcdef'
      for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
      }
      s[14] = '4'  // bits 12-15 of the time_hi_and_version field to 0010
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1)  // bits 6-7 of the clock_seq_hi_and_reserved to 01
      s[8] = s[13] = s[18] = s[23] = ''

      var uuid2 = s.join('')
      return uuid2
    },
    resetForm(formName) {
      this.ruleForm = {
        pass: '',
        checkPass: '',
        accountNumber: '',
        companyId: ''
      }
    },
    handleReset() {
      localStorage.remove('userInfo')
    }
  }
}
</script>
