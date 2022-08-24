import {
  ref
} from 'vue'
import {
  onLoad
} from '@dcloudio/uni-app'
import {
  getBriefInfo,
  login
} from '@/api/api-index';

const extension = [{
  icon: 'icon-tongji',
  color: '#764831',
  bg: '#FFEBE0'
}, {
  icon: 'icon-pingjiacishu',
  color: '#486091',
  bg: '#E9ECFF'
}]

export default function useBriefInfo() {
  // useBreifInfo
  const recycleBriefInfo = ref([]);

  function onRefresh() {
    getBriefInfo().then(res => {
      recycleBriefInfo.value = res.recycleBriefInfo.map((info, index) => ({
        ...info,
        ...extension[index]
      }))
    })
  }

  onLoad(onRefresh)

  return {
    recycleBriefInfo,
    onRefresh
  }
}
