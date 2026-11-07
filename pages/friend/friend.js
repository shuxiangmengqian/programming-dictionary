const app = getApp()

Page({
  data: {
    isDarkMode: true,
    searchKey: '',
    allSnippets: [
      {
        id: 1, title: 'CSS 绝对居中', tag: 'CSS',
        keywords: '居中 垂直 水平 flex center',
        code: 'display: flex;\njustify-content: center;\nalign-items: center;'
      },
      {
        id: 2, title: 'JS 数组去重', tag: 'JS',
        keywords: '去重 数组 过滤 set',
        code: 'const uniqueArr = [...new Set(myArray)];'
      },
      {
        id: 3, title: 'JS 防抖函数', tag: 'JS',
        keywords: '防抖 节流 频繁 触发 input',
        code: 'function debounce(fn, delay) {\n  let timer = null;\n  return function() {\n    if (timer) clearTimeout(timer);\n    timer = setTimeout(() => fn.apply(this, arguments), delay);\n  };\n}'
      },
      {
        id: 4, title: 'HTML 引入外部CSS', tag: 'HTML',
        keywords: '引入 css 样式 链接 link',
        code: '<link rel="stylesheet" href="style.css">'
      },
      {
        id: 5, title: 'JS 深拷贝简易版', tag: 'JS',
        keywords: '深拷贝 复制 对象 json clone',
        code: 'const deepClone = JSON.parse(JSON.stringify(obj));'
      },
      {
        id: 6, title: 'CSS 隐藏滚动条', tag: 'CSS',
        keywords: '隐藏 滚动条 滑动 scrollbar',
        code: '::-webkit-scrollbar { display: none; }'
      }
    ],
    snippets: []
  },

  onLoad() {
    this.setData({ snippets: this.data.allSnippets })
  },

  onShow() {
    this.setData({ isDarkMode: app.globalData.isDarkMode })
  },

  onSearch(e) {
    const raw = e.detail.value.trim().toLowerCase()
    this.setData({ searchKey: raw })
    if (!raw) {
      this.setData({ snippets: this.data.allSnippets })
      return
    }
    const keywords = raw.split(/\s+/).filter(Boolean)
    const result = this.data.allSnippets.filter(item => {
      const text = (item.title + ' ' + item.keywords + ' ' + item.tag + ' ' + item.code).toLowerCase()
      return keywords.every(k => text.includes(k))
    })
    this.setData({ snippets: result })
  },

  copyCode(e) {
    const code = e.currentTarget.dataset.code
    wx.setClipboardData({
      data: code,
      success: () => {
        wx.showToast({ title: '代码已复制', icon: 'success' })
      }
    })
  },

  onShareAppMessage() {
    return {
      title: '编程词典 · 代码速查库',
      path: '/pages/friend/friend'
    }
  },

  onShareTimeline() {
    return {
      title: '编程词典 · 代码速查库'
    }
  }
})
