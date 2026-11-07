const app = getApp()

Page({
  data: {
    isDarkMode: true,
    word: { word: 'Debounce', meaning: '防抖 · 降低触发频率', language: 'JavaScript' }
  },

  drawing: false,

  onLoad() {
    this.setData({ isDarkMode: app.globalData.isDarkMode })
    this.fetchWord()
  },

  onReady() {
    this.draw()
  },

  fetchWord() {
    const db = wx.cloud.database()
    db.collection('programming_words').count().then(res => {
      const total = res.total || 0
      if (total === 0) return
      const skip = Math.floor(Math.random() * total)
      return db.collection('programming_words').skip(skip).limit(1).get().then(r => {
        if (r.data && r.data.length > 0) {
          this.setData({ word: r.data[0] })
          this.draw()
        }
      })
    }).catch(err => {
      console.log('fetchWord', err)
    })
  },

  draw() {
    if (this.drawing) return
    this.drawing = true
    const query = wx.createSelectorQuery()
    query.select('#poster').fields({ node: true, size: true }).exec(res => {
      if (!res || !res[0] || !res[0].node) {
        this.drawing = false
        return
      }
      const canvas = res[0].node
      const ctx = canvas.getContext('2d')
      const dpr = wx.getSystemInfoSync().pixelRatio
      const w = res[0].width
      const h = res[0].height
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.scale(dpr, dpr)
      this.paint(ctx, w, h)
    })
  },

  paint(ctx, w, h) {
    const grad = ctx.createLinearGradient(0, 0, w, h)
    grad.addColorStop(0, '#0a0e27')
    grad.addColorStop(0.5, '#141a3c')
    grad.addColorStop(1, '#1c1040')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, w, h)

    this.drawGlow(ctx, w * 0.2, h * 0.15, 180, 'rgba(124, 92, 255, 0.35)')
    this.drawGlow(ctx, w * 0.85, h * 0.5, 140, 'rgba(79, 140, 255, 0.3)')
    this.drawGlow(ctx, w * 0.5, h * 0.9, 120, 'rgba(66, 184, 131, 0.25)')
    this.drawStars(ctx, w, h)

    ctx.textAlign = 'center'
    ctx.fillStyle = '#ffffff'
    ctx.font = 'bold 68px sans-serif'
    ctx.shadowColor = 'rgba(167, 139, 250, 0.9)'
    ctx.shadowBlur = 32
    ctx.fillText('编程词典', w / 2, h * 0.16)
    ctx.shadowBlur = 0

    ctx.fillStyle = 'rgba(196, 181, 253, 0.92)'
    ctx.font = '28px sans-serif'
    ctx.fillText('查词 · 学习 · 速查', w / 2, h * 0.225)

    const cardX = w * 0.1
    const cardW = w * 0.8
    const cardY = h * 0.32
    const cardH = h * 0.36
    this.drawCard(ctx, cardX, cardY, cardW, cardH)

    ctx.textAlign = 'left'
    ctx.fillStyle = '#a78bfa'
    ctx.font = 'bold 28px sans-serif'
    ctx.fillText('今日词汇', cardX + 40, cardY + 70)

    ctx.fillStyle = '#ffffff'
    ctx.font = 'bold 54px sans-serif'
    ctx.fillText(this.data.word.word, cardX + 40, cardY + 155)

    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'
    ctx.font = '26px sans-serif'
    ctx.fillText(this.data.word.language || '', cardX + 40, cardY + 205)

    ctx.fillStyle = '#a78bfa'
    ctx.font = '30px sans-serif'
    ctx.fillText(this.data.word.meaning || '', cardX + 40, cardY + 265)

    ctx.textAlign = 'center'
    ctx.fillStyle = 'rgba(255, 255, 255, 0.88)'
    ctx.font = 'bold 34px sans-serif'
    ctx.fillText('每天进步一点点', w / 2, h * 0.82)

    ctx.fillStyle = 'rgba(138, 143, 176, 0.9)'
    ctx.font = '24px sans-serif'
    ctx.fillText('打开小程序，一起查词学代码', w / 2, h * 0.9)

    this.drawing = false
  },

  drawGlow(ctx, x, y, r, color) {
    const g = ctx.createRadialGradient(x, y, 0, x, y, r)
    g.addColorStop(0, color)
    g.addColorStop(1, 'rgba(0, 0, 0, 0)')
    ctx.fillStyle = g
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fill()
  },

  drawStars(ctx, w, h) {
    const stars = [
      [0.1, 0.1], [0.25, 0.28], [0.82, 0.12], [0.9, 0.28],
      [0.08, 0.5], [0.92, 0.68], [0.15, 0.8], [0.85, 0.88],
      [0.4, 0.1], [0.6, 0.18], [0.3, 0.68], [0.7, 0.75]
    ]
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)'
    stars.forEach(s => {
      ctx.beginPath()
      ctx.arc(s[0] * w, s[1] * h, 3, 0, Math.PI * 2)
      ctx.fill()
    })
  },

  drawCard(ctx, x, y, w, h) {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.06)'
    ctx.strokeStyle = 'rgba(167, 139, 250, 0.45)'
    ctx.lineWidth = 2
    this.roundRect(ctx, x, y, w, h, 28)
    ctx.fill()
    ctx.stroke()
  },

  roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath()
    ctx.moveTo(x + r, y)
    ctx.arcTo(x + w, y, x + w, y + h, r)
    ctx.arcTo(x + w, y + h, x, y + h, r)
    ctx.arcTo(x, y + h, x, y, r)
    ctx.arcTo(x, y, x + w, y, r)
    ctx.closePath()
  },

  savePoster() {
    const query = wx.createSelectorQuery()
    query.select('#poster').fields({ node: true, size: true }).exec(res => {
      if (!res || !res[0] || !res[0].node) {
        wx.showToast({ title: '海报未就绪', icon: 'none' })
        return
      }
      wx.canvasToTempFilePath({
        canvas: res[0].node,
        success: (r) => {
          wx.saveImageToPhotosAlbum({
            filePath: r.tempFilePath,
            success: () => wx.showToast({ title: '已保存到相册', icon: 'success' }),
            fail: () => wx.showToast({ title: '请开启相册权限后重试', icon: 'none' })
          })
        },
        fail: () => wx.showToast({ title: '生成失败', icon: 'none' })
      })
    })
  },

  onShareAppMessage() {
    return {
      title: '编程词典 · 每天进步一点点',
      path: '/pages/home/home'
    }
  },

  onShareTimeline() {
    return {
      title: '编程词典 · 每天进步一点点'
    }
  }
})
