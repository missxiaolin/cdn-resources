/**
 *
 * @desc 对象数组去重
 * @param {Array} arr
 * @param {String} 对象中相同的关键字(如id)
 * @return {Array}
 */
export function objArrayDelRepetitive(arr, key) {
  const map = new Map();
  return arr.filter((x) => !map.has(x[key]) && map.set(x[key], true));
}
