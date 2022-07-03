import React from 'react';
import { StyleSheet,SafeAreaView,Image,Dimensions } from 'react-native';
import { Block } from './Block';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const Header = () => {
    return (
        <SafeAreaView style={styles.header} >
            <Image 
                source={require("../assets/image/logo_2.png")}
                resizeMode='contain'
                style={{height:height*0.15 , width:width*0.5}}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  header:{
    width:width,
    flexDirection:'row',
    alignContent:'center',
    justifyContent:'center',
    paddingBottom:5,
    marginTop:height*0.03,
    backgroundColor:'orange'
  }
   
})

export default Header;