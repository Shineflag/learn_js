//nginx 之 proxy_pass的 转发规则

const http = require('http');
http.createServer((req, res) => {
  console.log(req.url);
  res.end(`您的 请求 地址是${req.url}`);
}).listen(3000);