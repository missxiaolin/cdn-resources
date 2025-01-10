/*
 * @Author: xiaolin
 * @Date: 2025-09-07 14:08:32
 * @FilePath: /cdn-js/src/utils/messageMitt.js
 * @Description: 消息队列
 */
export default class messageMitt {
  constructor(Options) {
    const { MessageBox, Message = (() => {}) } = Options;
    this.queue = [];
    this.isTiping = false;
    this.$alert = MessageBox && MessageBox.alert || (() => {});
    this.$message = Message;
  }
  add (options, type = "alert") {
    const { message } = options;
    const hasSomeData = this.queue.filter(item => {
      const { options, type: qType } = item || {};
      return options.message == message && qType == type;
    });
    if (!hasSomeData.length) {
      this.queue.push({ options, type })
    }
    if (!this.isTiping) {
      this.isTiping = true;
      this.msgRender()
    }
  }
  remove () {
    this.queue.splice(0, 1);
    this.msgRender();
  }
  msgRender () {
    if (this.queue.length) {
      const { options, type } = this.queue[0];
      const { message, callback, onClose } = options
      switch (type) {
        case "prompt":
          break;
        case "confirm":
          break;
        case "message":
          this.$message({ ...options, onClose: () => {
            this.remove();
            onClose && onClose();
          } });
          break;
        default:
          this.$alert(`${message}`, {
            ...options,
            callback: (action, instance) => {
              this.remove();
              callback && callback(action, instance);
            },
          });
          break;
      }
    } else {
      this.isTiping = false;
    }
  }
}