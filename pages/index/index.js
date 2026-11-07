const PAGE_SIZE = 20
const { filterWords } = require('../../utils/mock_data.js')

Page({
  data: {
    words: [],
    isDarkMode: true,
    tabs: [
      { name: '全部', value: 'all' },
      { name: 'HTML', value: 'HTML' },
      { name: 'CSS', value: 'CSS' },
      { name: 'JavaScript', value: 'JavaScript' },
      { name: 'Java / Python', value: 'Python' }
    ],
    currentTab: 'all',
    searchKey: '',
    loading: false,
    hasMore: true,
    loadingTip: ''
  },

  currentLangStr: 'all',
  searchTimer: null,
  pageNum: 0,

  onLoad(options) {
    const app = getApp()
    this.setData({ isDarkMode: app.globalData.isDarkMode })
    const lang = options.lang || 'all'
    this.currentLangStr = lang
    this.setData({ currentTab: lang })
    this.reload()
  },

  onReachBottom() {
    if (this.data.hasMore && !this.data.loading) {
      this.loadData(false)
    }
  },

  reload() {
    this.pageNum = 0
    this.setData({ hasMore: true })
    this.loadData(true)
  },

  buildQuery(lang, keyword) {
    const db = wx.cloud.database()
    let cond = null
    if (lang === 'Python') {
      cond = { language: db.command.in(['Python', 'Java']) }
    } else if (lang !== 'all') {
      cond = { language: lang }
    }
    if (keyword) {
      const wordMatch = { word: db.RegExp({ regexp: keyword, options: 'i' }) }
      if (cond) return db.command.and([cond, wordMatch])
      return wordMatch
    }
    return cond
  },

  loadData(reset) {
    if (this.data.loading) return
    this.setData({ loading: true, loadingTip: reset ? '加载中...' : '加载更多...' })
    const db = wx.cloud.database()
    const condition = this.buildQuery(this.currentLangStr, this.data.searchKey)
    let query = db.collection('programming_words')
    if (condition) query = query.where(condition)
    query.skip(this.pageNum * PAGE_SIZE).limit(PAGE_SIZE).get().then(res => {
      const hasMore = res.data.length === PAGE_SIZE
      const words = reset ? res.data : this.data.words.concat(res.data)
      this.pageNum += 1
      this.setData({ words, loading: false, hasMore, loadingTip: '' })
    }).catch(err => {
      console.log('loadData fallback', err)
      this.offline = true
      const res = filterWords(this.currentLangStr, this.data.searchKey, this.pageNum, PAGE_SIZE)
      const words = reset ? res.list : this.data.words.concat(res.list)
      this.pageNum += 1
      this.setData({ words, loading: false, hasMore: res.hasMore, loadingTip: '' })
      if (reset && !this._offlineHinted) {
        this._offlineHinted = true
        wx.showToast({ title: '离线演示模式 · 数据为示例', icon: 'none' })
      }
    })
  },

  toggleMaster(e) {
    const id = e.currentTarget.dataset.id
    const currentStatus = e.currentTarget.dataset.status
    const newStatus = !currentStatus
    if (this.offline) {
      const currentWords = this.data.words
      for (let i = 0; i < currentWords.length; i++) {
        if (currentWords[i]._id === id) {
          currentWords[i].isMastered = newStatus
          break
        }
      }
      this.setData({ words: currentWords })
      wx.showToast({ title: newStatus ? '太棒了！已攻克' : '继续努力', icon: 'none' })
      return
    }
    const db = wx.cloud.database()
    db.collection('programming_words').doc(id).update({
      data: { isMastered: newStatus }
    }).then(() => {
      wx.showToast({ title: newStatus ? '太棒了！已攻克' : '继续努力', icon: 'none' })
      const currentWords = this.data.words
      for (let i = 0; i < currentWords.length; i++) {
        if (currentWords[i]._id === id) {
          currentWords[i].isMastered = newStatus
          break
        }
      }
      this.setData({ words: currentWords })
    }).catch(err => {
      console.log('toggleMaster', err)
      wx.showToast({ title: '同步失败，请检查词库读写权限', icon: 'none' })
    })
  },

  switchTab(e) {
    const val = e.currentTarget.dataset.value
    if (val === this.data.currentTab) return
    this.setData({ currentTab: val })
    this.currentLangStr = val
    this.reload()
  },

  onSearchInput(e) {
    const keyword = e.detail.value.trim()
    this.setData({ searchKey: keyword })
    if (this.searchTimer) clearTimeout(this.searchTimer)
    this.searchTimer = setTimeout(() => {
      this.reload()
    }, 400)
  },

  playVoice(e) {
    wx.showToast({ title: '语音功能升级中', icon: 'none' })
  },

  copyCode(e) {
    const code = e.currentTarget.dataset.code
    wx.setClipboardData({
      data: code,
      success: () => {
        wx.showToast({ title: '代码已复制！', icon: 'success' })
      }
    })
  },

  onShareAppMessage() {
    return {
      title: '编程词典 · 查词学习两不误',
      path: '/pages/index/index'
    }
  },

  onShareTimeline() {
    return {
      title: '编程词典 · 查词学习两不误'
    }
  }
})
