/** Same semantics as first-portfolio: `a`/`b` can be in any order. */
export function clamp(value: number, a: number, b: number) {
  const min = Math.min(a, b)
  const max = Math.max(a, b)
  return Math.min(Math.max(value, min), max)
}

export function toFixed(value: number, n = 1) {
  const str = value.toFixed(n)
  if (str.includes('.')) {
    return str.replace(/\.?0+$/, '')
  }
  return str
}

/** Matches first-portfolio: `inChinese` switches 万/亿-style shortening for large numbers. */
export function prettifyNumber(n: number, inChinese = false): string {
  if (inChinese) {
    if (Math.abs(n) >= 100000000) {
      return toFixed(n / 100000000) + '亿'
    }
    if (Math.abs(n) >= 10000) {
      return toFixed(n / 10000) + '万'
    }
    return Intl.NumberFormat('en-US').format(n)
  }

  if (Math.abs(n) >= 1000000) {
    return toFixed(n / 1000000) + 'm'
  }
  if (Math.abs(n) >= 1000) {
    return toFixed(n / 1000) + 'k'
  }
  return Intl.NumberFormat('en-US').format(n)
}
