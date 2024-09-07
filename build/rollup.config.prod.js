import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { eslint } from 'rollup-plugin-eslint';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
// import { uglify } from 'rollup-plugin-uglify';
// import { minify } from 'uglify-es';
// 查看构建后的文件大小
import filesize from 'rollup-plugin-filesize'
// 代码压缩
import { terser } from 'rollup-plugin-terser';
// const path = require('path'); 

const configList = require('./rollup.config');

const ENV = process.env.NODE_ENV;

// const resolveFile = function(filePath) {
//   return path.join(__dirname, '../', filePath);
// };

import banner from 'rollup-plugin-banner'
const bannerStr = `(c) ${new Date().getFullYear()} xiaolin ${new Date().toLocaleString()}`

const babelOptions = [
  resolve(),
  filesize(),
  commonjs(),
  terser({ compress: { drop_console: true } }),
  eslint({
    include: ['src/**'],
    exclude: ['node_modules/**']
  }),
  babel({
    // exclude: 'node_modules/**',
    runtimeHelpers: true,
    "presets": [
      [
          "@babel/preset-env",
          {
              "modules": false,
              // "useBuiltIns": "usage",
              // "corejs": "2.6.10",
              "targets": {
                  "ie": 10
              }
          }
      ]
    ],
    "plugins": [
        "transform-remove-console",
    ],
    "ignore": [
        "node_modules/**"
    ],
    "exclude": 'node_modules/**',
  }),
  replace({
    exclude: 'node_modules/**',
    ENV: JSON.stringify(ENV),
  }),
  // (ENV === 'production' && uglify(minify)),
  banner(bannerStr)
];

configList.map(config => {
  config.external = ['lodash', 'vue', 'js-cookie', 'axios', 'moment'];
  config.output.sourcemap = false;
  config.output.format = 'umd';
  config.plugins = [
    ...babelOptions,
  ];
  return config;
});

module.exports = configList;