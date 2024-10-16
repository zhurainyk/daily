import Cookies from 'js-cookie'

export function getToken(arg) {
  return Cookies.get(arg)
}

export function setToken(arg, token) {
  return Cookies.set(arg, token)
}

export function removeToken(arg) {
  if (arg) {
    return Cookies.remove(arg)
  } else {
    return Cookies.remove()
  }
}
