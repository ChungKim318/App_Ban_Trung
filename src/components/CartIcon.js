import React from "react";
import { Block,Text } from ".";

import { connect,useDispatch,useSelector } from "react-redux";


const CartIcon = (props) =>{
   
    // let dataCart = useSelector(state => state.cartReducer.cart)
   // console.log('props',props)

return (
    <>
    {
        props?.dataCart?.cart.length ? (
            <Block width={25} position='absolute' justifyCenter  alignCenter top={-5} right={-10} height={25} backgroundColor='red' radius={20} >
            <Text style={{ fontSize:12,fontWeight:'bold',}}>{props.dataCart.cart.length}</Text>
                 </Block>
        ) : null
    } 
   
    
    </>
)

}

const mapStateToProps = (state) => {
    const carts = state.cartReducer
    //console.log('cartIconnn', carts)
    return {
        dataCart: carts,
    };
}

export default connect(mapStateToProps)(CartIcon)
// export default CartIcon;