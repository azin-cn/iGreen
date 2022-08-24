import {
  ref
} from 'vue'
import {
  onLoad
} from '@dcloudio/uni-app'
import {
  getNearbyInfo
} from '@/api/api-index'

export default function useNearByInfo() {
  const nearbyRecycleList = ref([])

  onLoad(() => {
    getNearbyInfo().then(res => {
      nearbyRecycleList.value = res.nearbyRecycleList
    })
  })

  return {
    nearbyRecycleList
  }
}
