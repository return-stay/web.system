import request from './request'
import { Message } from 'element-ui';
const getAjax = (data) => {
  return request({
    ...data,
    method: 'get',
  })
}


const postAjax = (data) => {
  return request({
    ...data,
    method: 'post',
  })
}

const fdAjax = (options) => {
  let fd = new FormData()
  if(options.data) {
    let odata = options.data
    for (const key in odata) {
      if (Object.hasOwnProperty.call(odata, key)) {
        const element = odata[key];
        fd.append(key, element)
      }
    }
  }
  return request({
    ...options,
    formdata: true,
    data: fd,
    headers: {
      'Content-Type': 'multipart/form-data', // 关键
    },
    method: 'post',
  })
}


const stopOrEnableRequest = (options, callback) => {
  postAjax({
    url: options.url,
    data: options.data,
  }).then(res=> {
    if(res.code === 1) {
      callback && callback(res)
      if(options.successText) {
        Message.success(options.successText)
      }
    }else {
      Message.error('失败')
    }
  })
}

export {
  getAjax,
  postAjax,
  fdAjax,
  stopOrEnableRequest,
}