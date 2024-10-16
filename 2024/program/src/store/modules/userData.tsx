import { User } from '../../module.ts/user'
export const state = function () {
  return {
    userInfo: new User(),
    isLogin: false,
    type: ''
  }
}
