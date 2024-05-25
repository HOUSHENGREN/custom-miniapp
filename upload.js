const ci = require('miniprogram-ci')
const projectConfig = require('./static/wx/project.config.json')
const userConfig = require('./config/user.conf')
const utils = require('./build/utils')
const repo = require('git-repo-info')()
const git = require('parse-git-config').sync();

(() => {
  const {
    version = '0.0.0',
    desc = `branch: ${repo?.branch}, uploader: ${git?.user?.name}`
  } = process.env

  ci.upload({
    project: new ci.Project({
      appid: projectConfig.appid,
      type: 'miniProgram',
      projectPath: utils.resolveDist(userConfig.srcMode),
      privateKeyPath: './private.wxe985e17305905fa5.key',
      ignores: ['node_modules/**/*']
    }),
    version,
    desc,
    setting: projectConfig.setting,
    onProgressUpdate: console.log
  })
})()
