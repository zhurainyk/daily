import axios from 'axios'
import qs from 'qs'
import { ElMessage, ElLoading } from 'element-plus'
import { getToken, setToken } from '../utils/auth'
import configIndex from '../../config/index'

const retry = 4
const retryDelay = 1000
axios.defaults.headers.common['Content-Encoding'] =
  'gzip,compress,deflate,identity'
axios.defaults.headers['Content-Type'] = 'multipart/form-data'
axios.defaults.headers.ClientType = '01'
let tempUrlJson = ''
let socketUrl = ''
let singleOne = null
// 存储每个请求的唯一标识
const pendingMap = new Map()
let loadingCount = 0
let loadingInstance: any = null
axios.interceptors.request.use(
  // 请求拦截
  config => {
    const token = getToken(configIndex.build.token)
    if (token) {
      config.headers.authorization = token
    }
    if (config.data && config.data instanceof FormData) {
      if (!config.data.get('noloading')) {
        addLoading()
      }
    } else if (config.data && !config.data.noloading) {
      addLoading()
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
const getFormData = object =>
  Object.keys(object).reduce((formData, key) => {
    formData.append(key, object[key])
    return formData
  }, new FormData())
axios.interceptors.response.use(
  // 回复拦截，主要针对部分回掉数据状态码进行处理
  response => {
    if (response.data.token) {
      setToken(configIndex.build.token, response.data.token)
    }
    // if(response.data.data){//因为所以的接口都是json的对象，需要统一处理
    //   response.data.data=JSON.parse(response.data.data)
    // }
    closeLoading()
    return response
  },
  error => {
    closeLoading()
    if (error.response.status == 403) {
      const sotre = localStorage.getItem('tkwl')
      if (sotre) {
        const tempObj = JSON.parse(sotre)
        if (tempObj.user.userInfo.type == '1') {
          window.open(`/tkwl/login?type=${tempObj.user.type}`, '_self')
        } else {
          window.open(`/`, '_self')
        }
      } else {
        window.open('/', '_self')
      }
      return Promise.reject({ code: 403, data: { success: false } })
    } else if (error.response.status == 401) {
      ElMessage.error('没有权限')
      return Promise.reject({ code: 401, data: { success: false } })
    } else if (error.response.status == 405) {
      if (singleOne) {
      } else {
        singleOne = ElMessage.error('系统升级中，请稍后再试')
        setTimeout(() => {
          singleOne = null
        }, 5000)
      }

      return Promise.reject({ code: 405, data: { success: false } })
    } else {
      ElMessage.error('网络状态不正常' + error.response.status)
    }
    // 下面从新请求，如果请求api失败
    return Promise.reject({
      code: 501,
      data: {
        success: false,
        message: '服务繁忙,请重试' + error.response.status
      }
    })
  }
)
function getPendingKey(config: any): string {
  let { url, method, data } = config

  // config.data里面返回的是个字符串对象
  if (typeof data === 'string') {
    data = JSON.parse(data)
  }
  return [url, method, JSON.stringify(data)].join('&')
}
function addLoading() {
  loadingCount++
  if (loadingCount > 0) {
    // 开启loading
    if (!loadingInstance) {
      loadingInstance = ElLoading.service({
        fullscreen: true,
        background: 'rgba(122, 122, 122, 0.3)',
        text: '加载中.......'
      })
    }
  }
}

function closeLoading() {
  if (loadingCount > 0) {
    loadingCount--
  }
  if (loadingCount <= 0) {
    if (loadingInstance) {
      loadingInstance.close()
      loadingInstance = null
    }
  }
}
const apiAxios = async (
  baseURL: string,
  url: any,
  method: string,
  data: any = {},
  config: any = null,
  isCommonApi = true,
  file: any = null
) => {
  if (tempUrlJson) {
  } else {
    const tempurl: any = await axios.get('/json/api.json')
    if (tempurl.data.apiurl) {
      socketUrl = tempurl.data.websocketurl
      tempUrlJson = tempurl.data.apiurl
    }
  }
  if (!tempUrlJson) {
    return Promise.reject({
      code: 501,
      data: { success: false, message: `api url null   ${tempUrlJson}` }
    })
  }
  url = encodeURI(url)
  let axiosObj = url
  let response
  let params = {}
  let token = getToken(configIndex.build.token)
  if (data.token) {
    token = data.token
    delete data.token
  }
  if (config && config.token) {
    token = config.token
    delete config.token
  }
  if (config && config.noloading) {
    addLoading()
  }

  if (isCommonApi) {
    if (data) {
      data = { jsonData: JSON.stringify(data) }
    }
  }
  data = { ...data, token }
  if (file) {
    data = { ...data, ...file }
  }
  params = { _t: +new Date() }
  if (method) {
    axiosObj = {
      method,
      url,
      baseURL: baseURL || tempUrlJson,
      params,
      data: data,
      ...config
    }
  }
  // axiosObj.paramsSerializer= function (params) {
  //   return qs.stringify(params, { arrayFormat: 'repeat' });
  // }
  // axiosObj.transformRequest=function(data){
  //   data = qs.stringify(data);
  //   return data;
  // }
  if (!!config && !!config.isFormData) {
    // 是不是表单提交
    axiosObj.transformRequest = function (data) {
      data = qs.stringify(data)
      return data
    }
  }
  try {
    // axios.defaults.headers['content-type'] = 'application/json;charset=UTF-8'
    response = await axios(axiosObj)
  } catch (error: any) {
    response = { code: 501, ...error, data: { success: false } }
  }
  return response
}

function retryApi(config) {
  if (!config || !retry) return Promise.reject(config)
  config.__retryCount = config.__retryCount || 0
  config.maxRedirects = config.maxRedirects || 0
  if (config.maxRedirects >= retry) {
    return Promise.reject({ code: 501, data: { success: false } })
  }
  config.__retryCount += 1
  config.maxRedirects += 1
  const backoff = new Promise(function (resolve) {
    setTimeout(function () {
      resolve({})
    }, retryDelay || 1)
  })
  return backoff.then(function () {
    return axios(config)
  })
}
export { socketUrl,tempUrlJson }
export default apiAxios
