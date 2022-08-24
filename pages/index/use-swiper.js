import {
  ref,
  watch
} from 'vue'
import {
  onLoad
} from '@dcloudio/uni-app'

import {
  getBanners
} from '@/api/api-index.js'


export default function useSwiper() {
  const list = ref([])
  const filterStyle = ref({})
  onLoad(() => {
    getBanners().then(res => {
      list.value = res.banners
    })
  })

  function onImageLoadedError(e) {
    console.log('轮播图加载失败，错误信息：', e)
  }

  return {
    list,
    filterStyle,
    onImageLoadedError
  }
}
