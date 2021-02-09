import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import qs from 'qs'

const ajax = (options) => {
  options.url = process.env.VUE_APP_BASE_API + options.url
  let assignOptions = Object.assign({
    time: 60000,
    withCredentials: true,
    headers: {
      'X-Token': getToken(),
      'Content-Type': 'application/json'
    },
  }, options)
  return new Promise((resolve, reject)=> {
    axios(assignOptions).then(res=> {
      if(res.status === 200) {
        let resdata = res.data
        console.log(resdata)
        const resdataCode = resdata.code
        if(resdataCode === 1) {
          resolve(resdata)
        }else if (resdataCode === 0) {
          resolve(resdata)
        }else if(resdataCode !== 1) {
          Message({
            message: resdata.message || 'Error',
            type: 'error',
            duration: 5 * 1000
          })
          if (resdataCode === 50008 || resdataCode === 50012 || resdataCode === 50014) {
            // to re-login
            MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
              confirmButtonText: 'Re-Login',
              cancelButtonText: 'Cancel',
              type: 'warning'
            }).then(() => {
              store.dispatch('user/resetToken').then(() => {
                location.reload()
              })
            })
          }
          return reject(new Error(resdata.message || 'Error'))
        }else {
          reject(resdata)
        }
      }else {
        reject(res)
      }
      
    }).catch(error=> {
      console.log('err' + error) // for debug
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
      reject(error)
    })
  })
}



// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 60000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['X-Token'] = getToken()
    }
    if (config.method === 'post' || config.method === 'POST') {
      config.transformRequest = [(data) => {
        const datas = qs.stringify(data)
        return datas
      }]
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    // console.log(res)
    // if the custom code is not 1, it is judged as an error.
    if(res.code === 1) {
      return res
    }else if(res.code === 0) {
      return res
    } else if (res.code !== 1) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return Promise.reject(new Error(res.message || 'Error'))
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default ajax
