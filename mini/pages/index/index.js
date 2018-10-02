const util = require('../../utils/util.js');
const api = require('../../config/api.js');
const user = require('../../services/user.js');

//获取应用实例
const app = getApp()
Page({
  data: {
    newGoods: [],
    hotGoods: [],
    topics: [],
    brands: [],
    floorGoods: [],
    carouselInfo: [],
    specialList: [],
    userInfo: {}
  },
  onShareAppMessage: function () {
    return {
      title: 'MiniShop',
      desc: 'MiniShop',
      path: '/pages/index/index'
    }
  },

  getIndexData: function () {
    let that = this;
    util.request(api.IndexUrl).then(function (res) {
      if (res.code == 200) {
        that.setData({
          newGoods: res.data.newGoodsList,
          hotGoods: res.data.hotGoodsList,
          topics: res.data.topicList,
          brand: res.data.brandList,
          floorGoods: res.data.categoryList,
          carouselInfo: res.data.carouselInfo,
          specialList: res.data.specialList
        });
      }
    });
  },
  onLoad: function (options) {

    //this.getIndexData();
    var that = this
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
    
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  jump:function(event){
    var jurl = event.currentTarget.dataset.url
    wx.reLaunch({
      url: jurl,
    })
  },
})
