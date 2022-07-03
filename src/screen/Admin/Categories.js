import React, { useEffect, useState } from "react";
import { Block, Button } from "../../components";
import { Text, Dimensions, FlatList, TextInput, KeyboardAvoidingView, ScrollView,Modal } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { onIsLoadingTrue, onIsLoadingFalse } from '../../Redux/action/appLoadingAction'
import Toast from "react-native-toast-message";
import { Lobster_400Regular } from '@expo-google-fonts/lobster';
import { useFonts } from 'expo-font';
import { AntDesign } from 'react-native-vector-icons';
import { useDispatch } from "react-redux";
import { categoryApi } from "../../api";



const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;



const Categories = (props) => {
    const [categories, setCategories] = useState([]);
    const [tenPhanLoai, setTenPhanLoai] = useState();
    const [token, setToken] = useState();
    const [modalCategoriesVisible,setModalCategoriesVisible] = useState(false)
    const  [errorMessage,setErrorMessage] = useState('');
    const dispatch = useDispatch();
    const [fontsLoaded, error] = useFonts({
        Lobster_400Regular,
    });

    useEffect(() => {
        AsyncStorage.getItem('jwt').then(res => {
            setToken(res)
        }).catch(err => console.log(err))

        GetCategories();

        return () => {
            setToken();
            setCategories();
        }

    }, [])


    const Item = (props) => {
        const modalCategories = () => {
            return (
                <Block >
                  <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalCategoriesVisible}
                    onRequestClose={() => {
                      Alert.alert("Modal has been closed.");
                      setModalCategoriesVisible(!modalCategoriesVisible);
                    }}
                  >
                    <Block height={windowHeight} width={windowWidth} backgroundColor='transparent' justifyCenter alignCenter >
                      <Block height={windowHeight / 8} width={windowWidth * 0.6} backgroundColor='#fff'  radius={20}
                        style={{
                            shadowColor:"#000",
                            shadowOffset:{
                                width:0,
                                height:5
                            },
                            shadowOpacity:0.5,
                            shadowRadius:3.8,
                            elevation:5
                        }}
                      >
                       <Button 
                       height='40%'
                       width="10%"
                        underlayColor='orange'
                       
                        onPress={()=>setModalCategoriesVisible(false)}
                        style={{
                            alignSelf:'center',
                            position:'absolute',
                            top:5,
                            right:10
                        }}
                       >
                           
                           <Text style={{fontSize:18,fontWeight:'bold'}} > X</Text>
                       </Button>
                        
                        <Block height='60%' justifyCenter alignCenter   borderBottomLeftRadius={15} borderBottomRightRadius={15} row marginTop={(windowHeight/8)*0.4} >
                        <Block height='100%' width='50%' justifyCenter alignCenter backgroundColor='#7ed6df' borderBottomLeftRadius={15} >
                          <Button onPress={() => {
                           
                              setModalCategoriesVisible(!modalCategoriesVisible) 
                              }}  >
                            <Text style={{ color: 'white', fontSize: 17, }} >Hủy</Text>
                          </Button>
                          </Block>
                          
                          <Block height='100%' width='50%' justifyCenter alignCenter backgroundColor='red' borderBottomRightRadius={15} >
                          <Button onPress={() => [
                            DeleteCategories(props.item._id,props.item.Ten),
                            setModalCategoriesVisible(!modalCategoriesVisible) 
                            
                          ]}  >
                            <Text style={{ color: 'white', fontSize: 17, }} >Xác nhận</Text>
                          </Button>
                          </Block>
                          
                        </Block>
                      </Block>
          
                    </Block>
                  </Modal>
                </Block>
              );
         }


        return (
            <>
            <Block height={windowHeight*0.08} width={windowWidth} backgroundColor='transparent' marginBottom={5} row paddingHorizontal={10} justifyContent='space-between' alignCenter  >
                <Text style={{ fontSize: 16, color: 'black' }} >{props.item.Ten}</Text>
                <Button onPress={()=> setModalCategoriesVisible(true) }  >
                <AntDesign name="delete" size={30} color="red" />
                </Button>
               
            </Block>
            {modalCategories()}
            </>
        )
    }

    


    const GetCategories = async () => {
        dispatch(onIsLoadingTrue());
        try {
            let dataCategory = await categoryApi.GetAllCategories();
            if (dataCategory.data.success == true) {
                setCategories(dataCategory.data.response);
                dispatch(onIsLoadingFalse())
            } else {
                dispatch(onIsLoadingFalse())
                Toast.show({
                    topOffset: 60,
                    type: 'error',
                    text1: `Có lỗi xảy ra.`,
                    text2: 'Xin vui lòng thử lại sau !.'
                })
            }
        } catch (err) {
            dispatch(onIsLoadingFalse())
            Toast.show({
                topOffset: 60,
                type: 'error',
                text1: `Có lỗi xảy ra.`,
                text2: 'Xin vui lòng thử lại sau !.'
            })
            console.log(err)
        }
    }

    const AddCategories = async () => {

        if(tenPhanLoai){
            dispatch(onIsLoadingTrue());
            try {
                let dataCategory = await categoryApi.AddCategories(tenPhanLoai,token);
                if (dataCategory.data.success == true) {
                    GetCategories();
                    dispatch(onIsLoadingFalse())
                    Toast.show({
                        topOffset: 60,
                        type: 'success',
                        text1: `Thêm phân loại ${tenPhanLoai} thành công`,
                        text2: ' '
                    })
    
                } else {
                    dispatch(onIsLoadingFalse())
                    Toast.show({
                        topOffset: 60,
                        type: 'error',
                        text1: `Có lỗi xảy ra.`,
                        text2: 'Xin vui lòng thử lại sau !.'
                    })
                }
            } catch (err) {
                dispatch(onIsLoadingFalse())
                Toast.show({
                    topOffset: 60,
                    type: 'error',
                    text1: `Có lỗi xảy ra.`,
                    text2: 'Xin vui lòng thử lại sau !.'
                })
                console.log(err)
            }
        }else{
            setErrorMessage("Vui lòng nhập tên phân loại")
        }

       
    }

    const DeleteCategories = async (id,Ten) => {
        dispatch(onIsLoadingTrue());
        try {
            let dataCategory = await categoryApi.DeleteCategories(id,token);
            if (dataCategory.data.success == true) {
                let cat = categories.filter(item => item._id !==id)
                setCategories(cat);
                dispatch(onIsLoadingFalse())
                Toast.show({
                    topOffset: 60,
                    type: 'success',
                    text1: `Xóa phân loại ${Ten} thành công`,
                    text2: ' '
                })

            } else {
                dispatch(onIsLoadingFalse())
                Toast.show({
                    topOffset: 60,
                    type: 'error',
                    text1: `Có lỗi xảy ra.`,
                    text2: 'Xin vui lòng thử lại sau !.'
                })
            }
        } catch (err) {
            dispatch(onIsLoadingFalse())
            Toast.show({
                topOffset: 60,
                type: 'error',
                text1: `Có lỗi xảy ra.`,
                text2: 'Xin vui lòng thử lại sau !.'
            })
            console.log(err)
        }
    }

    //  console.log('categories', categories)



    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <ScrollView marginTop={windowHeight * 0.035} height={windowHeight * 0.77} >
                <Block height={windowHeight * 0.07} alignCenter row backgroundColor='orange' >
                    <Button marginLeft={windowWidth * 0.02} onPress={() => props.navigation.goBack()} >
                        <AntDesign name="left" size={30} color="black" />
                    </Button>
                    <Block width={windowWidth * 0.8} justifyCenter alignCenter  >
                        {fontsLoaded ? <Text style={{ fontFamily: 'Lobster_400Regular', fontSize: 24, color: 'black' }} > Quản lý phân loại </Text> : null}
                    </Block>
                </Block>
                <Block marginBottom={20} height={windowHeight * 0.62}  >

                    {categories ? categories.map((item, index) => {
                        return <Item key={index.toString()} item={item} index={index} />
                    })
                        : <Block><Text style={{ fontSize: 16, color: 'black' }} >Chưa có phân loại</Text></Block>
                    }

                </Block>
                <Block row height={windowHeight * 0.08} width={windowWidth} justifyContent="space-between" alignCenter padding={5} shadow  >
                    <Block height='90%' width={windowWidth / 3} alignCenter justifyCenter >
                        <Text style={{ fontSize: 16 }} >Thêm phân loại: </Text>
                    </Block>
                    <Block height='90%' width={windowWidth / 3} alignCenter justifyCenter >
                        <TextInput
                            value={tenPhanLoai}
                            onChangeText={text => 
                                {
                                    setTenPhanLoai(text);
                                    setErrorMessage('')
                                }
                               
                            }
                            style={{
                                height: '90%',
                                width: '100%',
                                borderColor: 'grey',
                                borderWidth: 1,
                                padding: 5,
                                borderRadius:10
                            }}
                        />
                    </Block>
                    <Block height='90%' width={windowWidth / 3} alignCenter justifyCenter  >
                        <Button height='100%' width='80%' backgroundColor='orange' alignCenter justifyCenter radius={10} 
                            onPress={()=>AddCategories()}
                        >
                            <Text style={{ color: 'white' }} >Xác nhận</Text>
                        </Button>
                    </Block>
                </Block>
                <Block marginBottom={windowHeight * 0.14} paddingHorizontal={10} >
                {errorMessage ? <Text style={{color:'red'}} >{errorMessage}</Text>: null}
                </Block>
               
               
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default Categories;