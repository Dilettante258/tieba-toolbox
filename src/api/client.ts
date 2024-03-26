import axios from 'axios'

// 创建axios实例
export const client = axios.create({
  // baseURL: 'https://proxy.admire258.workers.dev/',
  baseURL: 'https://p.wang1m.cc/',
  timeout: 30000
})
