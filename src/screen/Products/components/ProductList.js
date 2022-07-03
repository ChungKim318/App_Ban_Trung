import React from 'react';
import { TouchableOpacity, View, Dimensions, StyleSheet } from 'react-native';
import ProductCard from './ProductCard';
import { navigate } from '../../../router/NavigationService';
import { Block } from '../../../components';

var { width } = Dimensions.get('window');

const ProductList = (props) => {
    const { item } = props;
    return (
       
            <TouchableOpacity style={{ width: props.isFilter ? '70%':'50%'} } onPress={() => navigate('ProductDetail', { item: item,backScreen:"HomeScreen" })} >
                <View style={{ width: width / 2, }} >
                    <ProductCard {...item} />
                </View>
            </TouchableOpacity>
       

    )

};

const styles = StyleSheet.create({

});

export default ProductList;