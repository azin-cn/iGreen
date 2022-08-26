import {
  ref,
  computed,
} from 'vue'
import {
  makePhoneCall
} from '@/utils/index.js'

import {
  navigateTo
} from '@/utils/router'

export default function useOpeartion() {
  // useOrderIcon
  const {
    isWorker,
    phoneNumber
  } = getApp().globalData

  const orderOperation = computed(() => {
    return isWorker.value ? [{
      name: '工作台面',
      key: '__work__',
      icon: 'icon-gongzuotai-daikexiadan',
      color: '#07AF72',
      bg: '#DCF7E1'
    }, {
      name: '详细信息',
      key: '__detail__',
      icon: 'icon-yuyuejilu',
      color: '#FBAA01',
      bg: '#FEF1C7'
    }] : [{
        name: '在线预约',
        key: '__online__',
        icon: 'icon-gongzuotai-daikexiadan',
        color: '#07AF72',
        bg: '#DCF7E1'
      },
      {
        name: '电话预约',
        key: '__phone__',
        icon: 'icon-dianhuatianchong',
        color: '#FBAA01',
        bg: '#FEF1C7'
      }
    ];
  })


  function operationClick(key) {
    console.log('operationClick');
    switch (key) {
      case '__online__':
        navigateTo('/pages/order/index')
        break;
      case '__phone__':
        makePhoneCall(phoneNumber.value)
        break;
      case '__work__':
        console.log('__work__');
        break;
      case '__detail__':
        console.log('__detail__')
        break;
    }
  }

  return {
    orderOperation,
    operationClick
  }
}
