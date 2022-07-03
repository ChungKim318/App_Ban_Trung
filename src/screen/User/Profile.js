import React,{useState,useContext,useEffect} from 'react';
import { Block, Button } from '../../components';
import { Text, Dimensions, ImageBackground, Image } from 'react-native';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import AuthGlobal from '../../Context/store/AuthGlobal';
import { logoutUser } from '../../Context/actions/Auth.action';
import { navigate } from '../../router/NavigationService';
import { authApi } from '../../api';
import { useDispatch } from 'react-redux';
import { onIsLoadingTrue, onIsLoadingFalse } from '../../Redux/action/appLoadingAction';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { useIsFocused } from '@react-navigation/native';



const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const Profile = (props) => {
    const context = useContext(AuthGlobal);
    const dispatch = useDispatch();
  //  console.log('contextt',context.stateUser.user.userId)
    const [userProfile,setUserProfile] = useState();
    const isFocused = useIsFocused();

    useEffect(()=>{
        
        GetProfile();
        
        return () =>{
            setUserProfile();
        }

    },[isFocused])

   // console.log('userProfile',userProfile);

    const GetProfile = () =>{
        dispatch(onIsLoadingTrue())
        AsyncStorage.getItem('jwt').then(resToken=>{
            
            if(resToken){
                AsyncStorage.getItem('id').then(resId=>{
                    if(resId){
                        authApi.GetProfile(resId,resToken).then(profile=>{
                            if(profile.data.success==true){
                                setUserProfile(profile.data.response);
                               
                                dispatch(onIsLoadingFalse())
                               
                            }else{
                                dispatch(onIsLoadingFalse())
                                Toast.show({
                                topOffset: 60,
                                type: 'error',
                                text1: `Có lỗi xảy ra.`,
                                text2: 'Xin vui lòng thử lại sau !.'
                            })
                            }
                           
                        }).catch(err=> {
                            console.log(err)
                            dispatch(onIsLoadingFalse())
                        })

                    }else{
                        dispatch(onIsLoadingFalse())
                        navigate('SignIn')

                    }


                }).catch(err=> {
                    console.log(err)
                    dispatch(onIsLoadingFalse())
                })
        
            }else{
                navigate('SignIn')
                dispatch(onIsLoadingFalse())
            }


        }).catch(err=> {
            console.log(err)
            dispatch(onIsLoadingFalse())
        })
    }

    return (
        <Block flex={1}  >
            <ImageBackground source={require('../../assets/image/background_profile.jpg')}
                resizeMode='stretch'
                blurRadius={1}
                style={{
                    flex: 1,

                }}

            >
                <Block height={windowHeight * 0.15} width={windowWidth} marginTop={windowHeight * 0.05}  row >
                    <Button backgroundColor='transparent' marginTop={windowHeight * 0.05} marginLeft={10}
                        onPress={() => props.navigation.goBack()}
                    >
                        <AntDesign name="leftcircle" size={windowHeight * 0.08} color="orange" />
                    </Button>
                    <Image source={require('../../assets/image/user.png')}
                        resizeMode='stretch'
                        style={{
                            height: windowHeight * 0.15,
                            width: windowHeight * 0.15,
                            backgroundColor: 'transparent',
                            borderRadius: 200,
                            marginLeft:windowWidth/6
                         }}

                    />
                </Block>

                <Block height={windowHeight * 0.75} width={windowWidth} backgroundColor='white' >
                    <Text style={{
                        fontSize: 20,
                        width: windowWidth,
                        textAlign: 'center'
                    }}>
                        Thông tin liên lạc:
                    </Text>
                    <Block height={windowHeight * 0.51} width={windowWidth} row marginVertical={10} >
                        <Block height={windowHeight * 0.51} width={windowWidth * 0.77} marginLeft={windowWidth * 0.03} >
                            <Block height={windowHeight * 0.05} width={windowWidth * 0.77} marginBottom={2}  >
                                <Text style={{ fontSize: 17, color: 'grey' }} >Tài khoản : <Text style={{ fontSize: 15, color: 'black' }} > {userProfile ? userProfile.TaiKhoan : ""} </Text> </Text>
                            </Block>
                            <Block height={windowHeight * 0.05} width={windowWidth * 0.77} marginBottom={2}  >
                                <Text style={{ fontSize: 17, color: 'grey' }} >Họ và tên : <Text style={{ fontSize: 15, color: 'black' }} > {userProfile ? userProfile.Ten : ""} </Text> </Text>
                            </Block>
                            <Block height={windowHeight * 0.05} width={windowWidth * 0.77} marginBottom={2} >
                                <Text style={{ fontSize: 17, color: 'grey' }} >Số nhà : <Text style={{ fontSize: 15, color: 'black' }} > {userProfile ? userProfile.DiaChi : ""} </Text> </Text>

                            </Block>
                            <Block height={windowHeight * 0.05} width={windowWidth * 0.77} marginBottom={2} >
                                <Text style={{ fontSize: 17, color: 'grey' }} >Phường/Xã : <Text style={{ fontSize: 15, color: 'black' }} > {userProfile ? userProfile.PhuongXa : ""} </Text> </Text>

                            </Block>
                            <Block height={windowHeight * 0.05} width={windowWidth * 0.77} marginBottom={2} >
                                <Text style={{ fontSize: 17, color: 'grey' }} >Quận/Huyện : <Text style={{ fontSize: 15, color: 'black' }} > {userProfile ? userProfile.QuanHuyen : ""} </Text> </Text>

                            </Block>
                            <Block height={windowHeight * 0.05} width={windowWidth * 0.77} marginBottom={2} >
                                <Text style={{ fontSize: 17, color: 'grey' }} >Tỉnh/Thành phố : <Text style={{ fontSize: 15, color: 'black' }} > {userProfile ? userProfile.TinhTP : ""} </Text> </Text>

                            </Block>
                            <Block height={windowHeight * 0.05} width={windowWidth * 0.77} marginBottom={2} >
                                <Text style={{ fontSize: 17, color: 'grey' }} >Số điện thoại : <Text style={{ fontSize: 15, color: 'black' }} > {userProfile ? userProfile.SoDienThoai : ""} </Text> </Text>
                            </Block>
                            <Block height={windowHeight * 0.08} width={windowWidth * 0.77} marginBottom={2}  >
                                <Text style={{ fontSize: 17, color: 'grey', }} >Địa chỉ giao hàng 1 : <Text style={{ fontSize: 15, color: 'black' }} > {userProfile ? userProfile.DiaChiGiaoHang1 : ""} </Text> </Text>
                            </Block>
                            <Block height={windowHeight * 0.08} width={windowWidth * 0.77} marginBottom={2}  >
                                <Text style={{ fontSize: 17, color: 'grey' }} >Địa chỉ giao hàng 2 : <Text style={{ fontSize: 15, color: 'black' }} > {userProfile ? userProfile.DiaChiGiaoHang2 : ""}  </Text> </Text>
                            </Block>
                        </Block>
                        <Block height={windowHeight * 0.5} width={windowWidth * 0.2} justifyCenter alignCenter >
                        <Button 
                            onPress={()=>navigate('EditProfile',{userProfile:userProfile})}
                        >
                            <FontAwesome name="pencil" size={30} color="black" />
                        </Button>
                        </Block>
                        
                    </Block>
                    
                    <Block height={windowHeight * 0.08} width={windowWidth} justifyCenter alignCenter >
                        <Button height={windowHeight * 0.06} width={windowWidth * 0.6} backgroundColor='orange' radius={20} justifyCenter alignCenter
                            onPress={()=>{
                                AsyncStorage.removeItem("jwt"),
                                AsyncStorage.removeItem("id"),
                                AsyncStorage.removeItem("isAdmin"),
                                logoutUser(context.dispatch);
                               

                                setTimeout(()=>{
                                    navigate('SignIn')
                                },500)
                            }}
                        >
                            <Text style={{fontSize:18,color:'white'}} >Đăng xuất</Text>
                        </Button>
                    </Block>
                </Block>

            </ImageBackground>
        </Block>
    )
}

export default Profile;