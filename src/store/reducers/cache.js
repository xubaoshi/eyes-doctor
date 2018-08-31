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
    myConsultList: null, // 我的咨询列表,
    consultList: null, // 咨询大厅,
    consult: null// 我的咨询列表
  }
)
