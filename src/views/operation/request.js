
// options
import { Message } from 'element-ui';
import {postAjax} from '@/utils/ajax'
export const stopOrEnableRequest = (options, callback) => {
  postAjax({
    url: options.url,
    data: options.data,
  }).then(res=> {
    if(res.code === 1) {
      callback && callback()
      Message.success(options.successText)
    }else {
      Message.error('失败')
    }
  })
}