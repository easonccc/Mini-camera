// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 屏幕高度
    phoneHight: 0,
    // 照相机朝向 默认为前置
    position: 'front',
    src: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取屏幕高度
    const sysInfo = wx.getSystemInfoSync()
    this.setData({
      phoneHight: sysInfo.windowHeight
    })
  },
  // 切换摄像头
  reverse() {
    // 定义一个变量 让它动态变化 取反
    const res = this.data.position === 'front' ? 'back' : 'front'
    this.setData({
      position: res
    })
  },
  // 点击照相按钮
  takePhoto() {
    // 创建实例
    const photo = wx.createCameraContext()
    photo.takePhoto({
      quality: 'high',
      success: (res) => {
        console.log(res);
        // 将获得的路径存储
        this.setData({
          src: res.tempImagePath
        })
      },
      // 如果失败的话 将路径设为空
      fail: (err) => {
        this.setData({
          src: ''
        })
      }
    })
  },

  // 选择照片
  selectePhoto() {
    wx.chooseImage({
      count: 1,
      sizeType: 'original',
      sourceType: 'album',
      success: (res) => {
        console.log(res);
        // 如果图片的本地临时文件路径列表 (本地路径) 大于0
        if (res.tempFilePaths.length > 0) {
          this.setData({
            src: res.tempFilePaths[0]
          })
        }
      },
      fail: () => {
        this.setData({
          src: ''
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})