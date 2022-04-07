/**
 * Returns a rectangular SVG path, corresponding to the given coordinates (with or without a specified radius)
 * @param {number} x - The horizontal coordinate of the upper-left corner of the rectangle
 * @param {number} y - The vertical coordinate of the upper-left corner of the rectangle
 * @param {number} w - The width of the rectangle
 * @param {number} h - The height of the rectangle
 * @param {number} r - The radius value in pixels
 * @param {object} radius - The booleans to turn the rectangle's radius angle on (true) or off (false) - tr is for the rectangle's top right, bl for bottom left, etc.)
 * @returns {object} - The SVG path
 */
export function svgRoundedRectanglePath(x, y, w, h, r, radius) {
  var retval
  retval = 'M' + (x + r) + ',' + y
  retval += 'h' + (w - 2 * r)
  if (radius.tr) {
    retval += 'a' + r + ',' + r + ' 0 0 1 ' + r + ',' + r
  } else {
    retval += 'h' + r
    retval += 'v' + r
  }
  retval += 'v' + (h - 2 * r)
  if (radius.br) {
    retval += 'a' + r + ',' + r + ' 0 0 1 ' + -r + ',' + r
  } else {
    retval += 'v' + r
    retval += 'h' + -r
  }
  retval += 'h' + (2 * r - w)
  if (radius.bl) {
    retval += 'a' + r + ',' + r + ' 0 0 1 ' + -r + ',' + -r
  } else {
    retval += 'h' + -r
    retval += 'v' + -r
  }
  retval += 'v' + (2 * r - h)
  if (radius.tl) {
    retval += 'a' + r + ',' + r + ' 0 0 1 ' + r + ',' + -r
  } else {
    retval += 'v' + -r
    retval += 'h' + r
  }
  retval += 'z'
  return retval
}
