// app.js
import {
  register,
  login,
} from './http/request'
import store from './store/store.js'
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    this.login()
  },
  login() {
    wx.showLoading({
      title: '登陆中',
    })
    let _this = this
    wx.login({
      success: res => {
        let code = res.code; // 微信登录接口返回的 code 参数，下面注册接口需要用到
        login({
          code
        }).then((loginRes) => {
          if (loginRes.code === 10000) {
            //  注册
            _this.register()
            return
          }
          wx.setStorage({
            data: loginRes.data,
            key: 'userData',
          })
          wx.hideLoading()
        })
      }
    })
  },
  register() {
    let _this = this
    wx.login({
      success: res => {
        let code = res.code; // 微信登录接口返回的 code 参数，下面注册接口需要用到
        wx.getUserInfo({
          success: function (res) {
            let {
              iv,
              encryptedData
            } = res
            // 下面开始调用注册接口
            register({
              code,
              encryptedData,
              iv
            }).then(function (res) {
              _this.login();
            })
          }
        })
      }
    })
  },
  globalData: {
    userInfo: null,
    store
  }
})