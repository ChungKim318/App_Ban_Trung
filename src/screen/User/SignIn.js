import React, { useState, useContext, useEffect } from 'react';
import { Block, Button } from '../../components';
import { Dimensions, Text, ImageBackground, TextInput, KeyboardAvoidingView, ScrollView ,Platform} from 'react-native';
import { AntDesign, MaterialCommunityIcons, FontAwesome, Entypo } from 'react-native-vector-icons';
import AlertMessage from '../../components/AlertMessage';
import { onIsLoadingTrue, onIsLoadingFalse } from '../../Redux/action/appLoadingAction';
import { useDispatch } from 'react-redux'
import { authApi } from '../../api';

import AuthGlobal from '../../Context/store/AuthGlobal';
import { loginUser } from '../../Context/actions/Auth.action';


const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const SignIn = (props) => {
  const context = useContext(AuthGlobal);
  // console.log('contextttt',context.stateUser.isAuthenticated)
  const [info, setInfo] = useState(
    {
      tenDangNhap: '',
      errortenDangNhap: '',
      matKhau: '',
      errorMatKhau: ''
    }
  );
  const [modalVisibleError, setModalVisibleError] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (context.stateUser.isAuthenticated === true) {
      props.navigation.navigate("Profile")
    }
  }, [context.stateUser.isAuthenticated])

  console.log('info', info);
  // console.log('visible sign in',modalVisibleError);

  const onDangNhap = async () => {
    let flag = true;
    let currentState = info;
    if (currentState.tenDangNhap === "") {
      currentState = {
        ...currentState,
        tenDangNhap: info.tenDangNhap,
        errortenDangNhap: "Tên đăng nhập không được để trống"
      };
      flag = false;
    }
    if (currentState.matKhau === "") {
      currentState = {
        ...currentState,
        matKhau: info.matKhau,
        errorMatKhau: "Mật khẩu không được để trống"
      };
      flag = false;
    }



    setInfo(currentState)
    if (flag) {
      loginUser(info.tenDangNhap, info.matKhau, context.dispatch)
    }
  }

  return (
    <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{flex:1}}
        >
    <ScrollView  marginBottom={60} >
      
      <ImageBackground source={require('../../assets/image/auth.jpg')}
        resizeMode='stretch'
        blurRadius={1}
        style={{
          flex: 1,

        }}

      >
         <Button backgroundColor='transparent' marginTop={windowHeight * 0.04} marginLeft={10}
          onPress={() => props.navigation.navigate("ExtendsScreen")}
        >
          <AntDesign name="leftcircle" size={windowHeight * 0.06} color="white" />
        </Button>
          <Block height={windowHeight * 0.87} width={windowWidth} alignCenter justifyEnd  >
            <Block height={windowHeight * 0.70} width={windowWidth} backgroundColor='white' borderTopLeftRadius={30} borderTopRightRadius={25} opacity={0.8} justifyCenter  >

              <Block alignCenter >
                <Text style={{ fontSize: 18, fontWeight: '700', paddingBottom: 10 }} > Đăng nhập</Text>
                <Block justifyCenter row  >
                  <Text style={{ fontSize: 18, fontWeight: '700', color: 'orange' }} > ---</Text>
                  <MaterialCommunityIcons name="egg-easter" size={24} color="orange" />
                  <MaterialCommunityIcons name="egg-easter" size={24} color="orange" />
                  <Text style={{ fontSize: 18, fontWeight: '700', color: 'orange' }} > ---</Text>
                </Block>

              </Block>
              <Block height={windowHeight * 0.07} width='100%' marginTop={15} paddingHorizontal={30} justifyCenter alignCenter >
                <Block row >
                  <FontAwesome name="user" size={windowWidth * 0.1} color="black" />
                  <TextInput
                    value={info.tenDangNhap}
                    multiline
                    placeholder='Tên đăng nhập'
                    placeholderTextColor='grey'
                    numberOfLines={3}
                    onChangeText={
                      (tenDangNhap) => setInfo({ ...info, tenDangNhap: tenDangNhap, errortenDangNhap: "" })
                    }
                    style={{
                      height: windowHeight * 0.06,
                      width: '90%',
                      color: 'black',
                      marginLeft: 10
                    }}
                  />
                </Block>
                <Block width={windowWidth * 0.6} height={1} backgroundColor='black' />
                {info.errortenDangNhap ?
                  <Block width={windowWidth * 0.6}  >
                    <Text style={{ color: 'red' }} >{info.errortenDangNhap}</Text>
                  </Block> : null
                }
              </Block>

              <Block height={windowHeight * 0.07} width='100%' marginTop={15} paddingHorizontal={30} justifyCenter alignCenter >
                <Block row >
                  <Entypo name="lock" size={windowWidth * 0.1} color="black" />
                  <TextInput
                    value={info.matKhau}
                    secureTextEntry={true}
                    placeholder='Mật khẩu'
                    placeholderTextColor='grey'
                    numberOfLines={3}
                    onChangeText={(matKhau) => setInfo({ ...info, matKhau: matKhau, errorMatKhau: "" })}
                    style={{
                      height: windowHeight * 0.06,
                      width: '90%',
                      color: 'black',
                      marginLeft: 10
                    }}
                  />
                </Block>
                <Block width={windowWidth * 0.6} height={1} backgroundColor='black' />
                {info.errorMatKhau ?
                  <Block width={windowWidth * 0.6}  >
                    <Text style={{ color: 'red' }} >{info.errorMatKhau}</Text>
                  </Block> : null
                }
              </Block>



              <Block height={windowHeight * 0.08} width={windowWidth} marginTop={windowHeight * 0.03} justifyCenter alignCenter >
                <Button height='90%' width={windowWidth * 0.4} backgroundColor='orange' radius={20} justifyCenter alignCenter
                  onPress={() => onDangNhap()}
                >
                  <Text style={{ fontSize: 18, fontWeight: '700', color: 'white' }} >Đăng nhập</Text>
                </Button>
              </Block>


              <Block height={windowHeight * 0.05} width={90} marginTop={windowHeight * 0.01} justifyCenter  >
                <Button height='90%' marginLeft={10} backgroundColor='transparent'
                  onPress={() => props.navigation.navigate('SignUp')}
                >
                  <Text style={{ fontSize: 16, fontWeight: '100', color: 'orange' }} >Đăng ký !</Text>
                  <Block height={2} width={60} backgroundColor='orange' />
                </Button>
              </Block>

            </Block>
          </Block>
          {/* <AlertMessage message={info.errorMessage} modalVisible={modalVisibleError} setModalVisible={setModalVisibleError} /> */}
       
      </ImageBackground>
      
    </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default SignIn;