import api from '../create-api'
import apiConfig from '../apiConfig'

export const selectByConditionApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator/ipassengersTimes/selectByCondition',
    'post',
    arg
  )
}

export const selectCountByConditionApi = async arg => {
  return api(
    apiConfig.url,
    '/elevator/ipassengersTimes/selectCountByCondition',
    'post',
    arg
  )
}

export default {
  selectByConditionApi,
  selectCountByConditionApi
}
