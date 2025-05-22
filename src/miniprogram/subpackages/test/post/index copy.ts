import { createPage } from '@mpxjs/core'
createPage({
  data(): {
    [key: string]: unknown
    } {
    return {
      title: 'post',
      showPoster: false,
      posterUrl: ''
    }
  },
  onLoad() {
    console.log('post onLoad')
    // wx.getSystemInfo({
    //   success: (res) => {
    //     debugger
    //     console.log(res)
    //   }
    // })
    // this.generatePoster()
  },
  // onUnload() {
  //   console.log('post onUnload')
  // },
  // methods: {
  //   // 生成海报
  //   async generatePoster() {
  //     debugger
  //     // 1. 初始化 Canvas 2D
  //     const query = wx.createSelectorQuery()
  //     query.select('#posterCanvas')
  //       .fields({ node: true, size: true })
  //       .exec(async (res) => {
  //         const canvas = res[0].node
  //         const ctx = canvas.getContext('2d')

  //         // const getSystemInfo = () => {
  //         //   return new Promise((resolve, reject) => {
  //         //     wx.getSystemInfo({
  //         //       success: resolve,
  //         //       fail: reject
  //         //     })
  //         //   })
  //         // }

  //         // 2. 设置 Canvas 分辨率（避免模糊）
  //         // const dpr = (await getSystemInfo()).pixelRatio
  //         const dpr = wx.getSystemInfoSync().pixelRatio
  //         canvas.width = 750 * dpr
  //         canvas.height = 1334 * dpr
  //         ctx.scale(dpr, dpr)

  //         // 3. 绘制背景
  //         ctx.fillStyle = '#ffffff'
  //         ctx.fillRect(0, 0, 750, 1334)

  //         // 4. 绘制网络图片（需配置合法域名）
  //         const bgImg = await this.downloadImage('https://example.com/bg.jpg')
  //         ctx.drawImage(bgImg, 0, 0, 750, 1334)

  //         // 5. 绘制用户头像（需用户授权）
  //         const avatarPath = await this.getUserAvatar()
  //         await this.drawRoundImage(ctx, avatarPath, 50, 100, 100)

  //         // 6. 绘制动态文本（自动换行）
  //         this.wrapText(ctx, '快来领取专属优惠！', 50, 300, 650, 32, '#333')

  //         // 7. 生成临时路径
  //         wx.canvasToTempFilePath({
  //           canvas,
  //           success: (res) => {
  //             this.setData({ posterUrl: res.tempFilePath, showPoster: true })
  //           }
  //         })
  //       })
  //   },

  //   // 下载图片（支持本地缓存）
  //   downloadImage(url) {
  //     return new Promise((resolve) => {
  //       wx.downloadFile({
  //         url,
  //         success: (res) => resolve(res.tempFilePath),
  //         fail: () => resolve('') // 可设置默认图
  //       })
  //     })
  //   },

  //   // 获取用户头像（新授权方式）
  //   async getUserAvatar() {
  //     // 检查权限
  //     const { authSetting } = await wx.getSetting()
  //     if (!authSetting['scope.userInfo']) {
  //       await wx.authorize({ scope: 'scope.userInfo' })
  //     }

  //     const { userInfo } = await wx.getUserProfile({
  //       desc: '用于生成分享海报'
  //     })
  //     return userInfo.avatarUrl
  //   },

  //   // 绘制圆形图片
  //   drawRoundImage(ctx: any, imgPath, x, y, size) {
  //     return new Promise((resolve) => {
  //       const img = canvas.createImage()
  //       img.src = imgPath
  //       img.onload = () => {
  //         ctx.save()
  //         ctx.beginPath()
  //         ctx.arc(x + size/2, y + size/2, size/2, 0, Math.PI * 2)
  //         ctx.clip()
  //         ctx.drawImage(img, x, y, size, size)
  //         ctx.restore()
  //         resolve()
  //       }
  //     })
  //   },

  //   // 文字自动换行
  //   wrapText(ctx, text, x, y, maxWidth, fontSize, color) {
  //     ctx.font = `${fontSize}px sans-serif`
  //     ctx.fillStyle = color
  //     const words = text.split('')
  //     let line = ''

  //     for (const word of words) {
  //       const testLine = line + word
  //       const metrics = ctx.measureText(testLine)
  //       if (metrics.width > maxWidth) {
  //         ctx.fillText(line, x, y)
  //         line = word
  //         y += fontSize + 5 // 行间距
  //       } else {
  //         line = testLine
  //       }
  //     }
  //     ctx.fillText(line, x, y)
  //   },

  //   // 保存到相册（需授权）
  //   savePoster() {
  //     wx.saveImageToPhotosAlbum({
  //       filePath: this.data.posterUrl,
  //       success: () => wx.showToast({ title: '保存成功' }),
  //       fail: (err) => {
  //         if (err.errMsg.includes('auth')) {
  //           wx.openSetting() // 引导用户打开权限
  //         }
  //       }
  //     })
  //   }
  // }
})
