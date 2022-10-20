import axios from 'axios'

// IMPORT CONFIG
import { BASE_URL } from './config'

const _API = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('medigital:credential')}`,
  },
})

export default _API
