<template>
  <div class="reservation-container">
    <div class="container">
      <h1 class="page-title">在线预约</h1>
      
      <div class="reservation-content">
        <div class="reservation-form-container">
          <div class="card">
            <h2>填写预约信息</h2>
            <form @submit.prevent="handleSubmit" class="reservation-form">
              <!-- 日期选择 -->
              <div class="form-group">
                <label for="date">选择日期</label>
                <el-date-picker
                  v-model="formData.date"
                  type="date"
                  placeholder="选择日期"
                  format="YYYY-MM-DD"
                  :disabled="loading"
                  :disabledDate="disabledDate"
                  @change="handleDateChange"
                  style="width: 100%"
                />
              </div>
              
              <!-- 时间选择 -->
              <div class="form-group">
                <label>选择时间段</label>
                <div class="time-slots">
                  <el-radio-group v-model="formData.time" :disabled="!formData.date || loading">
                    <el-radio 
                      v-for="slot in availableSlots" 
                      :key="slot.time" 
                      :label="slot.time"
                      :disabled="slot.available <= 0"
                    >
                      {{ slot.time }} 
                      <span class="slot-availability" :class="{'slot-full': slot.available <= 0}">
                        (剩余: {{ slot.available }}座)
                      </span>
                    </el-radio>
                  </el-radio-group>
                </div>
                <div v-if="!formData.date" class="hint-text">
                  请先选择日期
                </div>
                <div v-else-if="availableSlots.length === 0 && !loading" class="hint-text">
                  加载时间段中...
                </div>
              </div>
              
              <!-- 人数选择 -->
              <div class="form-group">
                <label for="people">用餐人数</label>
                <el-input-number
                  v-model="formData.people"
                  :min="1"
                  :max="20"
                  :disabled="loading"
                  style="width: 100%"
                />
              </div>
              
              <!-- 备注 -->
              <div class="form-group">
                <label for="notes">备注 (可选)</label>
                <el-input
                  v-model="formData.notes"
                  type="textarea"
                  :rows="3"
                  placeholder="如有特殊需求，请在此说明"
                  :disabled="loading"
                />
              </div>
              
              <div v-if="error" class="error-message">
                {{ error }}
              </div>
              
              <el-button 
                type="primary" 
                native-type="submit" 
                :loading="loading" 
                :disabled="!isFormValid"
                class="submit-button"
              >
                提交预约
              </el-button>
            </form>
          </div>
        </div>
        
        <div class="reservation-info-container">
          <div class="card info-card">
            <h2>预约须知</h2>
            <ul class="info-list">
              <li>预约成功后，系统会显示预约确认信息</li>
              <li>如需取消预约，请至少提前2小时通知我们</li>
              <li>请按时到达，超过预约时间30分钟未到，预约将自动取消</li>
              <li>周末和节假日请提前2天预约</li>
              <li>如有任何疑问，请致电: 010-12345678</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 预约成功对话框 -->
    <el-dialog
      v-model="showSuccessDialog"
      title="预约成功"
      width="30%"
      center
    >
      <div class="success-dialog-content">
        <el-icon class="success-icon"><el-icon-check /></el-icon>
        <h3>您的预约已提交成功！</h3>
        <div class="reservation-details">
          <p><strong>日期:</strong> {{ formData.date ? formatDate(formData.date) : '' }}</p>
          <p><strong>时间:</strong> {{ formData.time }}</p>
          <p><strong>人数:</strong> {{ formData.people }} 人</p>
        </div>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="resetForm">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useReservationStore } from '../../stores/reservation'
import { ElMessage } from 'element-plus'

const router = useRouter()
const reservationStore = useReservationStore()

// 表单数据
const formData = ref({
  date: '',
  time: '',
  people: 2,
  notes: ''
})

const loading = ref(false)
const error = ref('')
const showSuccessDialog = ref(false)
const availableSlots = ref([])

// 表单验证
const isFormValid = computed(() => {
  return formData.value.date && formData.value.time && formData.value.people > 0
})

// 禁用过去的日期
const disabledDate = (time) => {
  return time.getTime() < Date.now() - 8.64e7 // 禁用今天之前的日期
}

// 日期格式化
const formatDate = (date) => {
  if (!date) return ''
  const d = new Date(date)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

// 日期变更处理
const handleDateChange = async (date) => {
  if (!date) {
    availableSlots.value = []
    return
  }
  
  // 获取选定日期的可用时段
  await reservationStore.fetchAvailableSlots(formatDate(date))
  availableSlots.value = reservationStore.availableSlots
  
  // 如果之前选择的时间段在新的可用时段中不可用，则清空选择
  if (formData.value.time) {
    const selectedSlot = availableSlots.value.find(slot => slot.time === formData.value.time)
    if (!selectedSlot || selectedSlot.available <= 0) {
      formData.value.time = ''
    }
  }
}

// 提交预约
const handleSubmit = async () => {
  if (!isFormValid.value) {
    error.value = '请填写所有必填字段'
    return
  }
  
  loading.value = true
  error.value = ''
  
  try {
    const reservationData = {
      date: formatDate(formData.value.date),
      time: formData.value.time,
      people: formData.value.people,
      notes: formData.value.notes
    }
    
    const success = await reservationStore.createReservation(reservationData)
    
    if (success) {
      showSuccessDialog.value = true
    } else {
      error.value = reservationStore.error || '预约失败，请稍后再试'
    }
  } catch (err) {
    error.value = '预约过程中发生错误'
    console.error(err)
  } finally {
    loading.value = false
  }
}

// 重置表单
const resetForm = () => {
  formData.value = {
    date: '',
    time: '',
    people: 2,
    notes: ''
  }
  showSuccessDialog.value = false
  availableSlots.value = []
}

// 移除跳转到我的预约页面的方法

// 组件挂载时获取可用时段
onMounted(() => {
  // 如果已经选择了日期，获取可用时段
  if (formData.value.date) {
    handleDateChange(formData.value.date)
  }
})
</script>

<style scoped>
.reservation-container {
  padding: 40px 0;
  min-height: 100vh;
  background-color: var(--light-gray);
}

.page-title {
  text-align: center;
  margin-bottom: 40px;
  color: var(--primary-color);
  font-size: 32px;
}

.reservation-content {
  display: flex;
  gap: 30px;
}

.reservation-form-container {
  flex: 2;
}

.reservation-info-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.card {
  background-color: white;
  border-radius: 8px;
  box-shadow: var(--box-shadow);
  padding: 24px;
  margin-bottom: 20px;
}

.card h2 {
  color: var(--primary-color);
  margin-bottom: 20px;
  font-size: 20px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.reservation-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
}

.time-slots {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
}

.slot-availability {
  font-size: 12px;
  color: var(--gray);
}

.slot-full {
  color: var(--danger);
}

.hint-text {
  font-size: 14px;
  color: var(--gray);
  margin-top: 8px;
}

.submit-button {
  margin-top: 20px;
  height: 40px;
}

.info-list {
  padding-left: 20px;
}

.info-list li {
  margin-bottom: 12px;
  line-height: 1.6;
}

.hours-info {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.hours-item h3 {
  color: var(--secondary-color);
  margin-bottom: 8px;
  font-size: 16px;
}

.hours-item p {
  margin-bottom: 4px;
}

.error-message {
  color: var(--danger);
  margin-top: 8px;
  font-size: 14px;
}

.success-dialog-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.success-icon {
  font-size: 48px;
  color: var(--success);
  margin-bottom: 16px;
}

.reservation-details {
  margin-top: 20px;
  text-align: left;
  width: 100%;
  padding: 16px;
  background-color: var(--light-gray);
  border-radius: 4px;
}

.reservation-details p {
  margin-bottom: 8px;
}

.dialog-footer {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 16px;
}

@media (max-width: 768px) {
  .reservation-content {
    flex-direction: column;
  }
}
</style>