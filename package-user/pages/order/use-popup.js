import { ref } from 'vue';

export default function usePopup() {
  const popupRef = ref(null);
  const popup = ref({
    type: 'error',
    message: '出现错误',
    duration: 2000
  });

  function showMessage(type, message, duration = 2000) {
    type = type || popup.value.type; // hbuilderx格式化js有问题，不支持||= ，type || = popup.value.type; //
    message = message || popup.value.message;
    duration = duration || popup.value.duration;
    popup.value = {
      type,
      message,
      duration
    };
    popupRef.value.open();
  }

  return {
    popupRef,
    popup,
    showMessage
  };
}
