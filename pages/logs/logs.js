//logs.js
const formatTime = require('../../utils/formatTime.js')

Page({
  data: {
    logs: []
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return formatTime.formatTime(new Date(log))
      })
    })
  }
})
