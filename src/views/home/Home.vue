<template>
  <div class="home-container">
    <!-- 顶部横幅 -->
    <div class="banner">
      <div class="banner-content">
        <h1>味觉餐厅</h1>
        <p>品味美食，享受生活</p>
        <el-button type="primary" size="large" @click="goToReservation" class="banner-btn">
          立即预约
        </el-button>
      </div>
    </div>
    
    <!-- 餐厅介绍 -->
    <div class="container">
      <div class="section">
        <h2 class="section-title">关于我们</h2>
        <div class="about-content">
          <div class="about-text">
            <p>味觉餐厅创立于2010年，是一家专注于提供高品质美食体验的餐厅。我们坚持使用新鲜的食材，结合传统与创新的烹饪技术，为顾客带来独特的味觉享受。</p>
            <p>我们的厨师团队拥有丰富的经验，精通各种菜系，无论是经典的中华料理，还是创新的融合美食，都能为您带来惊喜。</p>
            <p>在味觉餐厅，我们不仅注重食物的品质，更注重为顾客创造温馨、舒适的用餐环境。无论是商务宴请、家庭聚会还是浪漫约会，我们都能满足您的需求。</p>
          </div>
          <div class="about-image">
            <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="餐厅环境">
          </div>
        </div>
      </div>
      
      <!-- 特色菜品 -->
      <div class="section">
        <h2 class="section-title">特色菜品</h2>
        <div class="dishes-container">
          <div class="dish-card" v-for="(dish, index) in featuredDishes" :key="index">
            <div class="dish-image">
              <img :src="dish.image" :alt="dish.name">
            </div>
            <div class="dish-info">
              <h3>{{ dish.name }}</h3>
              <p>{{ dish.description }}</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 预约按钮 -->
      <div class="section">
        <div class="reservation-cta">
          <p>提前预约，避免等待</p>
          <el-button type="primary" @click="goToReservation" size="large">立即预约</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

// 特色菜品数据
const featuredDishes = ref([
  {
    name: '招牌红烧肉',
    description: '选用上等五花肉，经过特制酱料慢炖而成，肥而不腻，口感醇厚。',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGNoaW5lc2UlMjBmb29kfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: '松露野菌意面',
    description: '采用进口松露与当季野生菌菇，搭配手工意面，香气四溢，回味无穷。',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHBhc3RhfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: '香煎三文鱼',
    description: '精选挪威三文鱼，外酥里嫩，搭配特制酱汁，鲜美可口。',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2FsbW9ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
  }
])

// 跳转到预约页面
const goToReservation = () => {
  if (authStore.isAuthenticated) {
    router.push('/reservation')
  } else {
    router.push('/login')
  }
}
</script>

<style scoped>
.home-container {
  min-height: 100vh;
}

.banner {
  height: 500px;
  background-image: url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cmVzdGF1cmFudHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1000&q=80');
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
}

.banner::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.banner-content {
  position: relative;
  z-index: 1;
}

.banner h1 {
  font-size: 48px;
  margin-bottom: 16px;
}

.banner p {
  font-size: 24px;
  margin-bottom: 32px;
}

.banner-btn {
  padding: 12px 24px;
  font-size: 18px;
}

.section {
  padding: 60px 0;
  border-bottom: 1px solid #eee;
}

.section:last-child {
  border-bottom: none;
}

.section-title {
  text-align: center;
  margin-bottom: 40px;
  color: var(--primary-color);
  font-size: 32px;
  position: relative;
}

.section-title::after {
  content: '';
  display: block;
  width: 60px;
  height: 3px;
  background-color: var(--primary-color);
  margin: 16px auto 0;
}

.about-content {
  display: flex;
  align-items: center;
  gap: 40px;
}

.about-text {
  flex: 1;
}

.about-text p {
  margin-bottom: 16px;
  line-height: 1.8;
}

.about-image {
  flex: 1;
}

.about-image img {
  width: 100%;
  border-radius: 8px;
  box-shadow: var(--box-shadow);
}

.dishes-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
}

.dish-card {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: var(--box-shadow);
  transition: transform 0.3s ease;
}

.dish-card:hover {
  transform: translateY(-5px);
}

.dish-image img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.dish-info {
  padding: 20px;
}

.dish-info h3 {
  margin-bottom: 10px;
  color: var(--primary-color);
}

.hours-container {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-bottom: 40px;
}

.hours-card {
  background-color: white;
  padding: 24px;
  border-radius: 8px;
  box-shadow: var(--box-shadow);
  text-align: center;
  min-width: 250px;
}

.hours-card h3 {
  color: var(--primary-color);
  margin-bottom: 16px;
}

.hours-card p {
  margin-bottom: 8px;
}

.reservation-cta {
  text-align: center;
  margin-top: 40px;
}

.reservation-cta p {
  margin-bottom: 16px;
  font-size: 18px;
}

.contact-container {
  display: flex;
  gap: 40px;
}

.contact-info {
  flex: 1;
  padding: 24px;
  background-color: white;
  border-radius: 8px;
  box-shadow: var(--box-shadow);
}

.contact-info p {
  margin-bottom: 16px;
  display: flex;
  align-items: center;
}

.contact-info i {
  margin-right: 10px;
  color: var(--primary-color);
}

.contact-map {
  flex: 1;
}

.contact-map img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: var(--box-shadow);
}

@media (max-width: 768px) {
  .about-content,
  .contact-container {
    flex-direction: column;
  }
  
  .hours-container {
    flex-direction: column;
    align-items: center;
  }
  
  .banner h1 {
    font-size: 36px;
  }
  
  .banner p {
    font-size: 18px;
  }
}
</style>