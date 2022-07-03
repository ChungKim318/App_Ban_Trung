import React from 'react';
import { Block,Text } from '.';
import LottieView from 'lottie-react-native';
import { Dimensions } from 'react-native';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const AppLoading = () => {

    return (
        <Block height={windowHeight} width={windowWidth}  backgroundColor='#ffaf40' >
            <LottieView  source={require('../assets/image/18460-egg-first.json')} autoPlay loop />
        </Block>
    )

};

export default AppLoading;
