import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'
import qs from 'qs';
import Cookie from 'js-cookie'

// const baseURL = '/api'

const axios = Axios.create({
  timeout: 20000, // 请求超时 20s
  withCredentials: true //允许跨域
})

// 前置拦截器（发起请求之前的拦截）
axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    /**
     * 根据你的项目实际情况来对 config 做处理
     * 这里对 config 不做任何处理，直接返回
     */
    const lastTime = Number(localStorage.getItem('lastTime'))
    const nowTime = new Date().getTime()
    if (lastTime) {
      if ((nowTime - lastTime) / 60000 > 30) {
        //  store.commit('setRefreshLogin', true)
      }
    }
    localStorage.setItem('lastTime', nowTime + '')

    if (config.method === 'post') {
      config.data = {
        ...config.data,
        timestamp: new Date().getTime(),
        cookie: `MUSIC_U=${Cookie.get('MUSIC_U')};`
      }
    } else if (config.method === 'get') {
      config.params = {
        ...config.params,
        timestamp: new Date().getTime(),
        cookie: `MUSIC_U=${Cookie.get('MUSIC_U')};`
      }
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 后置拦截器（获取到响应时的拦截）
axios.interceptors.response.use(
  (response: AxiosResponse) => {
    /**
     * 根据你的项目实际情况来对 response 和 error 做处理
     * 这里对 response 和 error 不做任何处理，直接返回
     */
    return response
  },
  (error) => {
    if (error.response && error.response.data) {
      const code = error.response.status
      const msg = error.response.data.message
      ElMessage.error(`Code: ${code}, Message: ${msg}`)
      console.error(`[Axios Error]`, error.response)
    } else {
      ElMessage.error(`${error}`)
    }
    return Promise.reject(error)
  }
)

export default axios
