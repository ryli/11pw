//index.js
const Hashes = require('../../utils/jshashes.js')

//获取应用实例
const app = getApp()

Page({
  data: {
    typeData: [
      'MD5',
      'SHA1',
      'SHA256',
      'SHA512',
      'RMD160',
    ],
    type: wx.getStorageSync('type') || 'SHA512',
    length: wx.getStorageSync('length') || 16,
    hmac: '',
    content: wx.getStorageSync('content') || '',
    result: '',
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      // this.setData({
      //   userInfo: app.globalData.userInfo,
      //   hasUserInfo: true
      // })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        // this.setData({
        //   userInfo: res.userInfo,
        //   hasUserInfo: true
        // })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          // this.setData({
          //   userInfo: res.userInfo,
          //   hasUserInfo: true
          // })
        }
      })
    }
  },
  gen: function() {
    const { type, hmac, content, length } = this.data
    const encrypt = new Hashes[type]
    const pwd = encrypt.b64_hmac(hmac, content)
    const result = pwd.replace(/\W/g, '-').substr(1, length)
    this.setData({ result })
    wx.setStorageSync('type', type)
    wx.setStorageSync('content', content)
    wx.setStorageSync('length', length)
  },
  contentChange: function(e) {
    const value = e.detail.value.trim().toLowerCase()
    this.setData({ content: value })
  },
  hmacChange: function(e) {
    const value = e.detail.value.trim().toLowerCase()
    this.setData({ hmac: value })
  },
  pickerChange: function(e) {
    this.setData({ type: this.data.typeData[e.detail.value] })
  },
  sliderChange: function(e) {
    this.setData({ length: e.detail.value })
  },
  onShareAppMessage: function() {
    return {
      title: '11PW, yet another 1Password',
      path: '/page/index',
    }
  },
})
