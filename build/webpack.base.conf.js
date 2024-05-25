const { resolve } = require('./utils');
const path = require('path');

module.exports = {
  performance: {
    hints: false
  },
  mode: 'none',
  resolve: {
    extensions: ['.mpx', '.js', '.wxml', '.vue', '.ts', '.wxss'],
    modules: ['node_modules'],
    alias: {
      '@/components': path.resolve(__dirname, '..', 'src/components'),
      '@/utils': path.resolve(__dirname, '..', 'src/utils'),
      '@/configs': path.resolve(__dirname, '..', 'src/config'),
      '@/services': path.resolve(__dirname, '..', 'src/services'),
      '@/constants': path.resolve(__dirname, '..', 'src/constants'),
      '@/assets': path.resolve(__dirname, '..', 'src/static'),
      '@/types': path.resolve(__dirname, '..', 'src/types'),
      '@/enums': path.resolve(__dirname, '..', 'src/enums'),
      '@/subpackages': path.resolve(__dirname, '..', 'src/subpackages'),
      'app.wxss': path.resolve(__dirname, '..', 'src/app.wxss'),
    }
  },
  cache: {
    type: 'filesystem',
    buildDependencies: {
      build: [resolve('build/')],
      config: [resolve('config/')]
    },
    cacheDirectory: resolve('.cache/')
  },
  snapshot: {
    // 如果希望修改node_modules下的文件时对应的缓存可以失效，可以将此处的配置改为 managedPaths: []
    managedPaths: [resolve('node_modules/')]
  },
  optimization: {
    emitOnErrors: true,
    minimizer: [
      {
        apply: compiler => {
          // Lazy load the Terser plugin
          const TerserPlugin = require('terser-webpack-plugin');
          new TerserPlugin({
            // terserOptions参考 https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
            terserOptions: {
              // terser的默认行为会把某些对象方法转为箭头函数，导致ios9等不支持箭头函数的环境白屏，详情见 https://github.com/terser/terser#compress-options
              compress: {
                arrows: false
              }
            }
          }).apply(compiler);
        }
      }
    ]
  }
};
