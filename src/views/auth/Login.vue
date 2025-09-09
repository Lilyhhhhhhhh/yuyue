<template>
  <div class="auth-container">
    <div class="auth-card">
      <h2 class="auth-title">登录</h2>
      <form @submit.prevent="handleLogin" class="auth-form">
        <div class="form-group">
          <label for="email">邮箱</label>
          <el-input 
            v-model="email" 
            id="email" 
            type="email" 
            placeholder="请输入邮箱地址"
            :disabled="loading"
            required
          />
        </div>
        
        <div class="form-group">
          <label for="password">密码</label>
          <el-input 
            v-model="password" 
            id="password" 
            type="password" 
            placeholder="请输入密码"
            :disabled="loading"
            required
            show-password
          />
        </div>
        
        <div v-if="error" class="error-message">
          {{ error }}
        </div>
        
        <el-button 
          type="primary" 
          native-type="submit" 
          :loading="loading" 
          class="auth-button"
        >
          登录
        </el-button>
        
        <div class="auth-links">
          <router-link to="/forgot-password">忘记密码?</router-link>
          <router-link to="/register">没有账号? 立即注册</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import { ElMessage } from 'element-plus'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
  if (!email.value || !password.value) {
    error.value = '请填写所有必填字段'
    return
  }
  
  loading.value = true
  error.value = ''
  
  try {
    const success = await authStore.login(email.value, password.value)
    if (success) {
      ElMessage.success('登录成功')
      router.push('/')
    } else {
      error.value = authStore.error || '登录失败，请检查您的邮箱和密码'
    }
  } catch (err) {
    error.value = '登录过程中发生错误'
    console.error(err)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  background-color: var(--light-gray);
}

.auth-card {
  width: 100%;
  max-width: 400px;
  padding: 30px;
  background-color: var(--white);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
}

.auth-title {
  text-align: center;
  margin-bottom: 24px;
  color: var(--primary-color);
  font-size: 24px;
}

.auth-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
}

.auth-button {
  width: 100%;
  margin-top: 16px;
  height: 40px;
}

.auth-links {
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  font-size: 14px;
}

.auth-links a {
  color: var(--primary-color);
  text-decoration: none;
}

.auth-links a:hover {
  text-decoration: underline;
}

.error-message {
  color: var(--danger);
  margin-top: 8px;
  font-size: 14px;
}
</style>