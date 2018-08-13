var util = require('./utils/util.js');
 var api = require('./config/api.js');
var user = require('./services/user.js');

App({
  onLaunch: function () {
    //获取用户的登录信息
    user.checkLogin().then(res => {
      console.log('app login')
      this.globalData.userInfo = wx.getStorageSync('userInfo');
      this.globalData.token = wx.getStorageSync('token');
    }).catch(() => {
      
    });
  },
  
  globalData: {
    userInfo: {
      nickname: '游客',
      username: '去登录',
      avatar: 'http://mp.fengyuexingzi.top/images/default_head.png'
    },
    token: '',
  }
})