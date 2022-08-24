import {
  ref,
  nextTick
} from 'vue'

import {
  onLoad
} from '@dcloudio/uni-app'

import {
  getLocation,
  openLocation
} from '@/utils/index.js';
import {
  getUserLocationScope
} from '@/utils/getSettingScope.js'
import {
  getStoreMarkers
} from '@/api/api-index';

// useLocation
export default function useLocation() {
  const MapContext = ref(null);
  const markers = ref([]);
  const targetPos = {
    latitude: 39.92,
    longitude: 116.46,
    address: '北京市'
  };
  const points = ref([]);


  function navigateToMap() {
    console.log('navigateToMap');
    getUserLocationScope().then(() => {
      openLocation(targetPos.latitude, targetPos.longitude, {
        address: '目的地'
      })
    });
  }

  function moveToLocation(lat, lon) {
    console.log('moveToLocation');
    getUserLocationScope()
      .then(() => {
        lat && lon ?
          MapContext.value.moveToLocation(lat, lon) :
          MapContext.value.moveToLocation();
      })
      .catch(console.log);
  }

  function markertap(e) {
    const {
      markerId
    } = e;
    const marker = markers.value.filter(marker => {
      const flag = marker.id === markerId;
      marker.iconPath = flag ?
        '/static/images/selected.png' :
        '/static/images/destination.png';
      return flag;
    })[0];
    targetPos.latitude = marker.latitude;
    targetPos.longitude = marker.longitude;
  }

  // 获取位置
  const p1 = getUserLocationScope()
    .then(getLocation)
    .then(res => {
      targetPos.latitude = res.latitude;
      targetPos.longitude = res.longitude;
    })
    .catch(console.log);

  const p2 = getStoreMarkers().then(res => {
    const target = res.markers.map(marker => ({
      ...marker,
      id: 10000 * Math.random(), // 必须是Number
      width: 40,
      height: 40,
      iconPath: '/static/images/destination.png'
    }))
    markers.value = target
    MapContext.value.includePoints({
      points: target,
      padding: [80, 80, 80, 80]
    });
  })

  onLoad(async () => {
    await nextTick() // 等待更新完成
    MapContext.value = getApp().globalData.MapContext
    Promise.allSettled([p1, p2])
  })

  return {
    markers,
    targetPos,
    points,
    navigateToMap,
    moveToLocation,
    markertap
  }
}
