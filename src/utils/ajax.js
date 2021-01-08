import request from './request'

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

export {
  getAjax,
  postAjax,
}