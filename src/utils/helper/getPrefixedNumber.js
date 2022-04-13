/**
 * Add the corresponding prefix to a rounded number over 999
 * @module
 * @param {number} num - The number
 * @param {number} digits - The desired digits to diplay
 * @returns {string} - The corresponding prefix of the number
 */
export function getPrefixedNumber(num, digits) {
  num = Math.round(num)
  if (num < 1000) return num
  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'k' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'G' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' },
  ]
  //  \. for the separator, * 0 for 0 or more, + for one or more
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
  // Find if there is a lookup
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value
    })
  return item
    ? (num / item.value).toFixed(digits).replace('.', ',') + item.symbol
    : '0'
}
