class Store {
  constructor() {
    this.state = {
      goodsDetail: null,  //当前被选中的商品的详情
      goodsCur: null,     //购物车当前被选中的商品
      goodsAll: [],     //购物车所有商品
      price: null,        //购物车价格
    }
  }
  getState(stateName){
    return this.state[stateName]
  }
  setState(stateName, val){
    this.state[stateName] = val
  }
  static isInstance() {
    return function () {
      if (!Store.instance) {
        Store.instance = new Store()
      }
      return Store.instance
    }
  }
}
let store = Store.isInstance()()

export default store