// pages/cart/cart.js
const app = getApp()
Page({
  data: {
    goodsAll: null,
    priceAll: 0,
  },
  onShow() {
    this.goodsInit()
    this.priceInit()
  },
  goodsInit() {
    let goodsAll = app.globalData.store.getState('goodsAll')
    this.setData({
      goodsAll
    })
  },
  changeNum(e) {
    let mode = e.currentTarget.dataset.mode
    let goods = e.currentTarget.dataset.item
    let goodsAll = this.data.goodsAll
    if (mode == '-' && !goods.bugNum) {
      return
    }
    let priceAll = this.data.priceAll
    mode == '+' ? goods.bugNum++ : goods.bugNum--
    mode == '+' ? priceAll += goods.minPrice : priceAll -= goods.minPrice
    goodsAll.find(item => {
      if (item.id == goods.id) {
        return item.bugNum = goods.bugNum
      }
    })
    this.setData({
      goodsAll
    })
    this.setData({
      priceAll
    })
    this.storeInit()
    if (mode == '-' && goods.bugNum == 0) {

      goodsAll = goodsAll.filter(item => {
        item.id != goods.id
      })
      this.setData({
        goodsAll
      })
      return
    }
  },
  storeInit() {
    app.globalData.store.setState('goodsAll', this.data.goodsAll)
  },
  priceInit() {
    let priceAll = 0
    this.data.goodsAll.map(item => {
      priceAll += (item.bugNum * item.minPrice)
    })
    this.setData({
      priceAll
    })
  }
})