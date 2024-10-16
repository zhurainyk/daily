import AES from 'crypto-js/aes'
import Utf8 from 'crypto-js/enc-utf8'

const HASH_RE = /#/g // %23
const AMPERSAND_RE = /&/g // %26
const SLASH_RE = /\//g // %2F
const EQUAL_RE = /=/g // %3D
const IM_RE = /\?/g // %3F
const PLUS_RE = /\+/g // %2B
const ENC_BRACKET_OPEN_RE = /%5B/g // [
const ENC_BRACKET_CLOSE_RE = /%5D/g // ]
const ENC_CARET_RE = /%5E/g // ^
const ENC_BACKTICK_RE = /%60/g // `
const ENC_CURLY_OPEN_RE = /%7B/g // {
const ENC_PIPE_RE = /%7C/g // |
const ENC_CURLY_CLOSE_RE = /%7D/g // }
const ENC_SPACE_RE = /%20/g // }

const commonEncode = text => {
  return encodeURI(`${text}`)
    .replace(ENC_PIPE_RE, '|')
    .replace(ENC_BRACKET_OPEN_RE, '[')
    .replace(ENC_BRACKET_CLOSE_RE, ']')
}
const decode = text => {
  try {
    return decodeURIComponent(`${text}`)
  } catch (err) {
    console.log(`Error decoding "${text}". Using original value`)
  }
  return `${text}`
}

const encodeQueryValue = text => {
  return (
    commonEncode(text)
      // Encode the space as +, encode the + to differentiate it from the space
      .replace(PLUS_RE, '%2B')
      .replace(ENC_SPACE_RE, '+')
      .replace(HASH_RE, '%23')
      .replace(AMPERSAND_RE, '%26')
      .replace(ENC_BACKTICK_RE, '`')
      .replace(ENC_CURLY_OPEN_RE, '{')
      .replace(ENC_CURLY_CLOSE_RE, '}')
      .replace(ENC_CARET_RE, '^')
  )
}

const encodeQueryKey = text => {
  return encodeQueryValue(text).replace(EQUAL_RE, '%3D')
}
export const parseQueryVz = search => {
  const query = {}
  // avoid creating an object with an empty key and empty value
  // because of split('&')
  if (search === '' || search === '?') return query
  search = AES.decrypt(search, 'violettkwl').toString(Utf8)
  const hasLeadingIM = search[0] === '?'
  const searchParams = (hasLeadingIM ? search.slice(1) : search).split('&')
  for (let i = 0; i < searchParams.length; ++i) {
    // pre decode the + into space
    const searchParam = searchParams[i].replace(PLUS_RE, ' ')
    // allow the = character
    const eqPos = searchParam.indexOf('=')
    const key = decode(eqPos < 0 ? searchParam : searchParam.slice(0, eqPos))
    const value = eqPos < 0 ? null : decode(searchParam.slice(eqPos + 1))
    if (key in query) {
      // an extra variable for ts types
      let currentValue = query[key]
      if (!Array.isArray(currentValue)) {
        currentValue = query[key] = [currentValue]
      }
      currentValue.push(value)
    } else {
      query[key] = value
    }
  }

  return query
}

export const stringifyQueryVz = query => {
  let search = ''
  for (let key in query) {
    const value = query[key]
    key = encodeQueryKey(key)
    if (value == null) {
      // only null adds the value
      if (value !== undefined) {
        search += (search.length ? '&' : '') + key
      }
      continue
    }
    // keep null values
    const values = Array.isArray(value)
      ? value.map(v => v && encodeQueryValue(v))
      : [value && encodeQueryValue(value)]
    values.forEach((value: any) => {
      if (value !== undefined) {
        // only append & with non-empty search
        search += (search.length ? '&' : '') + key
        if (value != null) search += `=${value}`
      }
    })
  }
  return AES.encrypt(search, 'violettkwl').toString()
}

export default { parseQueryVz, stringifyQueryVz }
