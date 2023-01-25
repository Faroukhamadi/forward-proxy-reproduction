import httpProxy from 'http-proxy';

const proxy = httpProxy.createProxyServer({
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
