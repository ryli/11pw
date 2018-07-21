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

    // auto copy
    wx.setClipboardData({
      data: result,
      success(res) {
        // console.log(res)
      }
    })
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
