import {
  ref
} from 'vue'
import {
  onLaunch
} from '@dcloudio/uni-app'

export default function useOpeartion() {
  // useOrderIcon
  const orderOperation = ref([]);
  const phoneNumber = ref('');


  function operationClick(key) {
    console.log('operationClick');
    switch (key) {
      case '__online__':
        console.log('__online__page');
        break;
      case '__phone__':
        uni.makePhoneCall({
          phoneNumber: phoneNumber.value
        });
        break;
    }
  }

  onLaunch(() => {
    orderOperation.value = [{
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
    phoneNumber.value = '15768281747'
  })


  return {
    orderOperation,
    phoneNumber,
    operationClick
  }
}
