import React, { useState, useCallback } from "react";
import { Block, Button } from '../../components'
import { Text, Dimensions, FlatList, TextInput } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { onIsLoadingTrue, onIsLoadingFalse } from "../../Redux/action/appLoadingAction";
import { useDispatch } from "react-redux";
import { productApi } from "../../api";
import { AntDesign, Fontisto } from 'react-native-vector-icons';
import { Lobster_400Regular } from '@expo-google-fonts/lobster';
import { useFonts } from 'expo-font';
import ListItem from "./component/ListItem";
import Toast from 'react-native-toast-message';
import { navigate } from "../../router/NavigationService";


const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const ListHeader = () => {
    return (
        <Block row padding={5} backgroundColor='gainsboro' elevation={1} >
            <Block style={{ margin: 3, width: windowWidth / 6 }} ></Block>
            <Block style={{ margin: 3, width: windowWidth / 6 }} >
                <Text style={{ fontWeight: 'bold' }} >Thương hiệu</Text>
            </Block>
            <Block style={{ margin: 3, width: windowWidth / 6 }} >
                <Text style={{ fontWeight: 'bold' }} >Tên</Text>
            </Block>
            <Block style={{ margin: 3, width: windowWidth / 6 }} >
                <Text style={{ fontWeight: 'bold' }} >Phân loại</Text>
            </Block>
            <Block style={{ margin: 3, width: windowWidth / 6 }} >
                <Text style={{ fontWeight: 'bold' }} >Giá</Text>
            </Block>
        </Block>
    )
}

const Products = (props) => {
    const [productList, setProductList] = useState();
    const [productFilter, setProductFilter] = useState();
    const [token, setToken] = useState();


    const dispatch = useDispatch();


    const [fontsLoaded, error] = useFonts({
        Lobster_400Regular,
    })


    useFocusEffect(
        useCallback(
            () => {
                AsyncStorage.getItem("jwt").then(
                    (res) => {
                        setToken(res);
                    }
                ).catch(err => { console.log("Product", err) })

                GetAllProducts();

                return () => {
                    setProductList();
                    setProductFilter();

                }
            },
            []
        )
    )

    const searchProduct = keyword => {
        //  console.log('keyword', keyword)
        if (keyword != null) {
            let newArray = productList.filter((value, key) => {
                let stringSum = `${value.Ten} ${value.ThuongHieu} ${value.Loai.Ten} `;
                return stringSum.toLocaleLowerCase().indexOf(keyword.toLocaleLowerCase()) != -1;
            });

            setProductFilter(newArray);
        } else {
            setProductFilter(productList);
        }

    };
    //${i.Ten}${i.Loai.Ten}${i.Gia}
    const GetAllProducts = async () => {
        dispatch(onIsLoadingTrue())
        try {
            let data = await productApi.GetAllProducts();

            // console.log('dataProduct',data.data.response)
            if (data.data.success == true) {
                setProductList(data.data.response)
                setProductFilter(data.data.response);
                dispatch(onIsLoadingFalse())
            }

            dispatch(onIsLoadingFalse())
        } catch (err) {
            console.log(err)
            dispatch(onIsLoadingFalse())
        }

    }

    const DeleteProduct = async (id) => {
        dispatch(onIsLoadingTrue())
        try {

            AsyncStorage.getItem('jwt').then(async res => {
                // console.log("ListItem", "tokenn",res)
                // console.log("ListItem", "idđ",id)
                let data = await productApi.DeleteProduct(id, res)
                //console.log('ListItem',"datadelete",data.data.success);
                if (data.data.success == true) {
                    const products = productFilter.filter(item => item.id !== id)
                    setProductFilter(products)
                    dispatch(onIsLoadingFalse())
                    Toast.show({
                        topOffset: 60,
                        type: 'success',
                        text1: ` Xóa thành công.`,
                        text2: ` Sản phẩm ${props.Ten} xóa khỏi danh sách bán`
                    })


                } else {
                    dispatch(onIsLoadingFalse())
                    Toast.show({
                        topOffset: 60,
                        type: 'error',
                        text1: ` Xóa thất bại.`,
                        text2: ` Có lỗi xảy ra.Xin vui lòng thử lại sau!`
                    })

                }

            }).catch(err => {
                console.log(err)
                dispatch(onIsLoadingFalse())
            })



        } catch (err) {
            console.log(err)
            dispatch(onIsLoadingFalse())
        }
    }

    //console.log('Products ', "productFilter",productFilter)

    return (
        <Block height={windowHeight} width={windowWidth} marginTop={windowHeight * 0.035} >
            <Block marginTop={windowHeight * 0.001} height={windowHeight * 0.08} width={windowWidth * 0.95} justifyCenter alignCenter backgroundColor='#f7b731' marginHorizontal={windowWidth * 0.025} radius={10} >
                {fontsLoaded ? <Text style={{ fontFamily: 'Lobster_400Regular', fontSize: 24, color: 'black' }} > Quản lý sản phẩm </Text> : null}
            </Block>
            <Block height={windowHeight * 0.09} width={windowWidth} backgroundColor='red' marginTop={windowHeight * 0.01} row >
                <Button height='100%' width={windowWidth / 3} backgroundColor='#fa983a' row justifyCenter alignCenter border={1} borderColor='white'
                    onPress={() => navigate("Orders")}
                >
                    <Fontisto name="shopping-bag-1" size={24} color="white" />
                    <Text style={{ color: "white", fontSize: 16 }} > Hóa đơn</Text>
                </Button>
                <Button height='100%' width={windowWidth / 3} backgroundColor='#fa983a' row justifyCenter alignCenter border={1} borderColor='white'
                    onPress={() => navigate("ProductForm",{nameScreen:"Thêm sản phẩm"})}
                >
                    <Fontisto name="plus-a" size={24} color="white" />
                    <Text style={{ color: "white", fontSize: 16 }} > Sản phẩm</Text>
                </Button>
                <Button height='100%' width={windowWidth / 3} backgroundColor='#fa983a' row justifyCenter alignCenter border={1} borderColor='white'
                    onPress={() => navigate("Categories")}
                >
                    <Fontisto name="plus-a" size={24} color="white" />
                    <Text style={{ color: "white", fontSize: 16 }} > Phân lọai</Text>
                </Button>
            </Block>
            <Block height={windowHeight * 0.08} paddingHorizontal={5} marginHorizontal={5} row alignCenter radius={10} border={5} borderColor='#ffa801' marginTop={5} >
                <AntDesign name="search1" size={24} color="#ffa801" />
                <TextInput
                    placeholder='thương hiệu / tên / loại...'
                    style={{ height: '100%', marginHorizontal: 5, width: windowWidth * 0.7 }}
                    placeholderTextColor={'grey'}

                    onChangeText={text => {

                        searchProduct(text);
                    }}
                />
            </Block>
            <Block height={windowHeight * 0.6} >
                <FlatList
                    data={productFilter}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => {
                        //console.log("Products " ,"item",item);
                        return (
                            <ListItem item= {item} index={index} delete = {DeleteProduct}  />
                        )
                    }}
                    ListHeaderComponent={ListHeader}
                />
            </Block>

        </Block>
    )
}

export default Products;