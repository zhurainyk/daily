import 'intersection-observer'
// import { track } from './sendData'

// 节流时间调整，默认100ms
IntersectionObserver.prototype['THROTTLE_TIMEOUT'] = 300    

export default class Exposure {
  constructor(maxNum = 20) {
    this.cacheDataArr = []
    this.maxNum = maxNum
    this._timer = 0
    this._observer = null
    this.init()
  }

  /**
   * 初始化
   */
  init() {
    const self = this
    // 边界处理
    this.trackFromLocalStorage()
    this.beforeLeaveWebview()

    // 实例化监听
    this._observer = new IntersectionObserver(function(entries, observer) {
      entries.forEach((entry) => {
        // 出现在视窗中
        if (entry.isIntersecting) {
          // 清除当前定时器
          clearInterval(this._timer)

          // 获取参数
          const tp = entry.target.attributes['track-params'].value
          // 收集参数统一上报，减少网络请求
          self.cacheDataArr.push(tp)
          // 曝光之后取消观察
          self._observer.unobserve(entry.target)

          if (self.cacheDataArr.length >= self.maxNum) {
            self.track()
          } else {
            self.storeIntoLocalStorage(self.cacheDataArr)
            if (self.cacheDataArr.length > 0) {
              // 2秒上报一次
              self._timer = setInterval(function() {
                self.track()
              }, 2000)
            }
          }
        }
      })
    },
    {
      root: null,
      rootMargin: '0px',
      threshold: 0.5 // 元素出现面积，0 - 1，这里当元素出现一半以上则进行曝光
    })
  }

  /**
   * 给元素添加监听
   * @param {Element} entry 
   */
  add(entry) {
    this._observer && this._observer.observe(entry.el)
  }

  /**
   * 埋点上报
   */
  track() {
    const trackData = this.cacheDataArr.splice(0, this.maxNum)
    track(trackData)
    // 更新localStoragee
    this.storeIntoLocalStorage(this.cacheDataArr)
  }

  /**
   * 存储到localstorage, 防止在设定上报时间内用户退出
   * @param { Arrary } data 
   */
  storeIntoLocalStorage(data) {
    window.localStorage.setItem('cacheTrackData', data)
  }

  /**
   * 首次进入先获取localStorage中的数据，也就是用户上次退出未上报的数据
   */
  trackFromLocalStorage() {
    const cacheData = window.localStorage.getItem('cacheTrackData')
    if (cacheData) {
      track(cacheData)
    }
  }

  /**
   * 用户退出系统时调用方法，需要和客户端同学协商注册事件
   */
  beforeLeaveWebview() {
    // 客户端自定义事件监听上报
  }
}
// 点击类click.js
// 用户的点击行为没有曝光行为频繁，所以简单处理，每次点击进行埋点上报。
// import { track } from './sendData'

// export default class Click {
//   add(entry) {
//     const tp = entry.el.attributes['track-params'].value
//     entry.el.addEventListener('click', function() {
//       track(tp)
//     })
//   }
// }

function track(params) {
   // 这里自己封装fetch或者axios，在拦截器中实现公共参数上报
  console.log(`Track data to server ${config.serverUrl}: ${JSON.stringify(params)}`)
}