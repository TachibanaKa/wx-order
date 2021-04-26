const base_url = 'https://api.it120.cc'
const WXAPI = require('apifm-wxapi')
WXAPI.init('dc3dcd4561e53e577b1a9c823dd66008')
const config = {
  version: '1.0',
  domain: 'dc3dcd4561e53e577b1a9c823dd66008'
}

function request(url, data, method) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${base_url}/${config.domain}/${url}`,
      method: method ? method : 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data
      ,
      success: (res) => {
        if(res.data.code!==200){console.log(url)}
        resolve(res.data)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}
const register = (data) => {
  return request('user/wxapp/register/complex', data)
}
const login = (data) => {
  return request('user/wxapp/login', data)
}
const getGoods = (data) => {
  return WXAPI.goods(data)
}
const getBanner = (data) => {
  return WXAPI.banners(data)
}
export {
  register,
  login,
  getGoods,     //所有商品
  getBanner,    //轮播图
}