// 首页
import base from './base'
import { patientApi } from '@/config'
import consult from './consult'
import store from '@/store/utils'

export default class home extends base {
  static async info() {
    return Promise.all([
      this.bannerList(),
      consult.myList().next(),
      consult.list().next()
    ]).then(([bannerList, myConsultList, consultList]) => {
      store.save('home', {
        bannerList
      })
      store.save('myConsultList', myConsultList)
      store.save('consultList', consultList)
      return true
    })
  }
  static async bannerList(param) {
    const url = `${this.baseUrl}${patientApi.banner.list}`
    return this.get(url, param)
  }
}
