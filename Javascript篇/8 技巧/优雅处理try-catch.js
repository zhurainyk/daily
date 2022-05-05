/**
 * @param { Promise } 传进去的请求函数
 * @param { Object= } errorExt - 拓展错误对象
 * @return { Promise } 返回一个Promise
 */
export function to(
  promise,
  errorExt
) {
  return promise
    .then(data => [null, data])
    .catch(err => {
      if (errorExt) {
        const parsedError = Object.assign({}, err, errorExt)
        return [parsedError, undefined]
      }

      return [err, undefined]
    })
}

export default to


//例子：

const handleLogin = async () => {
  const [resErr, res] = await to(request('/basic/login', {
    usename: 'sunshine',
    password: '123456'
  }))
  if (resErr) {
    // fail do somthing
    return
  }
  const [userErr, info] = await to(request('/basic/getuserinfo', {
    id: res.id
  }))
  if (userErr) {
    // fail do somthing
    return
  }
  this.userInfo = info
}

