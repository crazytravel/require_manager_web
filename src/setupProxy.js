const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://cc.iteck/admin-api/',
            changeOrigin: true,
        })
    );
    app.use(
        '/storage',
        createProxyMiddleware({
            target: 'https://cc.iteck/storage/',
            changeOrigin: true,
            pathRewrite: {
                '^/storage': ''
            }
        }),
    );
};