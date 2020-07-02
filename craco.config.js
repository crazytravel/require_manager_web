const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              'primary-color': '#3F51B5',
              '@layout-header-background': '#FFF',
              '@layout-header-padding': '0',
              '@layout-sider-background': '#FFF',
              '@menu-dark-bg': '#222',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};