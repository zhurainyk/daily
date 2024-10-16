import config from '../../config/index'
const isProd = process.env.NODE_ENV === JSON.parse(config.build.env.NODE_ENV)

const apiUrl = {
  url: '',
  socketUrl: ''
}

export default apiUrl
