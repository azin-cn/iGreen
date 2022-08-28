"use strict";
var api_config = require("../../api/config.js");
require("../../common/vendor.js");
function submitOrder(order) {
  api_config._request("/user/order", {
    method: "POST",
    data: {
      order
    }
  });
}
exports.submitOrder = submitOrder;
