export function isObject(value) {
  const type = typeof value

  return value != null && (type === 'object' || type === 'function')
}

export function debounce(func, wait = speed * 1000, immediate = true) {
  let timer = null

  return function anonymous(...params) {
    const now = immediate && !timer

    clearTimeout(timer)
    timer = setTimeout(() => {
      timer = null
      !immediate ? func.call(this, ...params) : null
    }, wait)
    now ? func.call(this, ...params) : null
  }
}

export function throttle(func, wait = 500) {
  let timer = null
  let previous: any = 0 // 记录上一次操作时间

  return function anonymous(...params) {
    const now: any = new Date()
    const remaining = wait - (now - previous)

    if (remaining <= 0) {
      clearTimeout(timer)
      timer = null
      previous = now
      func.call(this, ...params)
    }
    if (remaining > 0 && !timer) {
      timer = setTimeout(() => {
        clearTimeout(timer)
        timer = null
        previous = new Date()
        func.call(this, ...params)
      }, remaining)
    }
  }
}
export default throttle
