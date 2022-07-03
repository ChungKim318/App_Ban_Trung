import { ADD_CART,REMOVE_CART,CLEAR_CART, MINUS_CART } from "../type";

const initState = {
    cart:[]
}

const cartReducer = (state = initState, action) =>{
    switch(action.type){
        case ADD_CART :
            return {
                cart: action.payload
            }
        case REMOVE_CART:
            return {
                cart: action.payload
            }
        case MINUS_CART:
            return{
                cart: action.payload
            }
        case CLEAR_CART:
            return {
                cart : []
            }
    }
    return state;
}

export default cartReducer;