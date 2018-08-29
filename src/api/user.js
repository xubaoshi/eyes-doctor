// 用户评价
import base from './base'
import { patientApi } from '@/config'
import store from '@/store/utils'
import lang from '@/utils/lang'
import Page from '@/utils/page'

export default class user extends base {
  // 用户信息
  static async info(param) {
    const url = `${this.baseUrl}${patientApi.user.info}`
    const userInfo = await this.get(url, param)
    store.save('user', userInfo)
  }

  // 更新用户
  static async updateUser(param) {
    const url = `${this.baseUrl}${patientApi.user.update}`
    return await this.post(url, param)
  }

  // 推荐二维码
  static async qrcode(param) {
    const url = `${this.baseUrl}${patientApi.user.share.qrcode}`
    const qrcode = await this.get(url, param)
    store.save('shareQrcode', qrcode)
    return qrcode
  }

  // 推荐 我的发展的用户
  static async users(param) {
    const url = `${this.baseUrl}${patientApi.user.share.users}`
    const arr = await this.get(url, param)
    arr.forEach(item => {
      item['dateFormat'] = lang.dateFormat(item.date, 'yyyy-MM-dd')
    })
    return arr
  }

  // 收入明细
  static income(param) {
    const url = `${this.baseUrl}${patientApi.user.income}`
    return new Page(url, this.processData.bind(this))
  }

  // 提现请求
  static async cashRequest(param) {
    const url = `${this.baseUrl}${patientApi.user.cash.request}`
    return await this.post(url, param)
  }
  // 获取我添加的银行卡
  static async myCards(param) {
    const url = `${this.baseUrl}${patientApi.user.cash.myCards}`
    const arr = await this.get(url, param)
    return arr
  }
  // 全部银行卡
  static async allCards(param) {
    const url = `${this.baseUrl}${patientApi.user.cash.allCards}`
    const arr = await this.get(url, param)
    return arr
  }
  // 提现历史
  static cashHistory(param) {
    const url = `${this.baseUrl}${patientApi.user.cash.history}`
    return new Page(url, this.processData.bind(this))
  }

  // 新增提现银行
  static async addCard(param) {
    const url = `${this.baseUrl}${patientApi.user.cash.addCard}`
    return await this.post(url, param)
  }

  // 处理数据
  static processData(item) {
    item['dateFormat'] = lang.dateFormat(item.date, 'yyyy-MM-dd')
  }
}
