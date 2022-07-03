import React, { useState, useEffect } from 'react';
import { SafeAreaView, Dimensions, Picker, FlatList } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Block } from '../../components';
import { Text } from '../../components';
import { onIsLoadingTrue, onIsLoadingFalse } from '../../Redux/action/appLoadingAction';
import { useDispatch } from 'react-redux';
import { orderApi } from '../../api';
import Toast from "react-native-toast-message";
import moment from 'moment';
import { useIsFocused } from '@react-navigation/native';
import formatMoney from '../../hooks/fomatMoney';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import {navigate} from '../../router/NavigationService'

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;


const Processing = (props) => {
    const [pickedTrangThai, setPickedTrangThai] = useState('Tất cả hóa đơn');
    const [orders, setOrders] = useState([])
    const [ordersOri, setOrdersOri] = useState([])
    const dispatch = useDispatch();
    const isFocused = useIsFocused();

    useEffect(() => {

    AsyncStorage.getItem('id').then(res=>{
        if(res){
            GetAllOrderById(res)
        }else{
            Toast.show({
                topOffset: 60,
                type: 'error',
                text1: "Tải dữ liệu hóa đơn thất bại",
                text2: 'Vui lòng đăng nhập để tải hóa đơn.'
            })
           
            
        }
        
    }).catch(err=>console.log(err))

    return () =>{
        setOrders([]);
        setOrdersOri([])
    }

    }, [isFocused])
    console.log('oderrrrrrrList',orders);

    const GetAllOrderById = async (id) => {
        dispatch(onIsLoadingTrue())
        try {
            let data = await orderApi.GetAllOrderById(id)
            if (data.data.success == true) {
                setOrders(data.data.response);
                setOrdersOri(data.data.response);
                dispatch(onIsLoadingFalse())
            } else {
                dispatch(onIsLoadingFalse())
                Toast.show({
                    topOffset: 60,
                    type: 'error',
                    text1: "Tải dữ liệu thất bại",
                    text2: 'Xin vui lòng thử lại sau '
                })
            }
        } catch (err) {
            console.log(err);
            dispatch(onIsLoadingFalse())
        }
    }

    return (
        <Block marginTop={5} height={windowHeight * 0.9} width={windowWidth}  >
            <Block height='10%' width='100%' border={5} borderColor='orange' radius={10} justifyCenter alignCenter >
                <Picker
                    selectedValue={pickedTrangThai}
                    style={{ height: windowHeight * 0.06, width: '90%', color: 'orange' }}
                    onValueChange={(itemValue, itemIndex) => {
                        setPickedTrangThai(itemValue)
                        if(itemValue == 'Tất cả hóa đơn'){
                            setOrders(ordersOri);
                        }else{
                            let od = ordersOri.filter(item=>item.TrangThai == itemValue)
                            setOrders(od);
                        }
                        
                    }}
                >
                    <Picker.Item label="Tất cả hóa đơn" value='Tất cả hóa đơn' />
                    <Picker.Item label="Đang xử lý" value='Đang xử lý' />
                    <Picker.Item label="Đang vận chuyển" value='Đang vận chuyển' />
                    <Picker.Item label="Đã giao" value='Đã giao' />
                    <Picker.Item label="Đã hủy" value='Đã hủy' />

                </Picker>
            </Block>
            <Block height='75%' width='100%' marginTop={10}  >
              {orders !==[] ?   <FlatList  

                data={orders}
                inverted
                keyExtractor={(item,index)=>index.toString()}
                renderItem={({item,index})=>{
                    return(
                        <Block marginTop={10} height={windowHeight*0.4} width={windowWidth} shadow backgroundColor='#ffeaa7' radius={10} >
                            <Block height={windowHeight*0.1} width={windowWidth} backgroundColor='#fdcb6e' justifyCenter alignCenter radius={20} >
                            <FlatList 
                            data={item?.DsSanPham}
                            horizontal={true}
                            keyExtractor={(item,index)=>index.toString()}
                            renderItem={({item,index})=>{
                                return(
                                    <Block  row justifyContent='space-between' alignCenter paddingHorizontal={20}  height={windowHeight*0.07} width={windowWidth}  >
                                        <Text>{item.SanPham.Ten}</Text>
                                        <Text>X{item.SoLuong}</Text>
                                    </Block>
                                )
                            }}
                            />
                            <Block row justifyContent='space-between' width={windowWidth} >
                            <MaterialCommunityIcons name="gesture-swipe-right" size={30} color="black" />
                            <MaterialCommunityIcons name="gesture-swipe-left" size={30} color="black" />
                            </Block>
                            </Block>
                            
                            <Block row justifyContent='space-between' alignCenter paddingHorizontal={20}  height={windowHeight*0.05} width={windowWidth}  >
                                <Text>Trạng thái</Text>
                                <Text>{item.TrangThai}</Text>
                            </Block>
                            <Block row justifyContent='space-between' alignCenter paddingHorizontal={20}  height={windowHeight*0.05} width={windowWidth} >
                                <Text>Tổng tiền</Text>
                                <Text>{formatMoney(item.TongTien)}đ</Text>
                            </Block>
                            <Block row justifyContent='space-between' alignCenter paddingHorizontal={20}  height={windowHeight*0.05} width={windowWidth}  >
                                <Text>Ngày mua</Text>
                                <Text>{moment(item.NgayMua).format('DD/MM/YY')}</Text>
                            </Block>
                        </Block>
                    )
                }}
                
                /> : <Block height={windowHeight*0.2} width={windowWidth} backgroundColor='red' > <Text>Không có hóa đơn !</Text> </Block> }
            </Block>

        </Block>
    )
}

export default Processing;