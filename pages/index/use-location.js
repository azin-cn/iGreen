import {
  ref
} from 'vue'

import {
  onShow
} from '@dcloudio/uni-app'

import {
  getLocation
} from '@/utils/index.js';
import {
  getUserLocationScope
} from '@/utils/getSettingScope.js'

// useLocation
export default function useLocation() {
  const MapContext = uni.createMapContext('map');
  const markers = ref([]);
  const targetPos = {
    latitude: 39.92,
    longitude: 116.46
  };
  const points = ref([]);


  function navigateToMap() {
    console.log('navigateToMap');
    getUserLocationScope().then(() => {
      console.log(targetPos);
      uni.openLocation({
        latitude: targetPos.latitude,
        longitude: targetPos.longitude,
        success() {
          console.log('成功打开地图');
        },
        fail: console.log
      });
    });
  }

  function moveToLocation(lat, lon) {
    console.log('moveToLocation');
    getUserLocationScope()
      .then(() => {
        lat && lon ?
          MapContext.moveToLocation(lat, lon) :
          MapContext.moveToLocation();
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

  onShow(() => {
    // 重新获取位置权限
    getUserLocationScope()
      .then(getLocation)
      .then(res => {
        targetPos.latitude = res.latitudel;
        targetPos.longitude = res.longitude;
        MapContext.includePoints({
          points: [{
              latitude: res.latitude,
              longitude: res.longitude
            },
            {
              latitude: res.latitude + 0.007, //纬度
              longitude: res.longitude + 0.007 //经度
            },
            {
              latitude: res.latitude + 0.003, //纬度
              longitude: res.longitude + 0.005 //经度
            },
            {
              latitude: res.latitude + 0.005, //纬度
              longitude: res.longitude + 0.003 //经度
            }
          ],
          padding: [80, 80, 80, 80]
        });
        markers.value = [{
            id: 1,
            latitude: res.latitude + 0.007, //纬度
            longitude: res.longitude + 0.007, //经度
            width: 40,
            height: 40,
            iconPath: '/static/images/destination.png'
          },
          {
            id: 2,
            latitude: res.latitude + 0.005, //纬度
            longitude: res.longitude + 0.003, //经度
            width: 40,
            height: 40,
            iconPath: '/static/images/destination.png'
          },
          {
            id: 3,
            latitude: res.latitude + 0.003, //纬度
            longitude: res.longitude + 0.005, //经度
            width: 40,
            height: 40,
            iconPath: '/static/images/destination.png'
          }
        ];
      })
      .catch(console.log);
  })

  return {
    MapContext,
    markers,
    targetPos,
    points,
    navigateToMap,
    moveToLocation,
    markertap
  }
}
