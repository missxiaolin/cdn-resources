import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { eslint } from 'rollup-plugin-eslint';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import { uglify } from 'rollup-plugin-uglify';
import { minify } from 'uglify-es';
// const path = require('path'); 

const configList = require('./rollup.config');

const ENV = process.env.NODE_ENV;

// const resolveFile = function(filePath) {
//   return path.join(__dirname, '../', filePath);
// };

import banner from 'rollup-plugin-banner'
const bannerStr = `(c) ${new Date().getFullYear()} GuaiShou ${new Date().toLocaleString()}`

const babelOptions = [
  resolve(),
  commonjs(),
  eslint({
    include: ['src/**'],
    exclude: ['node_modules/**']
  }),
  babel({
    exclude: 'node_modules/**',
    runtimeHelpers: true,
  }),
  replace({
    exclude: 'node_modules/**',
    ENV: JSON.stringify(ENV),
  }),
  (ENV === 'production' && uglify(minify)),
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