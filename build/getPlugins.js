let { mpxPluginConf, supportedModes } = require('../config/index')
const MpxWebpackPlugin = require('@mpxjs/webpack-plugin')
const { resolve, resolveSrc, getConf } = require('./utils')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const VueLoaderPlugin = require('vue-loader').VueLoaderPlugin
const webpack = require('webpack')
const MpxUnocssPlugin = require('@mpxjs/unocss-plugin')

module.exports = function getPlugins (options) {
  const { mode, srcMode, env, subDir, production, report, functional, cloudFunc, needEslint } = options
  const plugins = []
  const copyIgnoreArr = supportedModes.map((item) => {
    return `**/${item}/**`
  })

  const currentMpxPluginConf = getConf(mpxPluginConf, options)

  plugins.push(new MpxWebpackPlugin(Object.assign({}, currentMpxPluginConf, {
    mode,
    srcMode
  }, env && { env })))

  const copyList = [
    {
      context: resolve(`static/${mode}`),
      from: '**/*',
      to: subDir ? '..' : '',
      noErrorOnMissing: true
    },
    {
      context: resolve('static'),
      from: '**/*',
      to: subDir ? '..' : '',
      globOptions: {
        ignore: copyIgnoreArr
      },
      noErrorOnMissing: true
    }
  ]

  if (functional) {
    copyList.push({
      context: resolve('src/functional-pages'),
      from: '**/*',
      to: 'functional-pages'
    })
  }

  if (cloudFunc) {
    copyList.push({
      context: resolve('src/functions'),
      from: '**/*',
      to: 'functions'
    })
  }

  if (needEslint) {
    plugins.push(new ESLintPlugin({
      context: resolve(),
      exclude: [resolve('node_modules')],
      extensions: ['js', 'ts', 'mpx']
    }))
  }

  plugins.push(new CopyWebpackPlugin({
    patterns: copyList
  }))

  plugins.push(new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: production ? '"production"' : '"development"'
    }
  }))

  if (mode === 'web') {
    plugins.push(new VueLoaderPlugin())
    plugins.push(new HtmlWebpackPlugin({
      filename: 'index.html',
      template: resolveSrc('index.html', subDir),
      inject: true
    }))
  }

  plugins.push(new webpack.ProgressPlugin())

  if (report) {
    plugins.push(new BundleAnalyzerPlugin())
  }

  plugins.push(new MpxUnocssPlugin({
    scan: {
      include: [
        'src/subpackages/onlineBank/**/*.mpx', // 网商银行相关页面
        'src/pages/product/**/*.mpx', // 网商银行相关页面
        'src/subpackages/orderFinancing_mpass/pledgeAuditApply/**/*.mpx', // 质押申请
        'src/components/PageHeader/**/*.mpx', // 网商银行相关组件
        'src/components/common/**/*.mpx', // 通用组件
        'src/components/Collapse/**/*.mpx', //
        'src/subpackages/orderFinancing/dashboardForStaff/components/TreatyInfo/**/*.mpx', // 门店签约产品信息
        'src/components/EscrowAccountModal/**/*.mpx', // 共管户相关组件
        'src/subpackages/orderFinancing/notificationLetterUpload/**/*.mpx' // 补充上传告知书
      ]
    },
    minCount: 10
  }))

  return plugins
}
