import React, { useState, useCallback } from 'react';
import {
    StyleSheet, FlatList, TextInput, Dimensions, SafeAreaView, KeyboardAvoidingView,
    Platform, Modal, Pressable, TouchableOpacity
} from 'react-native';
import {
    Block, Text
} from '../../components';

import ProductList from './components/ProductList';
import { AntDesign } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

import Banner from './components/Banner';
import ProductFilter from './components/ProdctFilter';
import { Header } from '../../components'
import AppLoading from '../../components/AppLoading';
import { categoryApi, productApi } from '../../api';
import { onIsLoadingTrue, onIsLoadingFalse } from '../../Redux/action/appLoadingAction';
import { useDispatch } from 'react-redux';

const data = require('../../assets/data/products.json');
const category = require('../../assets/data/categories.json')

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const ProductContainer = () => {
    const [products, setProducts] = useState([]);
    const [productsFilter, setProductsFilter] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isFilter, setIsFilter] = useState(false);
    
    const dispatch = useDispatch();

    useFocusEffect((
        useCallback(
            ()=>{
               
        
        
        
        
        GetAllCategories();
        GetAllProducts();
        return () => {
            setProducts([]);
            setCategories([]);
            setProductsFilter([])
        }

    },[])))

 

  const GetAllCategories = async () => {
      dispatch(onIsLoadingTrue())
      try {
        let data = await categoryApi.GetAllCategories();

      //  console.log('dataCategory',data.data)
        if(data.data.success==true){
            setCategories(data.data.response)
            dispatch(onIsLoadingFalse())
        }
        dispatch(onIsLoadingFalse())
      }catch (err){
        console.log(err)
        dispatch(onIsLoadingFalse())
      }
      
   }

   const GetAllProducts = async () => {
    dispatch(onIsLoadingTrue())
    try {
      let data = await productApi.GetAllProducts();

     // console.log('dataProduct',data.data.response)
      if(data.data.success==true){
          setProducts(data.data.response)
          setProductsFilter(data.data.response);
          dispatch(onIsLoadingFalse())
      }
      
      dispatch(onIsLoadingFalse())
    }catch (err){
      console.log(err)
      dispatch(onIsLoadingFalse())
    }
    
 }

    const searchProduct = keyword => {
      //  console.log('keyword', keyword)
        if (keyword != null) {
            let newArray = productsFilter.filter((value, key) => {
                let stringSum = `${value.Ten}`;
                return stringSum.toLocaleLowerCase().indexOf(keyword.toLocaleLowerCase()) != -1;
            });

            setProducts(newArray);
        } else {
            setProducts(productsFilter);
        }

    };

    

    return (
        
       
        <SafeAreaView flex={1} backgroundColor='#dcdde1'  >
            
            
            <Block row height={windowHeight * 0.08} backgroundColor='#fff' >

                <Block height={windowHeight * 0.08} paddingHorizontal={5} marginHorizontal={5} row alignCenter radius={10} border={5} borderColor='#ffa801' >
                    <AntDesign name="search1" size={windowHeight*0.04} color="#ffa801" />
                    <TextInput
                        placeholder='Bạn muốn tìm gì...'
                        style={{ height: '90%', marginHorizontal: 5, width: windowWidth * 0.7 }}
                        placeholderTextColor={'grey'}

                        onChangeText={text => {

                            searchProduct(text)
                        }}
                    />
                </Block>
                <Block justifyCenter alignCenter >
                    <TouchableOpacity onPress={() => setIsFilter(!isFilter)} >
                        <AntDesign name="filter" size={windowHeight*0.05} color="#ffa801" />
                    </TouchableOpacity>
                </Block>
            </Block>


            <Block height={windowHeight*0.8} width='100%'  row >
                {isFilter ? <Block backgroundColor='#f7b731' borderColor='#f7b731' height='100%' width='30%' borderRadius={10} border={5} >
                    <ProductFilter category={categories} isFilter={isFilter} setIsFilter={setIsFilter}
                        products={products} setProducts={setProducts} productsFilter={productsFilter}
                        setProductsFilter={setProductsFilter}
                    />
                </Block> : null}
                <Block height='100%' marginBottom={50} marginTop={5} backgroundColor='#dcdde1' width={!isFilter ? '100%' : '70%'} >
                    {products.length > 0 ? <FlatList
                        numColumns={2}
                        data={products}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) =>
                            <ProductList
                                isFilter={isFilter}
                                key={item.id}
                                item={item}
                            />
                        }
                        ListHeaderComponent={() =>
                            <Block justifyCenter alignCenter  >
                                <Banner />
                            </Block>
                        }
                        ListFooterComponent={()=>{
                            return(
                            <Block height={50} width={windowWidth} backgroundColor='transparent' >

                            </Block>
                            )
                            
                        }}
                    /> : <Block backgroundColor='#fff' justifyCenter alignCenter  >
                        <Text>Không có sản phẩm</Text>
                    </Block>}

                </Block>
            </Block>
            <Block height={windowHeight*0.1} marginHorizontal={windowHeight*0.02} backgroundColor='#dcdde1' />
            {/* <Block>
                {ModalFilter()}
            </Block> */}

        </SafeAreaView>
      


    )
}

export default ProductContainer;