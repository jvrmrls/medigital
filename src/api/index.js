import axios from 'axios'

// IMPORT CONFIG
import { BASE_URL, TIMEOUT } from './config'

const _API = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
})

export default _API
