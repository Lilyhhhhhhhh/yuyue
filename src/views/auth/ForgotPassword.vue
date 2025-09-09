<template>
  <div class="auth-container">
    <div class="auth-card">
      <h2 class="auth-title">忘记密码</h2>
      <p class="auth-description">请输入您的邮箱地址，我们将向您发送密码重置链接。</p>
      
      <form @submit.prevent="handleForgotPassword" class="auth-form">
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
        
        <div v-if="error" class="error-message">
          {{ error }}
        </div>
        
        <div v-if="success" class="success-message">
          {{ success }}
        </div>
        
        <el-button 
          type="primary" 
          native-type="submit" 
          :loading="loading" 
          class="auth-button"
        >
          发送重置链接
        </el-button>
        
        <div class="auth-links">
          <router-link to="/login">返回登录</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../../stores/auth'

const authStore = useAuthStore()

const email = ref('')
const loading = ref(false)
const error = ref('')
const success = ref('')

const handleForgotPassword = async () => {
  if (!email.value) {
    error.value = '请输入邮箱地址'
    return
  }
  
  loading.value = true
  error.value = ''
  success.value = ''
  
  try {
    const result = await authStore.forgotPassword(email.value)
    if (result) {
      success.value = '重置密码链接已发送到您的邮箱，请查收'
      email.value = ''
    } else {
      error.value = authStore.error || '发送重置链接失败，请稍后再试'
    }
  } catch (err) {
    error.value = '发送重置链接过程中发生错误'
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
  margin-bottom: 16px;
  color: var(--primary-color);
  font-size: 24px;
}

.auth-description {
  text-align: center;
  margin-bottom: 24px;
  color: var(--gray);
  font-size: 14px;
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
  justify-content: center;
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

.success-message {
  color: var(--success);
  margin-top: 8px;
  font-size: 14px;
}
</style>