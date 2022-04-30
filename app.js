// app.js
//
const {request} = require('./utils/util')
App({
  globalData:{
    $http:request
  },
  onLaunch() {
    wx.$http = request
   
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    const vm = this
    wx.getSystemInfo({
      success: function(res) {
        // let totalTopHeight = 68
        // if (res.model.indexOf('iPhone X') !== -1) {
        //   totalTopHeight = 88
        // } else if (res.model.indexOf('iPhone') !== -1) {
        //   totalTopHeight = 64
        // }
        vm.globalData.statusBarHeight = res.statusBarHeight
        vm.globalData.titleBarHeight =  res.statusBarHeight
      },
      failure() {
        vm.globalData.statusBarHeight = 0
        vm.globalData.titleBarHeight = 0
      }
    })
    //获取胶囊的位置信息
   const res =  wx.getMenuButtonBoundingClientRect()
   const buttonTop = res.top+res.height
   wx.buttonTop = buttonTop
  },
})

