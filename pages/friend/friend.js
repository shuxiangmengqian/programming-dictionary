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
      },
      {
        id: 7, title: 'JS 数组求和', tag: 'JS',
        keywords: '求和 reduce 累加 总和',
        code: 'const sum = arr.reduce((s, n) => s + n, 0);'
      },
      {
        id: 8, title: 'JS 数组最大值', tag: 'JS',
        keywords: '最大 最小值 math max min',
        code: 'const max = Math.max(...arr);\nconst min = Math.min(...arr);'
      },
      {
        id: 9, title: 'JS 日期格式化', tag: 'JS',
        keywords: '日期 格式化 时间 YYYY-MM-DD',
        code: "const d = new Date();\nconst str = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;"
      },
      {
        id: 10, title: 'JS 本地存储', tag: 'JS',
        keywords: '本地存储 localStorage 缓存 持久化',
        code: "wx.setStorageSync('key', {name: 'tom'});\nconst data = wx.getStorageSync('key');"
      },
      {
        id: 11, title: 'CSS 居中弹窗', tag: 'CSS',
        keywords: '弹窗 模态 居中 fixed 定位',
        code: '.modal {\n  position: fixed; top: 50%; left: 50%;\n  transform: translate(-50%, -50%);\n}'
      },
      {
        id: 12, title: 'CSS 文字省略号', tag: 'CSS',
        keywords: '省略号 截断 单行 多行 text-overflow',
        code: '.ellipsis {\n  overflow: hidden; text-overflow: ellipsis;\n  white-space: nowrap;\n}'
      },
      {
        id: 13, title: 'JS 防抖搜索', tag: 'JS',
        keywords: '搜索 输入 防抖 search input',
        code: "let timer;\nconst onSearch = (kw) => {\n  clearTimeout(timer);\n  timer = setTimeout(() => query(kw), 300);\n};"
      },
      {
        id: 14, title: '小程序云数据库查询', tag: '云开发',
        keywords: '云开发 数据库 query collection where',
        code: "wx.cloud.database().collection('words')\n  .where({language: 'JS'}).get()\n  .then(res => console.log(res.data));"
      },
      {
        id: 15, title: 'JS 深拷贝处理嵌套', tag: 'JS',
        keywords: '深拷贝 嵌套 对象 递归 structuredClone',
        code: 'const deepClone = (obj) => structuredClone(obj);'
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
