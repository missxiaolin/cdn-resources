const path = require('path'); 
const fs = require('fs');
const FilesList = fs.readdirSync(path.resolve(__dirname, "../src"));
const resolveFile = (filePath) => path.resolve(__dirname, "../", filePath);

let exportsList = [];
const isPrdEnv = process.env.NODE_ENV === 'production';
// 遍历组件
FilesList.forEach(file => {
    // 过滤文件夹
    if(!file.includes('.js')) return;
    const basename = path.basename(file, ".js");
    const fileNode = {
      input: resolveFile(`src/${file}`),
      output: {
        file: isPrdEnv ? `dist/${file}` : `example/dist/${file}`,
        name: basename
      }
    };
    // 主要 Util 和 Fetch
    if(basename === 'cdnFetch'){
      fileNode.output.globals = {
        'axios': 'axios'
      };
    }
    if(basename === 'cdnPrototype'){
      fileNode.output.globals = {
        'js-cookie': 'Cookies',
        'axios': 'axios',
        'oment': 'Moment',
        'lodash': 'Lodash'
      };
    }
    // if(basename === 'cdnTrack'){
    //   fileNode.output.globals = {
    //     'axios': 'axios'
    //   };
    // }
    // if(basename === 'cmuTrack'){
    //   fileNode.output.globals = {
    //     'axios': 'axios'
    //   };
    // }

    exportsList.push(fileNode);
});

module.exports = exportsList;
