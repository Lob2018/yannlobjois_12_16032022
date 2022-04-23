/**
 *Returns the maximum or minimum value of an object array by passing its key
 * @name getMinMaxObjectValueOfObjectInArray
 * @module
 * @param {array} objectArray - The object's array
 * @param {string} key - The object's key refrence
 * @param {number} minOrMax - The desired result as minimum (-1) or maximum (others values)
 * @returns {string|Number|boolean} - The minimum or maximum value found
 */
export function getMinMaxObjectValueOfObjectInArray(
    objectArray,
    key,
    minOrMax
) {
    return objectArray.reduce(function(prev, curr) {
        if (minOrMax === -1) {
            return prev[key] < curr[key] ? prev : curr
        } else {
            return prev[key] > curr[key] ? prev : curr
        }
    })[key]
}