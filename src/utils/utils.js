class util {
  /**
   * 获取window（优先微服务）
   * eg：vite项目中，构建script的type为module，导致无法拦截location操作
   * @returns
   */
  getRelWindow() {
    return window.microApp || window.rawWindow || window;
  }

  /**
   * 微服务内使用location跳转页面
   * eg：vite项目中，构建script的type为module，导致无法拦截location操作
   * @returns
   */
  microToHref(url) {
    if (!url) return;
    return (this.getRelWindow().location.href = url);
  }

  /**
   * 获取文件后缀类型
   * @param {*} filePath
   * @returns
   */
  fileExtension(filePath) {
    // 获取最后一个.的位置
    var index = filePath.lastIndexOf(".");
    // 获取后缀
    var type = filePath.substr(index + 1);
    // 返回类型
    return type.toLowerCase();
  }

  /**
   * 字符串是否包含字母
   * @param {*} str
   * @returns
   */
  hasLetter(str) {
    if (!str) {
      return false;
    }
    for (let i in str) {
      let asc = str.charCodeAt(i);
      if ((asc >= 65 && asc <= 90) || (asc >= 97 && asc <= 122)) {
        return true;
      }
    }
    return false;
  }

  /**
   * 获取当前页面的缩放值
   * @returns
   */
  detectZoom() {
    let ratio = 0;
    let screen = window.screen;
    let ua = navigator.userAgent.toLowerCase();

    if (window.devicePixelRatio !== undefined) {
      ratio = window.devicePixelRatio;
    } else if (~ua.indexOf("msie")) {
      if (screen.deviceXDPI && screen.logicalXDPI) {
        ratio = screen.deviceXDPI / screen.logicalXDPI;
      }
    } else if (
      window.outerWidth !== undefined &&
      window.innerWidth !== undefined
    ) {
      ratio = window.outerWidth / window.innerWidth;
    }
    if (ratio) {
      ratio = Math.round(ratio * 100);
    }
    return ratio;
  }

  /**
   * 获取当前缩放比例
   * @returns
   */
  getZoom() {
    const width =
      document.documentElement.clientWidth || document.body.clientWidth;
    return 1 / (width / window.screen.width);
  }

  /**
   * uuid
   * @returns
   */
  uuid() {
    let s = [];
    let hexDigits = "0123456789abcdef";
    for (let i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
    s[8] = s[13] = s[18] = s[23] = "-";

    let uuidA = s.join("");
    return uuidA;
  }

  /**
   * @param {*} file
   * @returns
   */
  analysisFile(file) {
    return new Promise(function (resolve, reject) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const data = e.target.result;
        let datajson = XLSX.read(data, {
          type: "binary",
        });
        const result = [];
        datajson.SheetNames.forEach((sheetName) => {
          result.push({
            sheetName: sheetName,
            sheet: XLSX.utils.sheet_to_json(datajson.Sheets[sheetName]),
          });
        });
        resolve(result);
      };
      reader.readAsBinaryString(file.file);
    });
  }

  /**
   * @returns
   */
  envjudge() {
    var isMobile = window.navigator.userAgent.match(
      /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    ); // 是否手机端
    var isWx = /micromessenger/i.test(navigator.userAgent); // 是否微信
    var isComWx = /wxwork/i.test(navigator.userAgent); // 是否企业微信

    if (isComWx && isMobile) {
      // 手机端企业微信
      return "com-wx-mobile";
    } else if (isComWx && !isMobile) {
      // PC端企业微信
      return "com-wx-pc";
    } else if (isWx && isMobile) {
      // 手机端微信
      return "wx-mobile";
    } else if (isWx && !isMobile) {
      // PC端微信
      return "wx-pc";
    } else {
      return "other";
    }
  }

  /**
   * 是不移动端
   * @returns
   */
  isMobile() {
    let flag =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    return flag;
  }

  /**
   *
   * @param {String} humpStr 驼峰字符串 如 helloWord
   * @returns 转换为下划线字符串 hello_word
   */
  toLine(humpStr) {
    return humpStr.replace(/([A-Z])/g, "_$1").toLowerCase();
  }

  /**
   * 二维数组合并单元格（仅针对数组对象本身）
   * @param data 接口返回的数组对象
   * @param field 指定合并选项为数组对象的某个属性值
   * @param colArr 需要合并列的下标
   * @returns mergeCells单元格合并规则
   */
  parseMergeCell(data, field, colArr) {
    let mergeCells = [];
    let repeatVal = "";
    let rowspan = 1;
    for (let i = 0; i < data.length; i++) {
      let { [field]: fieldVal } = data[i];
      if (repeatVal === fieldVal) {
        rowspan++;
      } else {
        repeatVal = fieldVal;
        rowspan = 1;
      }
      if (rowspan > 1) {
        const row = i - rowspan + 1;
        for (let j = 0; j < colArr.length; j++) {
          // {
          //   row: 行下标,
          //   col: 列下标,
          //   rowspan: 合并行数,
          //   colspan: 合并列数
          // }
          let mergeObj = mergeCells.find(
            (item) => item.row === row && item.col === colArr[j]
          );
          if (mergeObj) {
            mergeObj.rowspan = rowspan;
          } else {
            mergeCells.push({ row, col: colArr[j], rowspan, colspan: 1 });
          }
        }
      }
    }
    return mergeCells;
  }

  /**
   * @param {*} cname 
   * @returns 
   */
  getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") c = c.substring(1);
      if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
  }
  
  /**
   * @param {*} cname 
   * @param {*} cvalue 
   * @param {*} exSeconds 
   */
  setCookie (cname, cvalue, exSeconds) {
    var d = new Date();
    d.setTime(d.getTime() + exSeconds * 1000);
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires + ";path=/";
  }
  
  /**
   * @param {*} cname 
   */
  deleteCookie(cname) {
    var d = new Date();
    d.setTime(d.getTime() - 1 * 24 * 60 * 60 * 1000);
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=''; " + expires + ";path=/";
  }
}

export const {
  getRelWindow,
  microToHref,
  hasLetter,
  detectZoom,
  getZoom,
  uuid,
  analysisFile,
  envjudge,
  isMobile,
  toLine,
  parseMergeCell,
  getCookie,
  setCookie,
  deleteCookie
} = new util();
