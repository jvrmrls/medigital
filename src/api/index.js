import axios from 'axios'

// IMPORT CONFIG
import { BASE_URL } from './config'

const _API = axios.create({
  baseURL: BASE_URL,
})

export default _API
