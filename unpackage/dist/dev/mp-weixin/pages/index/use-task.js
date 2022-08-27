"use strict";
var common_vendor = require("../../common/vendor.js");
var utils_index = require("../../utils/index.js");
var api_apiIndex = require("../../api/api-index.js");
const icons = [
  {
    key: "map",
    icon: "icon-dingwei-map",
    color: "#20AAE9"
  },
  {
    key: "phone",
    icon: "icon-dianhua",
    color: "#07AF72"
  },
  {
    key: "edit",
    icon: "icon-bianjishuru-xianxing",
    color: "#FBAA01"
  },
  {
    key: "del",
    icon: "icon-shanchu",
    color: "#F95959"
  }
];
function useTask() {
  const tasks = common_vendor.ref([]);
  function taskIconClick(taskid, key) {
    const task = tasks.value.find((task2) => task2.id === taskid);
    switch (key) {
      case "map":
        utils_index.openLocation(task.latitude, task.longitude, {
          address: task.address
        });
        break;
      case "phone":
        utils_index.makePhoneCall(task.employerPhone);
        break;
    }
  }
  common_vendor.onLoad(() => {
    api_apiIndex.getEmployeeTasks(1).then((res) => {
      tasks.value = res.tasks.map((task) => (task.icons = icons, task));
    });
  });
  return {
    tasks,
    taskIconClick
  };
}
exports.useTask = useTask;
