"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_proxy_1 = __importDefault(require("http-proxy"));
const proxy = http_proxy_1.default.createProxyServer({
    target: 'http://localhost:4000',
});
// if this is deployed in spain for example, wallapop will be accessible
proxy.on('proxyReq', (proxyReq, req, res, options) => {
    console.log('request url', req.url);
    const reqHeaders = req.headers;
    console.log('reqHeaders', reqHeaders);
    proxyReq.setHeader('X-Special-Proxy-Header-Request', 'foobar');
    res.setHeader('X-Special-Proxy-Header-Response', 'foobar');
});
proxy.on('end', (req, res, proxyRes) => {
    console.log('end');
});
console.log('Proxy listening on port 3004');
proxy.listen(3004);
