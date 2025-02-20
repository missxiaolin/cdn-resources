/**
 *
 * @desc 为元素移除class
 * @param {HTMLElement} ele
 * @param {String} cls
 */

import { hasClass } from "./hasClass";

function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    var reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
    ele.className = ele.className.replace(reg, " ");
  }
}
