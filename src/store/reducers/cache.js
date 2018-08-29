import { handleActions } from 'redux-actions'
import { SAVE } from '../types/cache'

export default handleActions(
  {
    [SAVE](state, action) {
      const { key, value } = action.payload
      return {
        ...state,
        [key]: value
      }
    }
  },
  {
    user: null, // 用户信息
    shareQrcode: null, // 用户
    home: null, // 首页
    evaluate: null, // 患者评价(首页)
    consulterList: null, // 咨询者列表,
    doctor: null, // 医生详情
    doctorEvaluate: null, // 医生评价列表(医生详情)
    consult: null// 我的咨询列表
  }
)
