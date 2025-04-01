const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
   app.use(
      '/characters',
      createProxyMiddleware({
         target: 'http://localhost:3100',
         changeOrigin: true,
         onError: (err, req, res) => {
            console.error('Proxy error:', err.message);
            res.writeHead(503, { 'Content-Type': 'text/plain' });
            res.end('Service unavailable. Please try again later.');
         },
      })
   );

   app.use(
      '/comics',
      createProxyMiddleware({
         target: 'http://localhost:3100',
         changeOrigin: true,
         onError: (err, req, res) => {
            console.error('Proxy error:', err.message);
            res.writeHead(503, { 'Content-Type': 'text/plain' });
            res.end('Service unavailable. Please try again later.');
         },
      })
   );
};
