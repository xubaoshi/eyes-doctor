// 患者评价
import base from './base'
import Page from '@/utils/page'
import { patientApi } from '@/config'

export default class doctor extends base {
  static list() {
    const url = `${this.baseUrl}${patientApi.doctor.list}`
    return new Page(url)
  }
}
