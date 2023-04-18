// (c) 2023 Lin 2023/4/18 下午1:53:14
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.test = factory());
}(this, (function () { 'use strict';

    function test() {
      console.log(1);
    }
    var test$1 = {
      test: test
    };

    return test$1;

})));
