import React,{useState,useEffect} from 'react';
import {
    TouchableOpacity, Dimensions,StyleSheet,
    Image

} from 'react-native';
import { Block,Text,Button } from '../../../components';
import formatMoney from '../../../hooks/fomatMoney';
import { connect,useDispatch,useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import * as actions from '../../../Redux/action/cartAction';
import  Toast from 'react-native-toast-message';


const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;




const ProductCard = (props) =>{
    const { Ten,Gia ,TonKho} = props;
    let dataCart = useSelector(state => state.cartReducer.cart);
   
  // console.log('dataCart',dataCart)

    const dispatch = useDispatch();
    const isFocused = useIsFocused();

    

const AddProduct =(item)=>{
    dispatch(actions.addCart(item,{cart : dataCart}))
}



return (
   <Block style={styles.container}  >
       <Image style={styles.image}
        resizeMode='stretch'
        source={{uri: props.Image ? props.Image : "https://image-sanpham-trung.s3.ap-southeast-1.amazonaws.com/trung_ga_ngam_xi_dau1.PNG-1639047159116.png"}}
       />
       <Block style={styles.card} />
       <Block height={windowHeight*0.07} >
       <Text style={styles.title} >
        {Ten.length > 15 ? Ten.substring(0,15-3)+'...': Ten}
       </Text>
       <Text style={styles.price} >
        {formatMoney(Gia)} đ/chục
       </Text>
       </Block>
       
       
       { TonKho > 0 ? (
           <Block height={windowHeight*0.06} marginTop={windowHeight*0.05} width={(windowWidth/2)-20} marginBottom={windowHeight*0.15} justifyCenter alignCenter radius={10} backgroundColor='orange'>
            <Button height={windowHeight*0.06} width={(windowWidth/2)-20} justifyCenter alignCenter
             onPress={()=>{
                AddProduct(props);
                Toast.show({
                    topOffset:60,
                    type:'success',
                    text1:`${Ten} đã được thêm vào giỏ hàng.` ,
                    text2:'Đến giỏ hàng để tiến hành thanh toán.'
                })
                // props.addProductCart(props)
                // console.log(props)
            }}  >
                <Text>
                    Mua ngay
                </Text>
            </Button>
           </Block>
       ):  <Block height={windowHeight*0.06}  marginTop={windowHeight*0.05} width={(windowWidth/2)-20} marginBottom={50} justifyCenter alignCenter radius={10} backgroundColor='transparent'padding={10}>
           <Text style={{color:'red'}} > Hiện tại hết hàng</Text>
            </Block> }
   </Block>
)

};

// const mapStateToProps = (state) => {
//     const carts = state.cartReducer
//     // console.log('carttt', carts)
//     return {
//         cart: carts,
//     };
// }

// const mapDispatchToProps = (dispatch) =>{
//     return {
//         addProductCart: (product) =>
//             dispatch(actions.addCart({SoLuong: 1, SanPham:product}))     
//     }
// }



const styles = StyleSheet.create({
    container:{
        width:windowWidth/2-20,
        height:windowHeight*0.35,
        borderRadius:10,
        marginTop:windowHeight*0.05,
        marginBottom:0,
        marginLeft:10,
       
        elevation:8,
        backgroundColor:'#fff',
    },
    image:{
        width:windowWidth/2 -20,
        height:windowHeight*0.15,
        backgroundColor:'transparent',
        position:'absolute',
        top: 0,
        borderRadius:10
    },
    card:{
        height: windowHeight*0.15,
        backgroundColor:'transparent',
        width:windowWidth/2 -20 -10,
        marginBottom:windowHeight*0.02
        

    },
    title:{
        fontWeight:'bold',
        fontSize:14,
        marginLeft:10,
        marginTop:windowHeight*0.005,
        
    },
    price:{
        fontSize:15,
        color:'#fa8231',
        marginTop:windowHeight*0.005,
        marginLeft:10
    }

});

export default ProductCard;