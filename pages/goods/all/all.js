import {
  getGoods
} from '../../../http/request'
const app = getApp()
Page({
  data: {
    curTileIndex: 0,
    goodsList: null,
  },

  onLoad() {
    this.getGoods()
  },
  touchEnd(e) {
    let _this = this
    this.data.goodsList.map((item, index) => {
      const query = wx.createSelectorQuery()
      let domId = `#index${index}`
      query.select(domId).boundingClientRect()
      query.selectViewport().scrollOffset()
      query.exec(function (res) {
        if (res[0].top < res[1].scrollTop && res[0].bottom > res[1].scrollTop) {
          _this.setData({
            curTileIndex: index
          })
        }
      })
    })
  },
  curChange(e) {
    let top = 0

    this.setData({
      curTileIndex: e.currentTarget.dataset.index
    })

    for (let i = -1; i < e.currentTarget.dataset.index; i++) {
      const query = wx.createSelectorQuery()
      let domId = `#index${i+1}`
      query.select(domId).boundingClientRect()
      query.selectViewport().scrollOffset()
      query.exec(function (res) {
        if((i+1)==e.currentTarget.dataset.index){
          wx.pageScrollTo({
            scrollTop: top,
            duration: 300
          })
          return
        }
        e.currentTarget.dataset.index==0 ? top=0 : top += res[0].height
      })
    }
  },
  changeNum(e) {
    let mode = e.currentTarget.dataset.mode
    let goods = e.currentTarget.dataset.item
    let goodsAll = this.data.goodsList[0]
    let goodsCart = app.globalData.store.state.goodsAll
    let isInCart = false
    goods.bugNum = goods.bugNum ? goods.bugNum : 0

    goodsCart.map(item => {
      if (item.id == goods.id) {
        isInCart = true
        return item.bugNum++
      }
    })
    if (isInCart == true) {
      app.globalData.store.setState('goodsAll', goodsCart)
      return
    }
    mode == '+' ? goods.bugNum++ : goods.bugNum--
    goodsAll.find(item => {
      item.bugNum = (item.bugNum !== undefined ? item.bugNum : 0)
      if (item.id == goods.id) {
        item.bugNum = goods.bugNum
      }
    })
    app.globalData.store.setState('goodsAll', goodsAll)
  },
  getGoods() {
    let goodsList = []
    getGoods().then(res => {
      if (res.code == 0) {
        for (let i = 0; i < 3; i++) {
          let obj = {}
          obj[i + ''] = res.data
          goodsList.push(res.data)
        }
        this.setData({
          goodsList: goodsList
        })
      }
    })
  }
})