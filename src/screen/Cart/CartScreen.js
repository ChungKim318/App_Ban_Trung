import React, { useState, useEffect } from 'react';
import { Block, Button } from '../../components';
import { Text, Dimensions, SafeAreaView, Image, FlatList } from 'react-native';
import { Lobster_400Regular } from '@expo-google-fonts/lobster';
import { useFonts } from 'expo-font';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import formatMoney from '../../hooks/fomatMoney';
import { AntDesign, MaterialCommunityIcons,FontAwesome} from 'react-native-vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as actions from '../../Redux/action/cartAction';



const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;


const CartScreen = (props) => {
    const [tongTien, setTongTien] = useState(0);
    const [tongTienCuoi,setTongTienCuoi] = useState(0);
    const [checkChangeState, setCheckChangeState] = useState(false);
    const [isHoaDonDo,setIsHoaDonDo] = useState(false);

    const dataCart = props?.dataCart?.cart;
    // console.log('dataCartScreen',props?.dataCart.cart);
    const isFocused = useIsFocused();
    const dispatch = useDispatch();



    useEffect(() => {
        calSum();
    }, [isFocused, checkChangeState])


    const [fontsLoaded, error] = useFonts({
        Lobster_400Regular,
    })

    // var TongTien = 0;
    // dataCart?.forEach(value => {
    //     return (TongTien += value.SanPham.Gia)
    // })

    const calSum = () => {
        let sum = 0; let sumCuoi = 0;
        dataCart?.map(value => {
            // console.log('valuee',value);
            sum += value.SoLuong * value.Gia;
            // console.log('summ',sum)
        })
        
        setTongTien(sum);
        if(isHoaDonDo){
            sumCuoi= sum + 0.1*sum;
            setTongTienCuoi(sumCuoi);
        }else{
            
            setTongTienCuoi(sum)
        }
    }

    

    const AddProduct = (item) => {
        dispatch(actions.addCart(item, { cart: dataCart }))
        
        setCheckChangeState(!checkChangeState)
    }

    const deleteProduct = (item) => {
        dispatch(actions.removeCart(item, { cart: dataCart }))
        
        setCheckChangeState(!checkChangeState)
    }

    const minusProduct = (item) => {
        dispatch(actions.minusCart(item, { cart: dataCart }))
        
        setCheckChangeState(!checkChangeState)
    }

    const HoaDonDo = (item) => {
        setIsHoaDonDo(!isHoaDonDo);
        setCheckChangeState(!checkChangeState);
       
    }


    return (
        <SafeAreaView flex={1} backgroundColor='#f7b731' >
            <Block  height={windowHeight * 0.08} width={windowWidth * 0.95} justifyCenter alignCenter backgroundColor='#f7b731' marginHorizontal={windowWidth * 0.025} radius={10} >
                {fontsLoaded ? <Text style={{ fontFamily: 'Lobster_400Regular', fontSize: 24, color: 'black' }} > Sản phẩm đã chọn </Text> : null}
            </Block>
            <Block height={windowHeight * 0.92}   >

                {dataCart?.length > 0 ?
                    <Block alignCenter>
                        <Block height={windowHeight * 0.4} width={windowWidth * 0.95}  radius={15} backgroundColor='#fad390' justifyCenter alignCenter >
                            <Block height={windowHeight * 0.4} width={windowWidth * 0.9} >
                                <FlatList
                                    data={dataCart}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({ item }) =>
                                        <Block>
                                        <Block marginTop={5} height={windowWidth * 0.35}  radius={20} row  >

                                            <Image style={{
                                                height: windowWidth * 0.2, width: windowWidth * 0.2, borderRadius: 40,
                                            }}
                                                source={{ uri: item.Image ? item.Image : 'https://media.healthplus.vn/thumb_x650x382/Images/Uploaded/Share/2017/09/08/nhung-loai-trung-nen-an-de-tot-cho-suc-khoe11504842188.jpg' }}
                                            />
                                            <Block width={windowWidth * 0.57} paddingHorizontal={5} marginLeft={10}  >
                                                <Text>Sản phẩm :  <Text style={{ fontSize: 16, fontWeight: 'bold' }} > {item.Ten}</Text> </Text>
                                                <Block row >
                                                    <Text>Số lượng :  <Text style={{ fontSize: 16, fontWeight: 'bold' }} > {item.SoLuong}</Text> </Text>
                                                    <Button marginHorizontal={5} onPress={() => minusProduct(item)} >
                                                        <AntDesign name="minuscircle" size={24} color="#2ed573" />
                                                    </Button>
                                                    <Button marginHorizontal={5} onPress={() => AddProduct(item)} >
                                                        <AntDesign name="pluscircle" size={24} color="#2ed573" />
                                                    </Button>
                                                </Block>
                                                <Text>Giá :  <Text style={{ fontSize: 16, fontWeight: 'bold' }} > {formatMoney(item.Gia)}đ</Text> </Text>
                                                <Text>Thành tiền :  <Text style={{ fontSize: 16, fontWeight: 'bold' }} > {formatMoney(item.Gia*item.SoLuong)}đ</Text> </Text>
                                            </Block  >
                                            <Button width={windowWidth * 0.1} backgroundColor='red' radius={15} height={windowWidth * 0.1} justifyCenter alignCenter onPress={() => deleteProduct(item)} >
                                                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff' }} >X</Text>
                                            </Button>

                                        </Block>
                                        <Block height={3} backgroundColor="#fff" />
                                        </Block>


                                    }
                                />
                            </Block>
                        </Block>

                        <Block height={windowHeight * 0.25} width={windowWidth * 0.95} marginTop={10} radius={15} backgroundColor='#fad390' justifyCenter alignCenter >
                            <Block height={windowHeight * 0.05} width={windowWidth * 0.9} row justifyContent='space-between' alignCenter  >
                                <Text>Tổng giá sản phẩm:</Text>
                                <Text style={{fontSize:17}} >{formatMoney(tongTien)}đ</Text>
                            </Block>
                            <Block height={windowHeight * 0.05} width={windowWidth * 0.9} row justifyContent='space-between' alignCenter  >
                                <Text>In hóa đơn đỏ:</Text>
                                <Button 
                                    onPress={()=>HoaDonDo()}
                                >
                                    <FontAwesome name="check-square-o" size={30} color={isHoaDonDo?'blue':'grey'} />
                                </Button>
                            </Block>
                            <Block height={windowHeight * 0.05} width={windowWidth * 0.9} row justifyContent='space-between' alignCenter >
                                <Text  >Tổng tiền:</Text>
                                <Text style={{fontSize:17}} >{formatMoney(tongTienCuoi)}đ</Text>
                            </Block>
                            <LinearGradient start={{ x: 1, y: 1 }} end={{ x: 0.3, y: 0.8 }}
                                colors={['#fc4a1a', '#f7b733']}
                                style={{ paddingLeft: 15, paddingRight: 15, borderRadius: 5 }} >
                                <Button height={windowHeight * 0.06} width={windowWidth * 0.7} justifyCenter alignCenter row 
                                    onPress={()=>props.navigation.navigate('Payment',{tongTien:tongTienCuoi,DsSanPham:dataCart})}
                                >
                                    <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#fff', textAlign: 'center', letterSpacing: 2, }} >Thực Hiện Đơn Hàng</Text>
                                    <MaterialCommunityIcons style={{ color: '#fff', paddingLeft: 20 }} name="gesture-swipe-left" size={30} color="black" />
                                </Button>
                            </LinearGradient>
                        </Block>

                    </Block>
                    : <Block alignCenter width={windowWidth} marginTop={20} height={windowHeight * 0.45}  >
                        <Block radius={15} width={windowWidth * 0.9} height={windowHeight * 0.45} backgroundColor='#fad390' justifyCenter alignCenter >
                            <Text style={{ fontSize: 16, textAlign: 'center' }} > Hiện bạn chưa có sản phẩm nào trong giỏ hàng.Hãy mua ngay kẻo lỡ ! </Text>
                        </Block>
                        
                    </Block>
                }

            </Block>

            <Block height={windowHeight * 0.1} marginHorizontal={windowHeight * 0.02} backgroundColor='#dcdde1' />

        </SafeAreaView>
    )
}

const mapStateToProps = (state) => {
    const carts = state.cartReducer
    //console.log('carttt', carts)
    return {
        dataCart: carts,
    };
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         RemoveCart: (product) =>
//             dispatch(actions.removeCart(product))
//     }
// }

export default connect(mapStateToProps, null)(CartScreen);
// export default CartScreen;