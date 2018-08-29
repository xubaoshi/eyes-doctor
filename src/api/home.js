// 首页
import base from './base'
import { patientApi } from '@/config'
import evaluate from './evaluate'
import store from '@/store/utils'

export default class home extends base {
  static async info() {
    return Promise.all([this.bannerList(), evaluate.list().next()]).then(
      ([bannerList, evaluateList]) => {
        store.save('home', {
          bannerList
        })
        store.save('evaluate', evaluateList)
        return true
      }
    )
  }
  static async bannerList(param) {
    const url = `${this.baseUrl}${patientApi.banner.list}`
    return this.get(url, param)
  }
}
