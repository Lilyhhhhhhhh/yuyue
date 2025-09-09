import { defineStore } from 'pinia'

export const useReservationStore = defineStore('reservation', {
  state: () => ({
    availableSlots: [],
    loading: false,
    error: null
  }),
  
  actions: {
    async fetchAvailableSlots(date) {
      this.loading = true
      this.error = null
      
      try {
        // 模拟API调用
        // 实际项目中，这里会调用Supabase的API获取可用时段
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // 模拟数据
        this.availableSlots = [
          { time: '11:30', available: 8 },
          { time: '12:00', available: 5 },
          { time: '12:30', available: 3 },
          { time: '13:00', available: 0 },
          { time: '18:00', available: 10 },
          { time: '18:30', available: 8 },
          { time: '19:00', available: 6 },
          { time: '19:30', available: 4 },
          { time: '20:00', available: 2 }
        ]
      } catch (error) {
        this.error = '获取可用时段失败'
      } finally {
        this.loading = false
      }
    },
    
    async createReservation(reservationData) {
      this.loading = true
      this.error = null
      
      try {
        // 模拟API调用
        // 实际项目中，这里会调用Supabase的API创建预约
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // 模拟成功创建预约
        return true
      } catch (error) {
        this.error = '创建预约失败'
        return false
      } finally {
        this.loading = false
      }
    }
  }
})
