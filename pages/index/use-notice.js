import {
  ref
} from 'vue'
import {
  onLoad
} from '@dcloudio/uni-app'
import {
  getNotices
} from '@/api/api-index'

export default function useNotice() {
  const notices = ref([])

  onLoad(() => {
    getNotices().then(res => {
      notices.value = res.notices
    })
  })
  
  return {
    notices
  }
}
