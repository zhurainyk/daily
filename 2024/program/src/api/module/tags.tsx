import api from '../create-api'
import apiConfig from '../apiConfig'

/**
 *
 * @param {partNumber} arg
 * @returns
 */
export const getTagsApi = async (arg, file?: any) => {
  return api(apiConfig.url, '/elevator/itagLib/getTagLib', 'post', arg)
}

export default {
  getTagsApi
}
