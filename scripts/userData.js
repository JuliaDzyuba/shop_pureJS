import { setLocalStorage, getLocalStorage } from './storage.js';


const userData = {
  wishListData: getLocalStorage('userWish'),

  get wishList() {
    // console.log('wishListData: ', this.wishListData);
    return this.wishListData;
  },

  set wishList(id) {
    // console.log('wishListData: ', this.wishListData);
    if(this.wishListData.includes(id)){
      const index = this.wishListData.indexOf(id);
      this.wishListData.splice(index, 1);
    } else {
      this.wishListData.push(id);
    }
    setLocalStorage('userWish', this.wishList);
  },

  cartListData: getLocalStorage('userCart'),

  get cartList() {
    return this.cartListData;
  },

  set cartList(id) {
    let obj = this.cartListData.find( item => item.id === id);
     
    if(obj){
      obj.count++;
    }else{
      obj = {
        id,
        count: 1,
      };
      this.cartListData.push(obj);
    }
    setLocalStorage('userCart', this.cartList);
  },


  set changeCountCartList(itemCart) {
    let obj = this.cartListData.find( item => item.id === itemCart.id);
    obj.count = itemCart.count;

    setLocalStorage('userCart', this.cartList);
  },

  set deleteItemCart(idd) {
    let index = -1;
    this.cartList.forEach((item, i) => {
      if(item.id === idd){
        index = i;

      }
    });
    this.cartList.splice( index, 1);

    setLocalStorage('userCart', this.cartList);
  }

};

export default userData;


// {
//   id: 'idd015',
//   count: 3
// },
// {
//   id: 'idd045',
//   count: 1
// },
// {
//   id: 'idd075',
//   count: 2
// },