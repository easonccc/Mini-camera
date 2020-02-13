//app.js
App({
  onLaunch: function () {
    wx.request({
      url: 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=I1h0PmDl8BvkmZSeLisnl1iC&client_secret=SA1TflTsOzUYt7x2LGBw5AhU7YMVDiyN',
      method: 'POST',
      success: (res) => {
        this.globalData.access_token = res.data.access_token
      },
      fail: (err) => {
        wx.showToast({
          title: '鉴权失败!',
        })
      }
    })
  },
  // 全局共享的数据
  globalData: {
    access_token: ''
  }
})