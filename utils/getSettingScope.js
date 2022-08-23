export const CAMERA_SCOPE = 'camera'
export const RECORD_SCOPE = 'record'
export const LOCATION_SCOPE = 'location'


export function getSettingScope(scope) {

  let content = scope
  switch (scope) {
    case 'camera':
      content = '摄像头'
      break;
    case 'record':
      content = '麦克风'
      break;
    case 'userLocation':
      content = '位置'
      break;
  }
  scope = `scope.${scope}`
  content = `请前往设置页授予${content}权限`

  const options = {
    scope: scope,
    content: content,
  };

  return new Promise((resolve, reject) => {
    uni.getSetting({
      success: (res) => {
        let auth = res.authSetting[options.scope];
        console.warn(`${options.scope} = ${auth}`);

        switch (auth) {
          case true /* 若已授权 */ :
            resolve(true);
            break;

          case false /* 未授权 */ :
            uni.showModal({
              title: "授权提示",
              content: options.content,
              success: (res) => {
                if (res.confirm) {
                  uni.openSetting({
                    success: (settingRes) => {
                      if (settingRes.authSetting[options.scope]) {
                        resolve(true);
                      }
                      console.warn("settingRes", settingRes);
                    }
                  });
                }
                if (res.cancel) {
                  uni.showModal({
                    title: '您已取消授权',
                    content: '需要授权才可正常运行',
                    showCancel: false
                  })
                }
              },
            });
            break;


          default:
            /* undefined */
            uni.authorize({
              scope: options.scope,
              success() {
                resolve(true);
              },
              fail(err) {
                reject(false)
              },
            });
        }
      },
      fail: reject
    });
  });
}


export async function getSettingScopes(scopes) {
  return Promise.all(
    scopes.map(scope => {
      return getSettingScope(scope)
    })
  )
}
