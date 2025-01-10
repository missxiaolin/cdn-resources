/**
 * 对象数组模糊查询
 * @param  {Array}  list     原数组
 * @param  {String} field    对应字段
 * @param  {String} keyWord  查询的关键词
 * @return {Array}           查询的结果
 * eg: fuzzyQuery([{key:123},{key:62},{key:7}], 'key', 2)  // [{key:123},{key:62}]
 */
export function fuzzyQuery(list, field, keyWord) {
  var reg = new RegExp(keyWord);
  var arr = [];
  for (var i = 0; i < list.length; i++) {
    if (reg.test(list[i][field])) {
      arr.push(list[i]);
    }
  }
  return arr;
}
