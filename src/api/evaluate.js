// 患者评价
import base from './base'
import Page from '@/utils/page'
import { patientApi } from '@/config'
import lang from '@/utils/lang'

export default class evaluate extends base {
  static list() {
    const url = `${this.baseUrl}${patientApi.evaluate.list}`
    return new Page(
      url,
      this.processEvalData.bind(this),
      this.processExtraDataFunc.bind(this)
    )
  }
  static async evaluateAdd(param) {
    const url = `${this.baseUrl}${patientApi.evaluate.add}`
    return this.post(url, param)
  }
  static processEvalData(item) {
    item['dateFormat'] = lang.dateFormat(item.date, 'yyyy-MM-dd')
  }
  static processExtraDataFunc(data) {
    return {
      satisfyNum: data.satisfyNum,
      generalNum: data.generalNum,
      unsatisfyNum: data.unsatisfyNum
    }
  }
}
