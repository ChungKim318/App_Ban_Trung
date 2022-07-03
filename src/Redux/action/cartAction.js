import { ADD_CART,REMOVE_CART,CLEAR_CART, MINUS_CART } from "../type";

export const addCart = (item,currentCart) =>{
  let checkExist = currentCart.cart.filter((value)=> value._id == item._id );
  //console.log('checkExist',checkExist)
  let newCart = currentCart.cart;
  if(checkExist.length == 0){
      newCart.push({
          ...item,
          SoLuong:1
      })
  } else {
      newCart.map((value)=>{
          if(value._id == item._id){
             // console.log('đã thêm hàng giống nhau')
              value.SoLuong +=1
          }     
      })
  }
    return {
        type: ADD_CART,
        payload : newCart
    }
}

export const removeCart = (item,currentCart) =>{
    let newCart = currentCart.cart.filter((value)=>value._id != item._id)
    return {
        type: REMOVE_CART,
        payload : newCart
    }
}

export const minusCart = (item,currentCart) =>{
    let newCart =currentCart.cart;
    newCart.map(value=>{
        if(value._id ==item._id){
            if(value.SoLuong > 1){
                value.SoLuong -=1
            }
        }
    })

    return {
        type: MINUS_CART,
        payload:newCart
    }

}

export const clearCart =() =>{
    return {
        type: CLEAR_CART,
       
    }
}