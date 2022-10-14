module.exports = (mode) => {
  if (mode === 'development') {
    return {
      injects: [],
      devServer: {
        port: 8083,
        proxy: {
          '/api': {
            target: 'http://backend-api-01.newbee.ltd',
            pathRewrite: { '^/api': '/api' }
          }
        }
      },
      mock: {
        timeout: '200-600',
        enabled: true
      },
      theme: {
        enabled: false,
        default: ''
      },
      designPx: 375
    };
  } else if (mode === 'production') {
    return {
      injects: [],
      theme: {
        enabled: true,
        default: ''
      },
      designPx: 375,
      mock: {
        timeout: '200-600',
        enabled: true
      },
      compress: {
        enabled: false,
        threshold: 10240,
        minRatio: 0.8,
        deleteOriginalAssets: false
      },
      splitChunks: {
      },
      alias: {

      },
      cdn: [
        {
          type: 'js',
          match: false,
          address: ''
        },
        {
          type: 'css',
          match: (name) => { return false; },
          address: ''
        }
      ]
    };
  }
  return {};
};
