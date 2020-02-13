// pages/home/home.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 屏幕高度
    phoneHight: 0,
    // 照相机朝向 默认为前置
    position: 'front',
    // 照片路径
    src: null,
    // 照片的展示情况 默认不展示
    isShowPhoto: false,
    // 颜值信息的展示
    isShowBox: false,
    // 映射关系
    map: {
      gender: {
        male: '男',
        female: '女'
      },
      expression: {
        none: '不笑', smile: '微笑', laugh: '大笑'
      },
      glasses: {
        none: '无眼镜', common: '普通眼镜', sun: '墨镜'
      },
      emotion: {
        angry: '愤怒', disgust: '厌恶', fear: '恐惧', happy: '高兴',
        sad: '伤心', surprise: '惊讶', neutral: '无情绪'
      }
    }
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
    // 创建相机对象的实例
    const photo = wx.createCameraContext()
    photo.takePhoto({
      quality: 'high',
      success: (res) => {
        console.log(res);
        // 将获得的路径存储
        this.setData({
          src: res.tempImagePath,
          isShowPhoto: true
        }, () => {
          this.getFaceInfo()
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
            src: res.tempFilePaths[0],
            isShowPhoto: true
            // 指定setdata成功后的回调函数 （调用测颜值的函数）
          }, () => {
            this.getFaceInfo()
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
  // 点击重选按钮时
  reChoose() {
    this.setData({
      src: '',
      isShowPhoto: false,
      // 人脸信息
      faceInfo: null,

    })
  },

  // 测颜值的函数
  getFaceInfo() {
    console.log(app.globalData.access_token);
    const token = app.globalData.access_token
    // 先判断是否获取到了token
    if (!token) {
      return wx.showToast({
        title: '鉴权失败！',
      })
    }
    // 发送请求时展示加载中
    wx.showLoading({
      title: '颜值检测中...'
    })
    // 进行颜值检测
    // 将照片转换为base64的格式 需要调用微信官方接口
    const file = wx.getFileSystemManager()
    const fileStr = file.readFileSync(this.data.src, 'base64')
    console.log(fileStr);
    // 发起请求
    wx.request({
      method: 'POST',
      url: 'https://aip.baidubce.com/rest/2.0/face/v3/detect?access_token=' + token,
      header: {
        'Content-Type': 'application/json'
      },
      data: {
        // 指定图片类型
        image_type: 'BASE64',
        // 该类型的图片数据
        image: fileStr,
        // 指定显示的属性 年龄，颜值分数 表情 性别 是否戴眼镜 情绪
        face_field: 'age,beauty,expression,gender,glasses,emotion'
      },
      // 请求成功后的回调函数
      success: (res) => {
        console.log(res);
        if (res.data.result.face_num <= 0) {
          return wx.showToast({
            title: '未检测到人脸',
          })
        }
        this.setData({
          faceInfo: res.data.result.face_list[0],
          isShowBox: true
        })

      },
      fail: () => {
        console.log(err);
        wx.showToast({
          title: '颜值检测失败！',
        })
      },
      complete: () => {
        wx.hideLoading()
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