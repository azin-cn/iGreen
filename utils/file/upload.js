export function upload(url, formName, filePath, options = {}) {
  return new Promise((resolve, reject) => {
    uni.uploadFile({
      url,
      name: formName,
      filePath,
      formData: {},
      success: resolve,
      fail: reject,
      ...options
    });
  });
}

export function uploadFiles(url, files, options) {
  const target = files.map(file =>
    upload(url, file.formName, file.path, options)
  );
  return Promise.all(target);
}

export default upload;
