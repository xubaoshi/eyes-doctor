// 首页
import base from './base'
import { patientApi } from '@/config'
import store from '@/store/utils'

export default class home extends base {
  static async consulterList(param) {
    const url = `${this.baseUrl}${patientApi.consult.consulter.list}`
    const list = await this.get(url, param)
    list.forEach(item => {
      item['subName'] = `${item.sex === '1' ? '男' : '女'}，${item.age} 岁，${item.userName}`
    });
    store.save('consulterList', list)
  }
  static async consulterAdd(param) {
    const url = `${this.baseUrl}${patientApi.consult.consulter.add}`
    return await this.post(url, param)
  }
  static async detail(param) {
    const url = `${this.baseUrl}${patientApi.consult.consulter.detail}`
    return await this.get(url, param)
  }
}
