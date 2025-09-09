<template>
  <div class="app-layout">
    <!-- 导航栏 -->
    <header class="header">
      <div class="container header-container">
        <div class="logo" @click="goToHome">
          <h1>味觉餐厅</h1>
        </div>
        
        <nav class="nav-menu">
          <router-link to="/" class="nav-item">首页</router-link>
          <router-link v-if="isAuthenticated" to="/reservation" class="nav-item">在线预约</router-link>
        </nav>
        
        <div class="user-actions">
          <template v-if="isAuthenticated">
            <el-dropdown trigger="click" @command="handleCommand">
              <span class="user-dropdown">
                {{ userEmail }}
                <el-icon class="el-icon--right"><arrow-down /></el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </template>
          <template v-else>
            <router-link to="/login" class="login-btn">登录</router-link>
            <router-link to="/register" class="register-btn">注册</router-link>
          </template>
        </div>
      </div>
    </header>
    
    <!-- 主要内容 -->
    <main class="main-content">
      <router-view></router-view>
    </main>
    
    <!-- 页脚 -->
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <h3>味觉餐厅</h3>
            <p>品味美食，享受生活</p>
            <p>地址：北京市朝阳区建国路88号</p>
            <p>电话：010-12345678</p>
          </div>
          
          <div class="footer-section">
            <h3>营业时间</h3>
            <p>周一至周五：11:30 - 14:00, 17:30 - 21:30</p>
            <p>周末：11:00 - 15:00, 17:30 - 22:00</p>
          </div>
          
          <div class="footer-section">
            <h3>快速链接</h3>
            <div class="footer-links">
              <router-link to="/">首页</router-link>
              <router-link to="/reservation">在线预约</router-link>
            </div>
          </div>
        </div>
        
        <div class="footer-bottom">
          <p>&copy; {{ new Date().getFullYear() }} 味觉餐厅. 保留所有权利.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import { ArrowDown } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const router = useRouter()
const authStore = useAuthStore()

// 计算属性
const isAuthenticated = computed(() => authStore.isAuthenticated)
const userEmail = computed(() => authStore.userEmail)

// 跳转到首页
const goToHome = () => {
  router.push('/')
}

// 处理下拉菜单命令
const handleCommand = (command) => {
  switch (command) {
    case 'myReservations':
      router.push('/my-reservations')
      break
    case 'logout':
      authStore.logout()
      ElMessage.success('已成功退出登录')
      router.push('/')
      break
  }
}
</script>

<style scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header {
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
}

.logo {
  cursor: pointer;
}

.logo h1 {
  color: var(--primary-color);
  font-size: 24px;
  margin: 0;
}

.nav-menu {
  display: flex;
  gap: 24px;
}

.nav-item {
  color: var(--text-color);
  text-decoration: none;
  font-weight: 500;
  padding: 8px 0;
  position: relative;
}

.nav-item:hover, .nav-item.router-link-active {
  color: var(--primary-color);
}

.nav-item.router-link-active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--primary-color);
}

.user-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.login-btn, .register-btn {
  text-decoration: none;
  padding: 8px 16px;
  border-radius: var(--border-radius);
  font-weight: 500;
}

.login-btn {
  color: var(--primary-color);
}

.register-btn {
  background-color: var(--primary-color);
  color: white;
}

.user-dropdown {
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  color: var(--text-color);
  font-weight: 500;
}

.main-content {
  flex: 1;
}

.footer {
  background-color: #333;
  color: white;
  padding: 40px 0 20px;
  margin-top: 40px;
}

.footer-content {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  margin-bottom: 30px;
}

.footer-section {
  flex: 1;
  min-width: 200px;
}

.footer-section h3 {
  color: var(--primary-color);
  margin-bottom: 16px;
  font-size: 18px;
}

.footer-section p {
  margin-bottom: 8px;
  color: #ccc;
}

.footer-links {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.footer-links a {
  color: #ccc;
  text-decoration: none;
}

.footer-links a:hover {
  color: var(--primary-color);
}

.footer-bottom {
  text-align: center;
  padding-top: 20px;
  border-top: 1px solid #444;
  color: #888;
  font-size: 14px;
}

@media (max-width: 768px) {
  .header-container {
    flex-direction: column;
    height: auto;
    padding: 16px 15px;
  }
  
  .nav-menu {
    margin: 16px 0;
  }
  
  .footer-content {
    flex-direction: column;
    gap: 24px;
  }
}
</style>