import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Dimensions, ScrollView, SafeAreaView } from 'react-native';
import Swiper from "react-native-swiper";
import { Block } from "../../../components";

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;


const Banner = () => {
    const [bannerData, setBannerData] = useState([]);

    useEffect(() => {
        setBannerData([
            'https://i.pinimg.com/564x/a3/55/89/a355894a3e5c291c29c458be87782b58.jpg',
            'https://i.pinimg.com/564x/74/45/76/744576631274d562f801e9253d2a3776.jpg',
            'https://i.pinimg.com/564x/8d/82/5c/8d825c00b5f904f434ecb00ddaa823a1.jpg'
        ])
        return () => {
            setBannerData([]);
        }
    }, [])

    return (
        <ScrollView>

        <Block flex={1} backgroundColor='orange' >
            <Block width={windowWidth} alignCenter marginVertical={10}  >
                <Swiper showsButtons={false} autoplay={true}
                    autoplayTimeout={2} height={windowHeight / 4}

                >
                    {bannerData?.map(item => {
                        return (
                            <Image
                                key={item}
                                style={{
                                    height: windowHeight / 4, width: windowWidth - 40,
                                    borderRadius: 10, marginHorizontal: 20
                                }}
                                resizeMode='stretch'
                                source={{ uri: item }}
                            />
                        )
                    })}
                </Swiper>
            </Block>
            
        </Block>
        </ScrollView>

    )

}



export default Banner;