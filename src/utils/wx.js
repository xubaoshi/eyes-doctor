import tips from './tips';
import wepy from 'wepy';

export default class WxUtils {

  static wxPay(param) {
    return new Promise((resolve, reject) => {
      wepy.requestPayment({
        ...param,
        complete: res => {
          if (res.errMsg == 'requestPayment:ok') {
            resolve(res);
          } else {
            reject(res);
          }
        }
      });
    });
  }

  /**
   * 兼容性判断
   */
  static canIUse(str) {
    if (wepy.canIUse) {
      return wepy.canIUse(str);
    } else {
      return false;
    }
  }
  /**
   * 检查SDK版本
   */
  static isSDKExipred() {
    const {SDKVersion} = wepy.getSystemInfoSync();
    console.info(`[version]sdk ${SDKVersion}`);
    return SDKVersion == null || SDKVersion < '1.2.0'
  }
  /**
   * 检查SDK版本
   */
  static checkSDK() {
    if (this.isSDKExipred()) {
      tips.modal('您的微信版本太低，为确保正常使用，请尽快升级');
    }
  }
}
