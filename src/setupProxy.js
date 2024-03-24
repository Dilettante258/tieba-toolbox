import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();

app.use('/api', createProxyMiddleware({
  target: 'http://cross-domain-api.com', // 跨域目标接口
  changeOrigin: true
}))

app.listen(3000);