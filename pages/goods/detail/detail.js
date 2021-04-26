const app = getApp()
Page({
  data: {
    goods: null
  },
  onLoad() {
    this.getGoods()
  },
  getGoods() {
    let goods = app.globalData.store.state.goodsDetail
    app.globalData.store.state.goodsAll.find(item=>{
      if(item.id == goods.id){
        return goods.bugNum = item.bugNum
      }
    })
    this.setData({
      goods
    })
  },
  addGoods() {
    let goods = this.data.goods;
    (goods.bugNum || goods.bugNum==0) ? goods.bugNum++ : goods.bugNum=1
    this.setData({goods})
    this.storeInit()
    wx.showToast({
      title: '添加成功',
      icon: 'success',
      duration: 2000
    })
  },
  toCart(){
    wx.switchTab({
      url: '/pages/cart/cart',
    })
  },
  changeNum(e){
    if(e.currentTarget.dataset.mode=='-' && !this.data.goods.bugNum){
      return
    }
    this.data.goods.bugNum ? this.data.goods.bugNum :this.data.goods.bugNum = 0
    let goods = this.data.goods
    e.currentTarget.dataset.mode=='+' ? goods.bugNum++ :goods.bugNum--
    this.setData({goods})
    this.storeInit()
  },
  storeInit(){
    let isExist = false
    let goodsAll = app.globalData.store.state.goodsAll
    goodsAll.map(item => {
      if (this.data.goods.id == item.id) {
        item.bugNum = this.data.goods.bugNum
        isExist = true
      }
    })
    if (isExist == false) {
      goodsAll.push(this.data.goods)
    }
    app.globalData.store.setState('goodsAll', goodsAll)
  }
})