import axios from "axios";

export default class Fetch {
  // 默认静态变量
  constructor(axiosOptions, Options) {
    this.axiosOptions = axiosOptions;
    this.Options = Options;
    this.axiosService = axios.create(this.axiosOptions);
    this.interceptors();
  }

  defaultOption() {
    return {
      baseURL: ``,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    };
  }

  interceptors() {
    // request拦截器
    this.axiosService.interceptors.request.use(
      (config) => {
        // 动态 headers
        if (
          this.Options &&
          this.Options.dynamicHeader &&
          typeof this.Options.dynamicHeader === "function"
        ) {
          let dynamicHeader = {};
          try {
            dynamicHeader = this.Options.dynamicHeader(config);
          } catch (error) {
            //
          }
          // 暂存headers  是主动传参入的
          Object.assign(config.headers, dynamicHeader);
          let h = config.headers || {}
          config.headers = Object.assign(h, dynamicHeader);
        }
        // 抛出 request config 请求数据
        this.callFun(this.Options.succesRequest, config, this.Options);

        return config;
      },
      (error) => {
        console.log(error);
        // 抛出 request 错误
        this.callFun(this.Options.errorRequest, error);
        return Promise.reject(error);
      }
    );

    // respone拦截器
    this.axiosService.interceptors.response.use(
      (response) => {
        // 抛出 response 成功请求数据
        this.callFun(this.Options.succesResponse, response);
        return Promise.resolve(response.data);
        // return responseData;
      },
      (error) => {
        // 抛出 response error 请求数据
        this.callFun(this.Options.errorResponse, error);
        return Promise.reject(error);
      }
    );
  }

  callFun(fun, backMsg, Options) {
    if (typeof fun === "function") {
      // console.log('callFun---', typeof fun);
      return fun(backMsg, Options);
    }
  }
}
