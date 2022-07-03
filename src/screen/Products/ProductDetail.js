import React, { useState, useEffect } from 'react';
import { Block, Button } from '../../components';
import { Image, ScrollView, Text, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native';
import { Lobster_400Regular } from '@expo-google-fonts/lobster';
import { 
    AlexBrush_400Regular 
  } from '@expo-google-fonts/alex-brush'
import { useFonts } from 'expo-font';
import { MaterialCommunityIcons, Fontisto, AntDesign } from '@expo/vector-icons';

import formatMoney from '../../hooks/fomatMoney';
import * as actions from '../../Redux/action/cartAction';
import { navigate } from '../../router/NavigationService';
import { useDispatch, useSelector } from 'react-redux';
import  Toast from 'react-native-toast-message';


const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;


const ProductDetail = (props) => {

    const [fontsLoaded, error] = useFonts({
        Lobster_400Regular,
        AlexBrush_400Regular
    });
    const dispatch = useDispatch();
    let dataCart = useSelector(state => state.cartReducer.cart);
    


    //console.log("productdetail",props)

    const AddProduct =(item)=>{
        dispatch(actions.addCart(item,{cart : dataCart}))
    }

    const [product, setProduct] = useState(props?.route?.params?.item);
    const [mota,setMota] = useState([]);

    useEffect(()=>{
        let mt = product.MoTa.split('.');
        //console.log("ProductDetail","Mota",mt)
        setMota(mt);

        return () => {
            setMota([]);
        }

    },[product])
    
    // console.log(product);
    return (
        <SafeAreaView style={{ position: 'absolute', height: '100%' }} >
            <Block height='10%' row backgroundColor='orange' justifyContent='space-between' alignCenter  >
            <Button marginLeft={windowWidth * 0.02} onPress={() => props.navigation.navigate(props?.route?.params?.backScreen)} >
             <AntDesign name="left" size={35} color="white" />
            </Button>
            <Block>
                <Text style={{fontSize:25,color:'white'}} >{formatMoney(product.Gia)}đ/chục</Text>
            </Block>
            <Button position='absolute' height='90%' width={windowWidth * 0.2} row backgroundColor='#fff' shadow={10} marginHorizontal={windowWidth * 0.05} radius={20}  alignCenter justifyCenter   
            onPress={()=> {
                AddProduct(product)
                Toast.show({
                    topOffset:60,
                    type:'success',
                    text1:`${product.Ten} đã được thêm vào giỏ hàng.` ,
                    text2:'Đến giỏ hàng để tiến hành thanh toán.'
                })
            }}
            >
            <Fontisto name="shopping-basket-add" size={windowWidth * 0.1} color="#f0932b" />
            </Button>
            </Block>
            
            <Block height='78%' >
            <ScrollView height='100%' >
                <Block height={windowHeight*0.5} >
                    <Image
                        source={{
                            uri: product.Image ? product.Image : 'https://media.healthplus.vn/thumb_x650x382/Images/Uploaded/Share/2017/09/08/nhung-loai-trung-nen-an-de-tot-cho-suc-khoe11504842188.jpg'
                        }}
                        resizeMode="contain"
                        style={{
                            height: windowHeight * 0.5,
                            width: windowWidth
                        }}
                    />
                </Block>
                <Block justifyCenter alignCenter height='5%' marginTop={windowHeight*0.05} >
                    {!fontsLoaded ? null : <Text style={{ fontFamily: 'Lobster_400Regular', fontSize: 40 }} >{product?.Ten}</Text>}
                </Block>
                <Block justifyCenter alignCenter row height='5%' marginTop={windowHeight*0.02} >
                    <MaterialCommunityIcons name="egg-easter" size={24} color="#f39c12" />
                    {!fontsLoaded ? null : <Text style={{fontSize: 20 }} >{product?.ThuongHieu}</Text>}
                    <MaterialCommunityIcons name="egg-easter" size={24} color="#f39c12" />
                </Block>
                <Block marginBottom={70}  >
                <Text style={{fontSize:20}} >
                    Mô tả :
                </Text>
                <Block marginTop={windowHeight*0.02} >
                     {mota ? mota.map((item,index)=>{
                         return(
                             <Block key={index.toString()} paddingVertical={2} justifyCenter  >
                                <Text style={{fontSize:16}} > - {item}.</Text>
                             </Block>
                         )
                     }): null}   
                </Block>
                </Block>
                
               
               
            </ScrollView>
            </Block>
            
        </SafeAreaView>
    )
}

export default ProductDetail;