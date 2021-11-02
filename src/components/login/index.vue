<template>
  <el-form
    ref="loginForms"
    :model="loginForm"
    status-icon
    :rules="loginRules"
    label-width="120px"
  >
    <el-form-item label="手机号" prop="phone" v-if="loginForm.loginMethod === 1">
      <el-input v-model="loginForm.phone" type="text"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="email" v-if="loginForm.loginMethod === 2">
      <el-input v-model="loginForm.email" type="email"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="loginForm.password" type="password"></el-input>
    </el-form-item>
    <el-button type="primary">1111</el-button>
  </el-form>
</template>
<script lang="ts">
import { defineComponent, reactive,toRefs,ref } from 'vue'
import { LoginForm } from './index'
import { LoginCellphone } from '../../api/common'
export default defineComponent({

  setup() {
    let loginForm = reactive<LoginForm>({
      loginMethod:1,
      phone: '',
      password: '',
      md5_password: '',
      captcha: '',
      email:'',
    })
    let loginRules = reactive({
      phone: { required: true, type: 'string', message: '请输入手机号码', trigger: 'blur' },
      password: { required: true, type: 'string', message: '请输入密码', trigger: 'blur' },
      email:{ required: true, type: 'string', message: '请输入邮箱', trigger: 'blur' },
    })
    return {
      loginForm,
      // ...toRefs(loginForm),
      loginRules,
    }

  },
})
</script>