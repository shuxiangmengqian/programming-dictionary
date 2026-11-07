const app = getApp()
const PAGE_SIZE = 20
const { MOCK_WORDS } = require('../../utils/mock_data.js')

Page({
  data: {
    words: [],
    totalWords: 0,
    isDarkMode: true,
    pageTitle: '全部词汇',
    loading: false,
    hasMore: true
  },

  pageNum: 0,
  currentType: 'all',

  onLoad(options) {
    const type = options.type || 'all'
    this.currentType = type
    this.setData({
      isDarkMode: app.globalData.isDarkMode,
      pageTitle: type === 'mastered' ? '已攻克词汇' : '已收录词汇'
    })
    wx.setNavigationBarTitle({ title: this.data.pageTitle })
    this.reload()
  },

  onReachBottom() {
    if (this.data.hasMore && !this.data.loading) {
      this.loadData(false)
    }
  },

  reload() {
    this.pageNum = 0
    this.setData({ hasMore: true, words: [] })
    const db = wx.cloud.database()
    let query = db.collection('programming_words')
    if (this.currentType === 'mastered') {
      query = query.where({ isMastered: true })
    }
    query.count().then(res => {
      this.setData({ totalWords: res.total })
      this.loadData(true)
    }).catch(err => {
      console.log('count fallback', err)
      const total = this.currentType === 'mastered'
        ? MOCK_WORDS.filter(w => w.isMastered).length
        : MOCK_WORDS.length
      this.setData({ totalWords: total })
      this.loadData(true)
    })
  },

  loadData(reset) {
    if (this.data.loading) return
    this.setData({ loading: true })
    const db = wx.cloud.database()
    let query = db.collection('programming_words')
    if (this.currentType === 'mastered') {
      query = query.where({ isMastered: true })
    }
    query.skip(this.pageNum * PAGE_SIZE).limit(PAGE_SIZE).get().then(res => {
      const hasMore = res.data.length === PAGE_SIZE
      const words = reset ? res.data : this.data.words.concat(res.data)
      this.pageNum += 1
      this.setData({ words, loading: false, hasMore })
    }).catch(err => {
      console.log('loadData fallback', err)
      const list = this.currentType === 'mastered'
        ? MOCK_WORDS.filter(w => w.isMastered)
        : MOCK_WORDS
      const start = this.pageNum * PAGE_SIZE
      const slice = list.slice(start, start + PAGE_SIZE)
      const hasMore = start + slice.length < list.length
      const words = reset ? slice : this.data.words.concat(slice)
      this.pageNum += 1
      this.setData({ words, loading: false, hasMore })
    })
  },

  copyCode(e) {
    const code = e.currentTarget.dataset.code
    wx.setClipboardData({
      data: code,
      success: () => wx.showToast({ title: '复制成功', icon: 'none' })
    })
  },

  onShareAppMessage() {
    return {
      title: this.data.pageTitle + ' · 编程词典',
      path: '/pages/vocab_list/vocab_list?type=' + this.currentType
    }
  }
})
