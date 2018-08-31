// 我的咨询
import base from './base'
import { patientApi } from '@/config'
import lang from '@/utils/lang'
import Page from '@/utils/page'
export default class consult extends base {
  static list() {
    const url = `${this.baseUrl}${patientApi.consult.list}`
    return new Page(url, this.processDataBySec.bind(this))
  }

  static history() {
    const url = `${this.baseUrl}${patientApi.consult.history}`
    return new Page(url, this.processEvalData.bind(this))
  }

  static async detail(param) {
    const url = `${this.baseUrl}${patientApi.consult.detail}`
    return await this.get(url, param)
  }

  static async add(param) {
    const url = `${this.baseUrl}${patientApi.consult.add}`
    return await this.post(url, param)
  }

  static async price(param) {
    const url = `${this.baseUrl}${patientApi.consult.price}`
    return await this.get(url, param)
  }

  static processEvalData(item) {
    item['dateFormat'] = lang.dateFormat(item.date, 'yyyy-MM-dd')
  }

  static processDataBySec(item) {
    item['dateFormat'] = lang.dateFormat(item.date, 'yyyy-MM-dd hh:mm:ss')
    item['contentFormat'] =
      item['content'] && item['content'].length > 45
        ? `${item['content'].substr(0, 45)}...`
        : item['content']
  }
}
