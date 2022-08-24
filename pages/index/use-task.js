import {
  ref
} from 'vue'
import {
  onShow,
  onLoad
} from '@dcloudio/uni-app'
import {
  openLocation,
  makePhoneCall
} from '@/utils/index.js'

import {
  getEmployeeTasks
} from '@/api/api-index.js'

const icons = [{
    key: 'map',
    icon: 'icon-dingwei-map',
    color: '#20AAE9',
  },
  {
    key: 'phone',
    icon: 'icon-dianhua',
    color: '#07AF72'
  },
  {
    key: 'edit',
    icon: 'icon-bianjishuru-xianxing',
    color: '#FBAA01'
  },
  {
    key: 'del',
    icon: 'icon-shanchu',
    color: '#F95959'
  }
]

export default function useTask() {
  const tasks = ref([]);

  function taskIconClick(taskid, key) {
    const task = tasks.value.find(task => task.id === taskid)
    switch (key) {
      case 'map':
        openLocation(task.latitude, task.longitude, {
          address: task.address
        })
        break;
      case 'phone':
        makePhoneCall(task.employerPhone)
        break;
      case 'edit':
        break;
      case 'del':
        break;
    }
  }

  onLoad(() => {
    // const result = await getEmployeeTasks()
    getEmployeeTasks(1).then((res) => {
      tasks.value = res.tasks.map(task => (task.icons = icons, task))
    })
  })

  return {
    tasks,
    taskIconClick
  }
}
