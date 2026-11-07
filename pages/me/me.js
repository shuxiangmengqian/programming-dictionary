const app = getApp()
const { MOCK_WORDS } = require('../../utils/mock_data.js')

Page({
  data: {
    isDarkMode: true,
    userInfo: null,
    avatarUrl: '',
    nickname: '',
    wordCount: 0,
    displayCount: 0,
    masteredCount: 0,
    studyProgress: 0,
    collectProgress: 0,
    targetWords: 200,
    loginPanelVisible: false
  },

  onLoad() {
    this.loadStats()
  },

  onShow() {
    this.setData({
      isDarkMode: app.globalData.isDarkMode,
      userInfo: app.getUserInfo()
    })
    this.loadStats()
  },

  openLoginPanel() {
    this.setData({ loginPanelVisible: true })
  },

  closeLoginPanel() {
    this.setData({ loginPanelVisible: false })
  },

  onChooseAvatar(e) {
    this.setData({ avatarUrl: e.detail.avatarUrl })
  },

  onNicknameInput(e) {
    this.setData({ nickname: e.detail.value })
  },

  doLogin() {
    const { avatarUrl, nickname } = this.data
    if (!avatarUrl) {
      wx.showToast({ title: '请先选择头像', icon: 'none' })
      return
    }
    if (!nickname.trim()) {
      wx.showToast({ title: '请填写昵称', icon: 'none' })
      return
    }
    const info = { avatarUrl, nickname: nickname.trim() }
    app.setUserInfo(info)
    this.setData({ userInfo: info, loginPanelVisible: false })
    wx.showToast({ title: '登录成功', icon: 'success' })
  },

  logout() {
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          app.clearUserInfo()
          this.setData({ userInfo: null })
          wx.showToast({ title: '已退出', icon: 'success' })
        }
      }
    })
  },

  loadStats() {
    const db = wx.cloud.database()
    Promise.all([
      db.collection('programming_words').count(),
      db.collection('programming_words').where({ isMastered: true }).count()
    ]).then(res => {
      const total = res[0].total || 1
      const mastered = res[1].total || 0
      const calcStudy = Math.round((mastered / total) * 100)
      const calcCollect = Math.min(Math.round((total / this.data.targetWords) * 100), 100)
      this.setData({
        wordCount: total,
        masteredCount: mastered,
        studyProgress: calcStudy,
        collectProgress: 0
      })
      setTimeout(() => {
        this.setData({ collectProgress: calcCollect })
      }, 300)
      this.rollNumber(total)
    }).catch(err => {
      console.log('loadStats fallback', err)
      const total = MOCK_WORDS.length
      const mastered = MOCK_WORDS.filter(w => w.isMastered).length
      const calcStudy = Math.round((mastered / total) * 100)
      const calcCollect = Math.min(Math.round((total / this.data.targetWords) * 100), 100)
      this.setData({
        wordCount: total,
        masteredCount: mastered,
        studyProgress: calcStudy,
        collectProgress: 0
      })
      setTimeout(() => {
        this.setData({ collectProgress: calcCollect })
      }, 300)
      this.rollNumber(total)
    })
  },

  rollNumber(target) {
    let current = 0
    const step = Math.ceil(target / 30)
    const timer = setInterval(() => {
      current += step
      if (current >= target) {
        current = target
        clearInterval(timer)
      }
      this.setData({ displayCount: current })
    }, 30)
  },

  goToVocabList() {
    wx.navigateTo({ url: '/pages/vocab_list/vocab_list?type=all' })
  },

  goToMasteredList() {
    wx.navigateTo({ url: '/pages/vocab_list/vocab_list?type=mastered' })
  },

  goToPoster() {
    wx.navigateTo({ url: '/pages/share_poster/share_poster' })
  },

  showAbout() {
    wx.showModal({
      title: '关于编程词典',
      content: '编程词典 v2.0\n面向程序员的词汇与代码速查工具，收录 HTML / CSS / JavaScript / Java / Python 常用词汇。',
      showCancel: false
    })
  },

  clearCache() {
    wx.showModal({
      title: '提示',
      content: '确定要清除所有缓存吗？（登录信息也会被清除）',
      success: (res) => {
        if (res.confirm) {
          wx.clearStorageSync()
          app.globalData.isDarkMode = true
          wx.setStorageSync('dark_mode', true)
          wx.showToast({ title: '已清除', icon: 'success' })
          setTimeout(() => { wx.reLaunch({ url: '/pages/home/home' }) }, 1000)
        }
      }
    })
  },

  onShareAppMessage() {
    return {
      title: '编程词典 · 一起进步吧',
      path: '/pages/home/home'
    }
  },

  onShareTimeline() {
    return {
      title: '编程词典 · 一起进步吧'
    }
  }
})
