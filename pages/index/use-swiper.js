import {
  ref,
  watch
} from 'vue'
import {
  onLoad
} from '@dcloudio/uni-app'


export default function useSwiper() {
  const list = ref([])
  const swiperStyle = ref({})
  onLoad(() => {
    list.value = [
      'https://img95.699pic.com/photo/50057/6130.jpg_wh860.jpg',
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.jj20.com%2Fup%2Fallimg%2F1011%2F010QG05111%2F1F10Q05111-3.jpg&refer=http%3A%2F%2Fpic.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1663587958&t=5dace1914c2c0ed542afa978768625ce',
      'https://ts1.cn.mm.bing.net/th/id/R-C.fbfef5524ae308b00ac20a343b6950d5?rik=z5HC4Mr3h94Z%2bA&riu=http%3a%2f%2fwww.szjieneng.com%2fDgProject%2fSystemManage%2fFiles%2f201904%2f0b7850c4-3f49-498f-9e02-90fdf5db9951.png&ehk=JLUyK9TcV01Au8I%2fvuOzoqK3%2fS2NnYhpriIs1HnDk%2b0%3d&risl=&pid=ImgRaw&r=0'
    ]
  })

  return {
    list,
    swiperStyle
  }
}
