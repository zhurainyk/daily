import api from '../create-api'
import apiConfig from '../apiConfig'

export const selectByAllApi = async arg => {
  //根据实体类拿全量数据
  return api(
    apiConfig.url,
    '/cache/icache/getTableDataMap',
    'post',
    arg,
    null,
    false
  )
}

export const selectByAllDataApi = async arg => {
  //根据实体类拿全量数据
  return api(
    apiConfig.url,
    '/cache/icache/getTableData',
    'post',
    arg,
    null,
    false
  )
}

export const selectByAllTypeApi = async arg => {
  //拿常量数据
  return api(
    apiConfig.url,
    '/cache/icache/getConstMap',
    'post',
    arg,
    null,
    false
  )
}

/**
 *
 * @param serverName
 * @param tableName
 * @param urlName
 * @param multipartFiles
 * @returns
 */
export const uploadIOFilesApi = async arg => {
  //拿常量数据
  return api(
    apiConfig.url,
    '/oss/ibucket/uploadIOFiles',
    'post',
    arg,
    null,
    false
  )
}

/**
 *
 * @param serverName
 * @param tableName
 * @param urlName
 * @param multipartFile
 * @returns
 */
export const uploadIOFileApi = async arg => {
  //拿常量数据
  return api(
    apiConfig.url,
    '/oss/ibucket/uploadIOFile',
    'post',
    arg,
    null,
    false
  )
}

export const getPropCompanyApi = async arg => {
  //获取有权限的procompany
  return api(
    apiConfig.url,
    '/elevator/ipropCompany/getMapByProjectAuth',
    'post',
    arg,
    null,
    false
  )
}

export const getMaintCompanyApi = async arg => {
  //获取有权限的procompany
  return api(
    apiConfig.url,
    '/elevator_supplychain/imaintCompany/getMapByProjectAuth',
    'post',
    arg,
    null,
    false
  )
}

export default {
  selectByAllApi,
  selectByAllTypeApi,
  uploadIOFilesApi,
  uploadIOFileApi,
  getPropCompanyApi,
  getMaintCompanyApi
}
