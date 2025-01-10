class CancelAxios {
  // 请求队列
  // cancelList = []
  constructor() {
    this.cancelList = []
  }
  
  // 取消请求队列
  toCancel() {
    while(this.cancelList.length) {
      (this.cancelList.pop()).cancel('cancel request')
    }
    console.log('取消后的队列为', JSON.stringify(this.cancelList))
  }
  // 请求队列增加请求信息
  addCancel(source) {
    this.cancelList.push(source)
    console.log('新增某个请求后的请求队列', JSON.stringify(this.cancelList))
  }
  // 删除队列中指定的请求
  deleteCancel(cancelToken) {
    if(cancelToken) {
      let idx = this.cancelList.findIndex(source => source.token == cancelToken)
      if(idx > -1) {
        console.log('删除序列', idx)
        this.cancelList.splice(idx, 1)
      }
    }
    console.log('删除某个请求后的队列', JSON.stringify(this.cancelList))
  }
}
// 定义取消对象实例
CancelAxios.instance = null
// 单例化取消请求对象
CancelAxios.getCancelIns = function() {
  if(CancelAxios.instance) {
    return CancelAxios.instance
  }
  return new CancelAxios()
}
// 导出取消对象单例
export const cancelIns = CancelAxios.getCancelIns()