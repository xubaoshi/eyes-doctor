import http from '../utils/http'
import { baseUrl } from '@/config'

export default class base {
  static baseUrl = baseUrl;
  static get = http.get.bind(http);
  static put = http.put.bind(http);
  static post = http.post.bind(http);
  static delete = http.delete.bind(http);
}
