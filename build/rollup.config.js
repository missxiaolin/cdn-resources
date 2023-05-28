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
    exportsList.push(fileNode);
});

module.exports = exportsList;


