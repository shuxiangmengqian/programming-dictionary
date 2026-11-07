const app = getApp()

Page({
  data: {
    typewriterText: '',
    fullText: '👋 你好，程序员！',
    isDarkMode: true,
    dailyWord: null,
    hasDailyWord: false
  },

  onLoad() {
    this.setData({ isDarkMode: app.globalData.isDarkMode })
    this.startTypewriter()
    this.fetchDailyWord()
  },

  onShow() {
    this.setData({ isDarkMode: app.globalData.isDarkMode })
  },

  fetchDailyWord() {
    const fallback = { word: 'Debounce', meaning: '防抖 · 降低触发频率', language: 'JavaScript' }
    const db = wx.cloud.database()
    db.collection('programming_words').count().then(res => {
      const total = res.total || 0
      if (total === 0) {
        this.setData({ dailyWord: fallback, hasDailyWord: true })
        return
      }
      const skip = Math.floor(Math.random() * total)
      return db.collection('programming_words').skip(skip).limit(1).get().then(r => {
        if (r.data && r.data.length > 0) {
          this.setData({ dailyWord: r.data[0], hasDailyWord: true })
        } else {
          this.setData({ dailyWord: fallback, hasDailyWord: true })
        }
      })
    }).catch(err => {
      console.log('fetchDailyWord', err)
      this.setData({ dailyWord: fallback, hasDailyWord: true })
    })
  },

  startTypewriter() {
    let i = 0
    const timer = setInterval(() => {
      if (i < this.data.fullText.length) {
        this.setData({ typewriterText: this.data.fullText.substring(0, i + 1) })
        i++
      } else {
        clearInterval(timer)
      }
    }, 150)
  },

  toggleTheme() {
    const next = !this.data.isDarkMode
    this.setData({ isDarkMode: next })
    app.setTheme(next)
  },

  goToDict(e) {
    const lang = e.currentTarget.dataset.lang
    wx.navigateTo({ url: `/pages/index/index?lang=${lang}` })
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
