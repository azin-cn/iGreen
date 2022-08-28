import { _request } from '@/api/config.js';
import request from '@/utils/request.js';

export function submitOrder(order) {
  _request('/user/order', {
    method: 'POST',
    data: {
      order
    }
  });
}
