function isObject(value) {
  const type = typeof value
  return value !== null && (type === 'object' || type === 'function')
}

function isArray(value) {
  const _isArray =
    Array.isArray ||
    (_arg => Object.prototype.toString.call(_arg) === '[object Array]')
  return _isArray(value)
}

export default class Lang {
  // 判断为空
  static isEmpty(value) {
    if (value === null || value === undefined) return true
    if (isObject(value)) return Object.keys(value).length === 0
    if (isArray(value)) return value.length === 0

    return false
  }
  // 判断不为空
  static isNotEmpty(value) {
    return !this.isEmpty(value)
  }
  // 浮点求和
  static sum(numbers, toFixed = 2) {
    let sum = 0
    for (const str of numbers) {
      if (!this.isNumber(str)) {
        return NaN
      }
      const num = parseFloat(str)
      if (isNaN(num)) {
        return NaN
      }
      sum += num
    }
    return sum.toFixed(toFixed)
  }
  // 数字判断
  static isNumber(value) {
    const patrn = /^[-+]?\d+(\.\d+)?$/
    return patrn.test(value)
  }

  // 数字判断
  static isPositiveNumber(value) {
    const patrn = /^[1-9]\d*$|^\.\d*$|^0\.\d*$|^[1-9]\d*\.\d*$|^0$/
    return patrn.test(value)
  }
  // 数组判断
  static isArray(o) {
    return Object.prototype.toString.call(o) === '[object Array]'
  }
  // 事件转日期
  static convertTimestapeToDay(timestape) {
    return timestape.substring(0, timestape.indexOf(' ')).replace(/-/g, '.')
  }

  // 格式化日期
  static dateFormat(date, fmt) {
    date = new Date(date)
    const o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds(),
      'q+': Math.floor((date.getMonth() + 3) / 3),
      S: date.getMilliseconds()
    }
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        (date.getFullYear() + '').substr(4 - RegExp.$1.length)
      )
    }

    for (let k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length == 1
            ? o[k]
            : ('00' + o[k]).substr(('' + o[k]).length)
        )
      }
    }
    return fmt
  }

  // 判断是否是手机号
  static isPhoneNumber(tel) {
    var reg = /^0?1[3|4|5|6|7|8][0-9]\d{8}$/
    return reg.test(tel)
  }
}
