import React from 'react'
import {  StyleSheet } from 'react-native'
import Block from '../Block';
import Text from '../Text';
import TextInput from '../TextInput';


const ChooseDate = (props) => {

    return (
        <Block  width='100%' marginVertical={5} justifyCenter >
                <Text size={17} marginLeft={'5%'} marginVertical={5}>{
                    props.label ? props.label : ''}
                </Text>
                <Block width={'100%'} alignCenter>
                    
                    <Block
                        value={props.value}
                        width={'90%'}
                        height={45}
                        style={[styles.textInput,{borderRadius : props.radius}]}
                        justifyCenter
                        paddingHorizontal={20}
                        
                    >
                        <Text style={{color : props.value ? '#000' : 'gray'}}>{props.value ? props.value : props.placeholder}</Text>

                    </Block>
                </Block>
            </Block>
    )
}

export default ChooseDate;


const styles = StyleSheet.create({
    textInput : {
        borderWidth : 1/2,
  
    }
})
