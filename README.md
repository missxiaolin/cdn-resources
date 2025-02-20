# Rollup 打包介绍

rollup 采用 es6 原生的模块机制进行模块的打包构建，rollup 更着眼于未来，对 commonjs 模块机制不提供内置的支持，是一款更轻量的打包工具。rollup 比较适合打包 js 的 sdk 或者封装的框架等，例如，vue 源码就是 rollup 打包的。而 webpack 比较适合打包一些应用，例如 SPA 或者同构项目等等。

## 安装 Rollup

通过下面的命令安装 [Rollup](https://www.rollupjs.com/guide/zh#introduction):

```bash
npm install --save-dev rollup
```

## Rollup 命令

1.rollup 默认打包文件命令 rollup -c or rollup -config 默认执行根目录下 rollup.config.js

```js
rollup - c;
// or
rollup - config;
```

2.rollup 打包文件，需要监听文件变更，自动打包，使用以下命令

```js
rollup - w - c;
```

## 创建配置文件

在 rollup 文件夹中创建一个新文件 rollup.config.js。之后在文件中添加下面的内容：

```js
export default {
  input: "src/main.js",
  output: {
    file: "dist/js/main.min.js",
    format: "umd",
    name: "bundle-name",
  },
};
```

下面是每一个配置选项都做了些什么：

- input —— 要打包的文件

- output.file —— 输出的文件 (如果没有这个参数，则直接输出到控制台)

- output.format —— Rollup 输出的文件类型 (amd, cjs, es, iife, umd)

> amd – 异步模块定义，用于像 RequireJS 这样的模块加载器
> cjs – CommonJS，适用于 Node 和 Browserify/Webpack
> es – 将软件包保存为 ES 模块文件
> iife – 一个自动执行的功能，适合作为`<script>`标签。（如果要为应用程序创建一个捆绑包，您可能想要使用它，因为它会使文件大小变小。）
> umd – 通用模块定义，以 amd，cjs 和 iife 为一体

- output.name --生成包名称，代表你的 iife/umd 包，同一页上的其他脚本可以访问它（iife/umd 没有 name 会报错的）

## 搭配 babel 7

rollup 的模块机制是 ES6 Modules，但并不会对 es6 其他的语法进行编译。因此如果要使用 es6 的语法进行开发，还需要使用 babel 来帮助我们将代码编译成 es5。

这种强需求，rollup 当然提供了解决方案。

### 安装模块

[rollup-plugin-babel](https://github.com/rollup/rollup-plugin-babel) 将 rollup 和 babel 进行了完美结合。

```bash
npm install --save-dev rollup-plugin-babel@latest
```

### 创建 .babelrc

```js
{
    "presets": [
      [
        "@babel/preset-env",
        {
          "modules": false
        }
      ]
    ]
}
```

### 更新 rollup.config.js

```js
import babel from "rollup-plugin-babel";

export default {
  plugins: [
    babel({
      exclude: "node_modules/**",
    }),
  ],
};
```

> 为了避免转译第三方脚本，我们需要设置一个 exclude 的配置选项来忽略掉 node_modules 目录

### babel 7 必要模块

```bash
npm install --save-dev @babel/core

npm install --save-dev @babel/preset-env
```

## ESLint 检查

在你的代码中使用 linter 无疑是十分好的决定，因为它会强制执行一致的编码规范来帮助你捕捉像是漏掉了括弧这种棘手的 bug。

在这个项目中，我们将会使用 ESLint。

### 安装模块

为了使用 ESLint，我们将要安装 [ESLint Rollup plugin](https://github.com/TrySound/rollup-plugin-eslint)

```js
npm install --save-dev rollup-plugin-eslint
```

### 生成一个 .eslintrc.json

为了确保我们只获取我们想要的错误，我们需要首先配置 ESLint。这里可以通过下面的代码来自动生成大多数配置：

```bash
./node_modules/.bin/eslint --init
```

### 更新 rollup.config.js

接下来，import ESLint 插件并将它添加到 Rollup 配置中：

```js
import eslint from "rollup-plugin-eslint";

export default {
  plugins: [
    eslint({
      exclude: [
        (throwOnError: true),
        (throwOnWarning: true),
        (include: ["src/**"]),
        (exclude: ["node_modules/**"]),
      ],
    }),
  ],
};
```

> eslint 插件有两个属性需要说明：throwOnError 和 throwOnWarning 设置为 true 时，如果在 eslint 的检查过程中发现了 error 或 warning，就会抛出异常，阻止打包继续执行（如果设置为 false，就只会输出 eslint 检测结果，而不会停止打包）

## 兼容 commonjs

npm 生态已经繁荣了多年，commonjs 规范作为 npm 的包规范，大量的 npm 包都是基于 commonjs 规范来开发的，因此在完美支持 es6 模块规范之前，我们仍旧需要兼容 commonjs 模块规范。

rollup 提供了插件 [rollup-plugin-commonjs](https://github.com/rollup/rollup-plugin-commonjs)，以便于在 rollup 中引用 commonjs 规范的包。该插件的作用是将 commonjs 模块转成 es6 模块。

rollup-plugin-commonjs 通常与 [rollup-plugin-node-resolve](https://github.com/rollup/rollup-plugin-node-resolve) 一同使用，后者用来解析依赖的模块路径。

### 安装模块

```bash
npm install --save-dev rollup-plugin-commonjs rollup-plugin-node-resolve
```

### 更新 rollup.config.js

```js
import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";

export default {
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    commonjs(),
    babel({
      exclude: "node_modules/**",
    }),
  ],
};
```

> 注意： jsnext 表示将原来的 node 模块转化成 ES6 模块，main 和 browser 则决定了要将第三方模块内的哪些代码打包到最终文件中。

## 替代环境变量

### 安装模块

[rollup-plugin-replace](https://github.com/rollup/rollup-plugin-replace) 本质上是一个用来查找和替换的工具。它可以做很多事，但对我们来说只需要找到目前的环境变量并用实际值来替代就可以了。（例如：在 bundle 中出现的所有 ENV 将被 "production" 替换）

```bash
npm install --save-dev rollup-plugin-replace
```

### 更新 rollup.config.js

配置很简单：我们可以添加一个 key:value 的配对表，key 值是准备被替换的键值，而 value 是将要被替换的值。

```js
import replace from "rollup-plugin-replace";

export default {
  plugins: [
    replace({
      ENV: JSON.stringify(process.env.NODE_ENV),
    }),
  ],
};
```

> 在我们的配置中找到每一个 ENV 并用 process.env.NODE_ENV 去替换，JSON.stringify 用来确保值是双引号的，不像 ENV 这样。

## 压缩 bundle

添加 UglifyJS 可以通过移除注上释、缩短变量名、重整代码来极大程度的减少 bundle 的体积大小 —— 这样在一定程度降低了代码的可读性，但是在网络通信上变得更有效率。

### 安装插件

用下面的命令来安装 [rollup-plugin-uglify](https://github.com/TrySound/rollup-plugin-uglify)：

```bash
npm install --save-dev rollup-plugin-uglify
```

### 更新 rollup.config.js

接下来，让我们在 Rollup 配置中添加 Uglify 。然而，为了在开发中使代码更具可读性，让我们来设置只在生产环境中压缩混淆代码：

```js
import uglify from "rollup-plugin-uglify";

export default {
  plugins: [process.env.NODE_ENV === "production" && uglify()],
};
```

> 这里使用了短路计算策略，只有在 NODE_ENV 设置为 production 时加载 uglify()。

## 单例完整配置（本项目不用）

rollup.config.js 配置

```js
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import { eslint } from "rollup-plugin-eslint";
import babel from "rollup-plugin-babel";
import replace from "rollup-plugin-replace";
import { uglify } from "rollup-plugin-uglify";

const packages = require("./package.json");

const ENV = process.env.NODE_ENV;

const paths = {
  input: {
    root: ENV !== "production" ? "example/index.js" : "src/index.js",
  },
  output: {
    root: ENV !== "production" ? "example/dist/" : "dist/",
  },
};

const fileNames = {
  development: `${packages.name}.js`,
  example: `example.js`,
  production: `${packages.name}.min.js`,
};

const fileName = fileNames[ENV];

export default {
  input: `${paths.input.root}`,
  output: {
    file: `${paths.output.root}${fileName}`,
    format: "umd",
    name: "bundle-name",
  },
  plugins: [
    resolve(),
    commonjs(),
    eslint({
      include: ["src/**"],
      exclude: ["node_modules/**"],
    }),
    babel({
      exclude: "node_modules/**",
      runtimeHelpers: true,
    }),
    replace({
      exclude: "node_modules/**",
      ENV: JSON.stringify(process.env.NODE_ENV),
    }),
    ENV === "production" && uglify(),
  ],
};
```

## 参考资料

[rollup.js wiki zh](rollup.js)

[如何通过 Rollup.js 打包 JavaScript](https://zhuanlan.zhihu.com/p/28096758)

[rollup 打包 js 的注意点](https://juejin.im/post/5beae896f265da61682aebae)

[babel 7 教程](https://blog.zfanw.com/babel-js/)

[S 打包工具 rollup——完全入门指南](https://segmentfault.com/a/1190000010628352#articleHeader15)

## :package: API 文档

### Array

#### &emsp;&emsp;[arrayEqual][arrayEqual]&emsp;&emsp;判断两个数组是否相等

### Class

#### &emsp;&emsp;[addClass][addClass]&emsp;&emsp;为元素添加 class

#### &emsp;&emsp;[hasClass][hasClass]&emsp;&emsp;判断元素是否有某个 class

#### &emsp;&emsp;[removeClass][removeClass]&emsp;&emsp;为元素移除 class

### Cookie

#### &emsp;&emsp;[getCookie][getCookie]&emsp;&emsp;根据 name 读取 Cookie

#### &emsp;&emsp;[removeCookie][removeCookie]&emsp;&emsp;根据 name 删除 Cookie

#### &emsp;&emsp;[setCookie][setCookie]&emsp;&emsp;添加 Cookie

### Device

#### &emsp;&emsp;[getExplore][getExplore]&emsp;&emsp;获取浏览器类型和版本号

#### &emsp;&emsp;[getOS][getOS]&emsp;&emsp;获取操作系统类型

### Dom

#### &emsp;&emsp;[getScrollTop][getScrollTop]&emsp;&emsp;获取滚动条距顶部的距离

#### &emsp;&emsp;[offset][offset]&emsp;&emsp;获取一个元素的距离文档(document)的位置，类似 jQ 中的 offset()

#### &emsp;&emsp;[scrollTo][scrollTo]&emsp;&emsp;在${duration}时间内，滚动条平滑滚动到${to}指定位置

#### &emsp;&emsp;[setScrollTop][setScrollTop]&emsp;&emsp;设置滚动条距顶部的距离

#### &emsp;&emsp;[windowResize][windowResize]&emsp;&emsp;H5 软键盘缩回、弹起回调

### Function

#### &emsp;&emsp;[debounce][debounce]&emsp;&emsp;函数防抖

#### &emsp;&emsp;[throttle][throttle]&emsp;&emsp;函数节流

### Keycode

#### &emsp;&emsp;[getKeyName][getKeyName]&emsp;&emsp;根据 keycode 获得键名

### Object

#### &emsp;&emsp;[deepClone][deepClone]&emsp;&emsp;深拷贝，支持常见类型

#### &emsp;&emsp;[isEmptyObject][isEmptyObject]&emsp;&emsp;判断 Object 是否为空

### Random

#### &emsp;&emsp;[randomColor][randomColor] &emsp;&emsp;随机生成颜色

#### &emsp;&emsp;[randomNum][randomNum]&emsp;&emsp;生成指定范围随机数

### Regexp

#### &emsp;&emsp;[isColor][isColor]&emsp;&emsp;判断是否为 16 进制颜色，rgb 或 rgba

#### &emsp;&emsp;[isEmail][isEmail]&emsp;&emsp;判断是否为邮箱地址

#### &emsp;&emsp;[isIdCard][isIdCard]&emsp;&emsp;判断是否为身份证号

#### &emsp;&emsp;[isPhoneNum][isPhoneNum]&emsp;&emsp;判断是否为手机号

#### &emsp;&emsp;[isUrl][isUrl]&emsp;&emsp;判断是否为 URL 地址

### String

#### &emsp;&emsp;[digitUppercase][digitUppercase]&emsp;&emsp;现金额转大写

### Support

#### &emsp;&emsp;[isSupportWebP][isSupportWebP]&emsp;&emsp;判断浏览器是否支持 webP 格式图片

####

### Time

#### &emsp;&emsp;[formatPassTime][formatPassTime]&emsp;&emsp;格式化${startTime}距现在的已过时间

#### &emsp;&emsp;[formatRemainTime][formatRemainTime]&emsp;&emsp;格式化现在距${endTime}的剩余时间

#### &emsp;&emsp;[isLeapYear][isLeapYear]&emsp;&emsp;判断是否为闰年

#### &emsp;&emsp;[isSameDay][isSameDay]&emsp;&emsp;判断是否为同一天

#### &emsp;&emsp;[timeLeft][timeLeft]&emsp;&emsp;计算${startTime - endTime}的剩余时间

#### &emsp;&emsp;[monthDays][monthDays]&emsp;&emsp;获取指定日期月份的总天数

### Url

#### &emsp;&emsp;[parseQueryString][parseQueryString]&emsp;&emsp;url 参数转对象

#### &emsp;&emsp;[stringfyQueryString][stringfyQueryString]&emsp;&emsp;对象序列化
