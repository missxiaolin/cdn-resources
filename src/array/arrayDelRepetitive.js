/**
 *
 * @desc 数组去重
 * @param {Array} arr1 去重的对象
 * @param {Array} arr2 可以同时合并多个数组之后再去重
 * @return {Array}
 * eg: arrayDelRepetitive([1,2],[2,5],[3,5,9])  //  [1, 2, 5, 3, 9]
 */
export function arrayDelRepetitive(arr1, ...arr2) {
  return [...new Set(arr1.concat(...arr2))];
}
