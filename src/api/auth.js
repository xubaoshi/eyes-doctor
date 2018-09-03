import base from './base'
import wepy from 'wepy'
import store from '../store/utils'
import WxUtils from '../utils/wx'
import { patientApi } from '@/config'

/**
 * 权限服务类
 */
export default class auth extends base {
  /**
   * 一键登录
   */
  static async login() {
    const loginCode = this.getConfig('login_code')
    if (loginCode != null && loginCode != '') {
      try {
        await this.checkLoginCode(loginCode)
      } catch (e) {
        console.warn('check login code fial', loginCode)
        await this.doLogin()
      }
    } else {
      console.warn('login code not exists', loginCode)
      await this.doLogin()
    }
  }

  /**
   * 获取用户信息
   */
  static async user(param = { block: false, redirect: false }, userInfo) {
    try {
      // 检查
      if (this.hasConfig('user')) {
        store.save('user', this.getConfig('user'))
        return true
      }
      console.info('[auth] user check fail')
      // 重新登录
      await this.doLogin()
      // 获取用户信息
      const rawUser = userInfo != null ? userInfo : await wepy.getUserInfo()
      // 解密信息
      const { user } = await this.decodeUserInfo(rawUser)
      // 保存登录信息
      await this.setConfig('user', user)
      store.save('user', user)
      return true
    } catch (error) {
      console.error('[auth] 授权失败', error)
      if (param.block) {
        const url = `/pages/home/login?redirect=${param.redirect}`
        if (param.redirect) {
          WxUtils.backOrRedirect(url)
        } else {
          WxUtils.backOrNavigate(url)
        }
      }
      return false
    }
  }

  /**
   * 服务端解密用户信息
   */
  static async decodeUserInfo(rawUser) {
    const url = `${this.baseUrl}${patientApi.auth.decodeUserInfo}`
    const param = {
      encryptedData: rawUser.encryptedData,
      iv: rawUser.iv,
      thirdSession: this.getConfig('third_session'),
      app_code: this.getShopCode()
    }
    return await this.get(url, param)
  }

  /**
   * 执行登录操作
   */
  static async doLogin(param) {
    const { code } = await wepy.login()
    console.log(code)
    const { third_session, login_code } = await this.session({
      code: code,
      password: param.password,
      phone: param.phone
    })
    await this.setConfig('login_code', login_code)
    await this.setConfig('third_session', third_session)
    // await this.login()
  }

  /**
   * 获取会话
   */
  static async session(param) {
    const url = `${this.baseUrl}${patientApi.auth.session}?code=${
      param.code
    }&password=${param.password}&phone=${param.phone}`
    return await this.get(url)
  }

  /**
   * 检查登录情况
   */
  static async checkLoginCode(loginCode) {
    const url = `${this.baseUrl}${
      patientApi.auth.checkSession
    }?login_code=${loginCode}`
    const data = await this.get(url)
    return data.result
  }

  /**
   * 获取验证码
   */
  static async vcode(param) {
    const url = `${this.baseUrl}${patientApi.forget.vcode}`
    return await this.get(url, param)
  }

  /**
   * 获取验证码
   */
  static async updatePassword(param) {
    const url = `${this.baseUrl}${patientApi.forget.updatePassword}`
    return await this.post(url, param)
  }

  /**
   * 获取验证码
   */
  static async register(param) {
    const url = `${this.baseUrl}${patientApi.register.register}`
    return await this.post(url, param)
  }

  /**
   * 获取验证码
   */
  static async registerInfo(param) {
    const url = `${this.baseUrl}${patientApi.register.info}`
    return await this.post(url, param)
  }

  /**
   * 设置权限值
   */
  static getConfig(key) {
    return wepy.$instance.globalData.auth[key]
  }

  /**
   * 检查是否存在权限制
   */
  static hasConfig(key) {
    const value = this.getConfig(key)
    return value != null && value != ''
  }

  /**
   * 读取权限值
   */
  static async setConfig(key, value) {
    await wepy.setStorage({ key: key, data: value })
    wepy.$instance.globalData.auth[key] = value
  }

  /**
   * 删除权限值
   */
  static async removeConfig(key) {
    console.info(`[auth] clear auth config [${key}]`)
    wepy.$instance.globalData.auth[key] = null
    await wepy.removeStorage({ key: key })
  }
}
