App({
  onLaunch() {
    wx.cloud.init({
      env: 'cloud1-d9gx2svzg123cc485',
      traceUser: true
    })
    if (wx.getStorageSync('dark_mode') === '') {
      wx.setStorageSync('dark_mode', true)
    }
    this.globalData.isDarkMode = wx.getStorageSync('dark_mode') || true
    this.globalData.userInfo = wx.getStorageSync('userInfo') || null
    this.applyNav()
  },
  globalData: {
    isDarkMode: true,
    userInfo: null,
    task_Number: 50
  },
  applyNav() {
    if (this.globalData.isDarkMode) {
      wx.setNavigationBarColor({ frontColor: '#ffffff', backgroundColor: '#0a0e27' })
      wx.setBackgroundColor({ backgroundColor: '#0a0e27' })
      wx.setBackgroundTextStyle({ textStyle: 'light' })
    } else {
      wx.setNavigationBarColor({ frontColor: '#000000', backgroundColor: '#f4f6ff' })
      wx.setBackgroundColor({ backgroundColor: '#f4f6ff' })
      wx.setBackgroundTextStyle({ textStyle: 'dark' })
    }
  },
  setTheme(dark) {
    this.globalData.isDarkMode = dark
    wx.setStorageSync('dark_mode', dark)
    this.applyNav()
  },
  getUserInfo() {
    return this.globalData.userInfo
  },
  setUserInfo(info) {
    this.globalData.userInfo = info
    wx.setStorageSync('userInfo', info)
  },
  clearUserInfo() {
    this.globalData.userInfo = null
    wx.removeStorageSync('userInfo')
  }
})
