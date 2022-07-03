import React from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, FlatList, Text } from 'react-native';
import { Block } from '../../../components';

const ProductFilter = (props) => {

    const filterProducts = (item) =>{
        if(item != null || item != undefined){
            let productsfiltered = props.productsFilter.filter(value=>
                value.Loai._id == item._id
             )
                props.setProducts(productsfiltered)
    
            // props.productsFilter.map(value=>console.log(value.PhanLoai.$oid))
        }else {
            props.setProducts(props.productsFilter)
        }
        }
      
         

    return (
        
            <FlatList
                data={props.category}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) =>
                    <TouchableOpacity onPress={()=>{
                        filterProducts(item)
                        props.setIsFilter(!props.isFilter)}
                    }
                     >
                        <Block margin={5} height={50} width='90%' backgroundColor='#fff' alignCenter justifyCenter radius={10} shadow={20} >
                            <Text>
                                {item.Ten}
                            </Text>

                        </Block>
                    </TouchableOpacity>

                   }

                   ListHeaderComponent={()=>{
                       return (
                        <TouchableOpacity onPress={()=>{
                            filterProducts(null)
                            props.setIsFilter(!props.isFilter)}
                        }
                         >
                            <Block margin={5} height={50} width='90%' backgroundColor='#fff' alignCenter justifyCenter radius={10} shadow={20} >
                                <Text style={{textAlign:'center'}} >
                                    Tất cả sản phẩm
                                </Text>
    
                            </Block>
                        </TouchableOpacity>
                       )
                    
                }}

            />
    )
}

export default ProductFilter;