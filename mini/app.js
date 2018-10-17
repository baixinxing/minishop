var util = require('./utils/util.js');
var api = require('./config/api.js');
var user = require('./services/user.js');

App({
  onLaunch: function () {

    wx.chooseLocation({
      success: data => {
        console.log(data)
      }
    })




    // wx.showModal({

    //   title: '提示',

    //   content: '这是一个模态弹窗',

    //   success: function (res) {

    //     if (res.confirm) {//这里是点击了确定以后

    //       console.log('用户点击确定')

    //     } else {//这里是点击了取消以后

    //       console.log('用户点击取消')

    //     }

    //   }

    // })

  //  wx.getLocation({
  //    success: function(res) {
  //      console.log(res);
  //    },
  //  })

  //  wx.openLocation({
  //    latitude: 35.06151,
  //    longitude: 118.33705,
  //    success: res => {
  //      console.log('ai');
  //    },
  //    fail: error => {
  //      console.log(error);
  //    }
  //  })

  //  wx.chooseLocation({
  //    success: function(res) {
  //      console.log(res);
  //    },
  //  })

    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           console.log('success');
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         },
    //         fail: error => {
    //           console.log('error:');
    //         }
    //       })
    //     }
    //   }
    // });

    // wx.login({
    //   success: function (res) {
    //     console.log('登录成功' + res);
    //     if (res.code) {
    //       //发起网络请求
    //       wx.request({
    //         url: 'http://127.0.0.1:8000/api/login',
    //         data: {
    //           code: res.code
    //         },
    //         success: res => {
    //           console.log(res);
    //         },
    //         fail: error => {
    //           console.log(error)
    //         }
    //       })
    //     } else {
    //       console.log('登录失败！' + res.errMsg)
    //     }
    //   }
    // });

    
    // //获取用户的登录信息
    // user.checkLogin().then(res => {
    //   console.log('app login')
    //   this.globalData.userInfo = wx.getStorageSync('userInfo');
    //   this.globalData.token = wx.getStorageSync('token');
    // }).catch(() => {
      
    // });

  }
  
  // globalData: {
  //   userInfo: {
  //     nickname: '游客',
  //     username: '去登录',
  //     avatar: 'http://mp.fengyuexingzi.top/images/default_head.png'
  //   },
  //   token: '',
  // }

  // getUserInfo: function (cb) {
  //   var that = this
  //   if (this.globalData.userInfo) {
  //     typeof cb == "function" && cb(this.globalData.userInfo)
  //   } else {
  //     //调用登录接口
  //     wx.login({
  //       success: function () {
  //         wx.getUserInfo({
  //           success: function (res) {
  //             console.log(res);
  //             wx.setStorageSync('isFirst', res.userInfo);
  //             that.globalData.userInfo = res.userInfo
  //             typeof cb == "function" && cb(that.globalData.userInfo)
  //           }
  //         })
  //       }
  //     })
  //   }
  // },

})