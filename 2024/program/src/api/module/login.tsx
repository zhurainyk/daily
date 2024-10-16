import api from '../create-api'
import apiConfig from '../apiConfig'

/**
 *
 * @param {partNumber} arg
 * @returns
 */
export const getLoginApi = async arg => {
  return api(
    apiConfig.url,
    '/usercenter/ilogin/login',
    'post',
    arg,
    null,
    false
  )
}

export const getUserAuthByTokenApi = async arg => {
  return api(apiConfig.url, '/usercenter/ilogin/getAuthActionList', 'post', arg)
}

export const getNAvigationByTokenApi = async arg => {
  return api(
    apiConfig.url,
    '/usercenter/ilogin/getNavigationLogin',
    'post',
    arg
  )
}

export const logoutByTokenApi = async arg => {
  return api(apiConfig.url, '/usercenter/ilogin/logout', 'post', arg)
}

export const getUserMapLoginApi = async arg => {
  // 获取直属上级list
  return api(apiConfig.url, '/usercenter/ilogin/getUserMapLogin', 'post', arg)
}

export const getUserTreeMapLoginApi = async arg => {
  // 获取直属上级treelist
  return api(apiConfig.url, '/usercenter/ilogin/getUserTreeLogin', 'post', arg)
}

export const getDepartmentMapLoginApi = async arg => {
  // 部门list
  return api(
    apiConfig.url,
    '/usercenter/ilogin/getDepartmentMapLogin',
    'post',
    arg
  )
}

export const getProjectMapLoginApi = async arg => {
  // 项目list
  return api(
    apiConfig.url,
    '/usercenter/ilogin/getProjectMapLogin',
    'post',
    arg
  )
}

export const getLoginUserInfoApi = async arg => {
  // 项目list
  return api(apiConfig.url, '/usercenter/ilogin/getLoginUserInfo', 'post', arg)
}

export const getPropCompanyMapLoginApi = async arg => {
  // 人与物业公司
  return api(
    apiConfig.url,
    '/usercenter/ilogin/getPropCompanyMapLogin',
    'post',
    arg
  )
}

export const getMaintCompanyMapLoginApi = async arg => {
  // 人与维保公司
  return api(
    apiConfig.url,
    '/usercenter/ilogin/getMaintCompanyMapLogin',
    'post',
    arg
  )
}

export const getInsuCompanyMapLoginApi = async arg => {
  // 人与保险公司
  return api(
    apiConfig.url,
    '/usercenter/ilogin/getInsuCompanyMapLogin',
    'post',
    arg
  )
}

export const getLoginUserProPropCompAuthApi = async arg => {
  // 项目与物业公司
  return api(
    apiConfig.url,
    '/usercenter/ilogin/getLoginUserProPropCompAuth',
    'post',
    arg
  )
}

export const getLoginUserProMaintCompAuthApi = async arg => {
  // 项目与维保公司
  return api(
    apiConfig.url,
    '/usercenter/ilogin/getLoginUserProMaintCompAuth',
    'post',
    arg
  )
}

export const getLoginUserProInsuCompAuthApi = async arg => {
  // 项目与保险公司
  return api(
    apiConfig.url,
    '/usercenter/ilogin/getLoginUserProInsuCompAuth',
    'post',
    arg
  )
}

export const getPermissionTreeApi = async arg => {
  return api(
    apiConfig.url,
    '/usercenter/ilogin/getPermissionTree',
    'post',
    arg,
    null,
    false
  )
}

export const getLoginUserAllInfoApi = async arg => {
  return api(
    apiConfig.url,
    '/usercenter/iaccount/userDetailsService',
    'post',
    arg
  )
}

export const updateLoginUserInfoApi = async arg => {
  return api(apiConfig.url, '/usercenter/iaccount/updateSelfInfo', 'post', arg)
}

export const getPropUserByCompanyAuthApi = async arg => {
  // 有权限的物业公司下的物业人员
  return api(
    apiConfig.url,
    '/usercenter/iaccount/getPropUserByCompanyAuth',
    'post',
    arg
  )
}

export const getEnginUserMByCompanyAuthApi = async arg => {
  // 有权限的维保公司下的工程经理
  return api(
    apiConfig.url,
    '/usercenter/iaccount/getEnginUserMByCompanyAuth',
    'post',
    arg
  )
}

export const getEnginUserByCompanyAuthApi = async arg => {
  // 有权限的维保公司下的工程人员
  return api(
    apiConfig.url,
    '/usercenter/iaccount/getEnginUserByCompanyAuth',
    'post',
    arg
  )
}

export const getInsuUserByCompanyAuthApi = async arg => {
  // 有权限的维保公司下的工程人员
  return api(
    apiConfig.url,
    '/usercenter/iaccount/getInsuUserByCompanyAuth',
    'post',
    arg
  )
}

export const getSecuUserByCompanyAuthApi = async arg => {
  // 有权限的物业公司下的物业人员
  return api(
    apiConfig.url,
    '/usercenter/iaccount/getSecuUserByCompanyAuth',
    'post',
    arg
  )
}

export default {
  getLoginApi,
  getUserAuthByTokenApi,
  getNAvigationByTokenApi,
  logoutByTokenApi,
  getUserMapLoginApi,
  getDepartmentMapLoginApi,
  getProjectMapLoginApi,
  getLoginUserInfoApi,

  getPropCompanyMapLoginApi,
  getMaintCompanyMapLoginApi,
  getInsuCompanyMapLoginApi,
  getLoginUserProPropCompAuthApi,
  getLoginUserProMaintCompAuthApi,
  getLoginUserProInsuCompAuthApi,
  getPermissionTreeApi,
  updateLoginUserInfoApi,
  getLoginUserAllInfoApi,

  getPropUserByCompanyAuthApi,
  getEnginUserMByCompanyAuthApi,
  getEnginUserByCompanyAuthApi,
  getInsuUserByCompanyAuthApi,
  getSecuUserByCompanyAuthApi
}
