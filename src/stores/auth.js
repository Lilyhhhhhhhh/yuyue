import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    loading: false,
    error: null
  }),
  
  getters: {
    isAuthenticated: (state) => !!state.user,
    userEmail: (state) => state.user?.email
  },
  
  actions: {
    async login(email, password) {
      this.loading = true
      this.error = null
      
      try {
        // 模拟登录API调用
        // 实际项目中，这里会调用Supabase的登录API
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // 模拟成功登录
        const user = { email, id: 'user-123' }
        this.user = user
        localStorage.setItem('user', JSON.stringify(user))
        return true
      } catch (error) {
        this.error = '登录失败，请检查您的邮箱和密码'
        return false
      } finally {
        this.loading = false
      }
    },
    
    async register(email, password) {
      this.loading = true
      this.error = null
      
      try {
        // 模拟注册API调用
        // 实际项目中，这里会调用Supabase的注册API
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // 模拟成功注册
        const user = { email, id: 'user-123' }
        this.user = user
        localStorage.setItem('user', JSON.stringify(user))
        return true
      } catch (error) {
        this.error = '注册失败，请稍后再试'
        return false
      } finally {
        this.loading = false
      }
    },
    
    async forgotPassword(email) {
      this.loading = true
      this.error = null
      
      try {
        // 模拟忘记密码API调用
        // 实际项目中，这里会调用Supabase的重置密码API
        await new Promise(resolve => setTimeout(resolve, 1000))
        return true
      } catch (error) {
        this.error = '发送重置密码邮件失败，请稍后再试'
        return false
      } finally {
        this.loading = false
      }
    },
    
    logout() {
      this.user = null
      localStorage.removeItem('user')
    }
  }
})