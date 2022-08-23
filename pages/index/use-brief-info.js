import {
  ref
} from 'vue'

import {
  onLaunch
} from '@dcloudio/uni-app'

export default function useBriefInfo() {
  // useBreifInfo
  const recycleBriefInfo = ref([]);

  function onRefresh() {
    console.log('onRefresh');
  }


  onLaunch(() => {
    recycleBriefInfo.value = [{
        name: '回收重量',
        icon: 'icon-tongji',
        count: '0',
        unit: 'KG',
        color: '#764831',
        bg: '#FFEBE0'
      },
      {
        name: '参与次数',
        icon: 'icon-pingjiacishu',
        count: '0',
        unit: '次',
        color: '#486091',
        bg: '#E9ECFF'
      }
    ]
  })

  return {
    recycleBriefInfo,
    onRefresh
  }
}
