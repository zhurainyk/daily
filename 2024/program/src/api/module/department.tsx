import api from '../create-api'
import apiConfig from '../apiConfig'

export const getDepartmentTreeLoginApi = async arg => {
  return api(
    apiConfig.url,
    '/usercenter/ilogin/getDepartmentTreeLogin',
    'post',
    arg
  )
}

export const saveApi = async (arg, file?: any) => {
  return api(
    apiConfig.url,
    '/usercenter/idepartment/save',
    'post',
    arg,
    null,
    true,
    file
  )
}

export const updateByIdApi = async (arg, file?: any) => {
  return api(
    apiConfig.url,
    '/usercenter/idepartment/updateById',
    'post',
    arg,
    null,
    true,
    file
  )
}

export const deleteByIdApi = async arg => {
  return api(
    apiConfig.url,
    '/usercenter/idepartment/deleteById',
    'post',
    arg,
    null,
    false
  )
}

export const selectByIdApi = async arg => {
  return api(
    apiConfig.url,
    '/usercenter/idepartment/selectById',
    'post',
    arg,
    null,
    false
  )
}

export const deleteListApi = async arg => {
  return api(
    apiConfig.url,
    '/usercenter/idepartment/deleteList',
    'post',
    arg,
    null,
    false
  )
}

export default {
  saveApi,
  updateByIdApi,
  deleteByIdApi,
  deleteListApi,
  getDepartmentTreeLoginApi
}
