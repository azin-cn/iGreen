"use strict";
var common_vendor = require("../common/vendor.js");
function getSettingScope(scope) {
  let content = scope;
  switch (scope) {
    case "camera":
      content = "\u6444\u50CF\u5934";
      break;
    case "record":
      content = "\u9EA6\u514B\u98CE";
      break;
    case "userLocation":
      content = "\u4F4D\u7F6E";
      break;
  }
  scope = `scope.${scope}`;
  content = `\u8BF7\u524D\u5F80\u8BBE\u7F6E\u9875\u6388\u4E88${content}\u6743\u9650`;
  const options = {
    scope,
    content
  };
  return new Promise((resolve, reject) => {
    common_vendor.index.getSetting({
      success: (res) => {
        let auth = res.authSetting[options.scope];
        console.warn(`${options.scope} = ${auth}`);
        switch (auth) {
          case true:
            resolve(true);
            break;
          case false:
            common_vendor.index.showModal({
              title: "\u6388\u6743\u63D0\u793A",
              content: options.content,
              success: (res2) => {
                if (res2.confirm) {
                  common_vendor.index.openSetting({
                    success: (settingRes) => {
                      if (settingRes.authSetting[options.scope]) {
                        resolve(true);
                      }
                      console.warn("settingRes", settingRes);
                    }
                  });
                }
                if (res2.cancel) {
                  common_vendor.index.showModal({
                    title: "\u60A8\u5DF2\u53D6\u6D88\u6388\u6743",
                    content: "\u9700\u8981\u6388\u6743\u624D\u53EF\u6B63\u5E38\u8FD0\u884C",
                    showCancel: false
                  });
                }
              }
            });
            break;
          default:
            common_vendor.index.authorize({
              scope: options.scope,
              success() {
                resolve(true);
              },
              fail(err) {
                reject(false);
              }
            });
        }
      },
      fail: reject
    });
  });
}
async function getSettingScopes(scopes) {
  return Promise.all(scopes.map((scope) => {
    return getSettingScope(scope);
  }));
}
function getUserLocationScope() {
  return getSettingScope("userLocation");
}
exports.getSettingScopes = getSettingScopes;
exports.getUserLocationScope = getUserLocationScope;
