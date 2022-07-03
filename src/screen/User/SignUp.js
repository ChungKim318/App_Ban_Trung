import React, { useState, useRef } from 'react';
import { Block, Button } from '../../components';
import { Dimensions, Text, ImageBackground, TextInput, Modal,ScrollView,KeyboardAvoidingView } from 'react-native';
import { AntDesign, MaterialCommunityIcons, FontAwesome, Entypo } from 'react-native-vector-icons';
import PhoneInput from "react-native-phone-number-input";
import { onIsLoadingTrue, onIsLoadingFalse } from '../../Redux/action/appLoadingAction';
import { useDispatch } from 'react-redux';
import { authApi, phoneApi } from '../../api';
import AlertMessage from '../../components/AlertMessage';
import { navigate } from '../../router/NavigationService';
import Toast from "react-native-toast-message";

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const SignUp = (props) => {
  const [modalOtpVisible, setModalOtpVisible] = useState(false);
  const dispatch = useDispatch();
  const [modalMessage,setModalMessage] = useState(false);
  const [modalMessageSignUp,setModalMessageSignUp] = useState(false);
  const [messageSignUp,setMessageSignUp] = useState('');

  const [info, setInfo] = useState(
    {
      tenDangNhap: '',
      errorTenDangNhap: '',
      matKhau: '',
      errorMatKhau: '',
      nhapLaiMatKhau: '',
      errorNhapLaiMatKhau: '',
      soDienThoai: '',
      errorSoDienThoai: '',
      otp: '',
      errorOtp: '',
      requestId:''
    }
  );

  const phoneInput = useRef();

  const onDangKy = () => {
    let flag = true;
    let currentState = info;
    if (currentState.tenDangNhap === "") {
      currentState = {
        ...currentState,
        tenDangNhap: info.tenDangNhap,
        errorTenDangNhap: "Tên đăng nhập không được để trống !"
      };
      flag = false;
    }
    if (currentState.matKhau === "") {
      currentState = {
        ...currentState,
        matKhau: info.matKhau,
        errorMatKhau: "Mật khẩu không được để trống !"
      };
      flag = false;
    }

    if (currentState.nhapLaiMatKhau === "") {
      currentState = {
        ...currentState,
        nhapLaiMatKhau: info.nhapLaiMatKhau,
        errorNhapLaiMatKhau: "Nhập lại mật khẩu không được để trống !"
      };
      flag = false;
    }
    if (currentState.matKhau != currentState.nhapLaiMatKhau) {
      currentState = {
        ...currentState,
        matKhau: info.matKhau,
        nhapLaiMatKhau: info.nhapLaiMatKhau,
        errorNhapLaiMatKhau: "Hai mật khẩu không được khác nhau !"
      };
      flag = false;
    }

    if (currentState.soDienThoai === "") {
      currentState = {
        ...currentState,
        soDienThoai: info.soDienThoai,
        errorSoDienThoai: "Số điện thoại không được để trống"
      };
      flag = false;
    }

    let checkValid = phoneInput.current?.isValidNumber(currentState.soDienThoai);
    let checkcodephone = phoneInput.current?.getNumberAfterPossiblyEliminatingZero();
    //console.log("checkvalid", checkValid, "checkcidephone", checkcodephone);

    if (!checkValid) {
      currentState = {
        ...currentState,
        soDienThoai: info.soDienThoai,
        errorSoDienThoai: "Số điện thoại không đúng !"
      };
      flag = false;
    }



    setInfo(currentState)
    if (flag) {
      setModalOtpVisible(true)
    }

  }

  const onDangky2 = async () =>{
    dispatch(onIsLoadingTrue());
    try{
      let data = await phoneApi.VerifyOtp(info.requestId,info.otp);
      //console.log('verify',data.data);

      if(data.data.data.isOtpValid==true){
        let dataSignUp = await authApi.Register(info.tenDangNhap,info.matKhau,info.soDienThoai);
        console.log('datasignup',dataSignUp);
        if(dataSignUp.data.success==true){
          setMessageSignUp("Xin chúc mừng bạn đã đăng ký thành công .");
          setModalMessageSignUp(true);
        }
        dispatch(onIsLoadingFalse())
      }else{
        setInfo({...info,errorOtp:"OTP không chính xác ! Vui lòng nhập lại OTP."})
        setModalMessage(true);
        dispatch(onIsLoadingFalse())
      }
      
    }catch(err){
      dispatch(onIsLoadingFalse())
      console.log(err)
    }
  }

  const sendOtp = async (soDienThoai) => {
      dispatch(onIsLoadingTrue())
      try {
          let data = await phoneApi.SendOtp(soDienThoai);
          if(data?.data?.data){
            setInfo({...info,requestId:data.data.data.requestId})
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
          
          console.log('mã phone',data.data);
      }catch (err){
        dispatch(onIsLoadingFalse())
        console.log(err);
      }
  }

  const modalOtp = () => {
    let checkcodephone = phoneInput.current?.getNumberAfterPossiblyEliminatingZero();
    console.log( "checkcidephone", checkcodephone);
    return (
      <Block >
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalOtpVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalOtpVisible(!modalOtpVisible);
          }}
        >
          <Block height={windowHeight} width={windowWidth} backgroundColor='transparent' justifyCenter alignCenter >
            <Block height={windowHeight / 3} width={windowWidth * 0.8} backgroundColor='#fff' borderColor='orange' border={5} borderWidth={3} radius={20} >
              <Block height='20%' backgroundColor='orange' borderTopLeftRadius={15} borderTopRightRadius={15} >
                <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center' }} >Xác thực OTP</Text>
              </Block>
              <Block height='60%' width='100%' justifyCenter alignCenter padding={15} >
                <Block height='50%' width='100%' border={5}  >
                  <TextInput
                    value={info.otp}
                   keyboardType='numeric'
                    placeholder='Vui lòng nhập OTP nhận được'
                    placeholderTextColor='grey'
                    onChangeText={(otp) => setInfo({ ...info, otp: otp, errorOtp: "" })}
                    style={{
                      height: windowHeight * 0.06,
                      width: '90%',
                      color: 'black',
                      marginLeft: 10
                    }}
                  />
                </Block>
                <Block height='50%' width='100%' marginTop={5}  >
                   <Button row justifyEnd alignCenter 
                    onPress={()=>sendOtp(checkcodephone.formattedNumber)}
                   >
                   <MaterialCommunityIcons name="send-clock" size={24} color='#0097e6'  />
                     <Text>
                       Nhận mã
                     </Text>
                   </Button>
                </Block>

              </Block>
              <Block height='20%' justifyCenter alignCenter border={5} borderColor='orange' borderBottomLeftRadius={15} borderBottomRightRadius={15} row >
              <Block height='100%' width='50%' justifyCenter alignCenter >
                <Button onPress={() => setModalOtpVisible(!modalOtpVisible)}  >
                  <Text style={{ color: 'orange', fontSize: 17, }} >Trở lại</Text>
                </Button>
                </Block>
                <Block height='100%' width={2} backgroundColor='orange' />
                <Block height='100%' width='50%' justifyCenter alignCenter >
                <Button onPress={() => { 
                  setModalOtpVisible(!modalOtpVisible);
                  onDangky2();
              }}  >
                  <Text style={{ color: 'orange', fontSize: 17, }} >Xác nhận</Text>
                </Button>
                </Block>
                
              </Block>
            </Block>

          </Block>
        </Modal>
      </Block>
    );
  }

  console.log('info', info);
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
        <Button backgroundColor='transparent' marginTop={windowHeight * 0.03} marginLeft={10}
          onPress={() => props.navigation.goBack()}
        >
          <AntDesign name="leftcircle" size={windowHeight * 0.06} color="white" />
        </Button>
        <Block height={windowHeight * 0.9} width={windowWidth} alignCenter marginTop={windowHeight * 0.06} >
          <Block height={windowHeight * 0.7} width={windowWidth * 0.9} backgroundColor='white' radius={20} opacity={0.8} justifyCenter  >

            <Block alignCenter >
              <Text style={{ fontSize: 18, fontWeight: '700', paddingBottom: 10 }} > Đăng ký thành viên</Text>
              <Block justifyCenter row  >
                <Text style={{ fontSize: 18, fontWeight: '700', color: 'orange' }} > ---</Text>
                <MaterialCommunityIcons name="egg-easter" size={24} color="orange" />
                <MaterialCommunityIcons name="egg-easter" size={24} color="orange" />
                <Text style={{ fontSize: 18, fontWeight: '700', color: 'orange' }} > ---</Text>
              </Block>

            </Block>
            <Block height={windowHeight * 0.073} width='100%' marginTop={15} paddingHorizontal={30} justifyCenter alignCenter >
              <Block row >
                <FontAwesome name="user" size={windowWidth * 0.1} color="black" />
                <TextInput
                  value={info.tenDangNhap}
                  multiline
                  placeholder='Tên đăng nhập'
                  placeholderTextColor='grey'
                  numberOfLines={3}
                  onChangeText={(tenDangNhap) => setInfo({ ...info, tenDangNhap: tenDangNhap, errorTenDangNhap: "" })}
                  style={{
                    height: windowHeight * 0.06,
                    width: '90%',
                    color: 'black',
                    marginLeft: 10
                  }}
                />
              </Block>
              <Block width={windowWidth * 0.6} height={1} backgroundColor='black' />
              {info.errorTenDangNhap ?
                <Block width={windowWidth * 0.6}  >
                  <Text style={{ color: 'red' }} >{info.errorTenDangNhap}</Text>
                </Block> : null
              }
            </Block>

            <Block height={windowHeight * 0.072} width='100%' marginTop={15} paddingHorizontal={30} justifyCenter alignCenter >
              <Block row >
                <Entypo name="lock" size={windowWidth * 0.1} color="black" />
                <TextInput
                  value={info.matKhau}
                  placeholder='Mật khẩu'
                  secureTextEntry={true}
                  placeholderTextColor='grey'
                  secureTextEntry={true}
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

            <Block height={windowHeight * 0.1} width='100%' marginTop={15} paddingHorizontal={30} justifyCenter alignCenter >
              <Block row >
                <Entypo name="key" size={windowWidth * 0.1} color="black" />
                <TextInput
                  value={info.nhapLaiMatKhau}
                  secureTextEntry={true}
                  placeholder='Nhập lại mật khẩu'
                  placeholderTextColor='grey'
                  numberOfLines={3}
                  onChangeText={(reMatKhau) => setInfo({ ...info, nhapLaiMatKhau: reMatKhau, errorNhapLaiMatKhau: "" })}
                  style={{
                    height: windowHeight * 0.06,
                    width: '90%',
                    color: 'black',
                    marginLeft: 10
                  }}
                />
              </Block>
              <Block width={windowWidth * 0.6} height={1} backgroundColor='black' />
              {info.errorNhapLaiMatKhau ?
                <Block width={windowWidth * 0.6}  >
                  <Text style={{ color: 'red' }} >{info.errorNhapLaiMatKhau}</Text>
                </Block> : null
              }
            </Block>

            <Block height={windowHeight * 0.072} width='100%' marginTop={15} paddingHorizontal={30} justifyCenter alignCenter  >
              <Block row >
                <FontAwesome name="phone" size={windowWidth * 0.1} color="black" />
                {/* <TextInput
                 value={info.soDienThoai}
                 multiline
                placeholder='Số điện thoại'
                placeholderTextColor='grey'
                keyboardType='phone-pad'
                numberOfLines={3}
                 onChangeText={(sdt)=>setInfo({...info,soDienThoai:sdt})}
                style={{
                height:windowHeight*0.06,
                width:'90%',
                color:'black',
                marginLeft:10
              }}
            /> */}
                <PhoneInput
                  ref={phoneInput}
                  defaultValue={info.soDienThoai}
                  placeholder='Số điện thoại'
                  defaultCode="VN"
                  layout="first"
                  onChangeText={(text) => {
                    setInfo({ ...info, soDienThoai: text, errorSoDienThoai: "" })
                  }}
                  withDarkTheme
                  withShadow
                  autoFocus
                />
              </Block>
              <Block width={windowWidth * 0.6} height={1} backgroundColor='black' />
              {info.errorSoDienThoai ?
                <Block width={windowWidth * 0.6}  >
                  <Text style={{ color: 'red' }} >{info.errorSoDienThoai}</Text>
                </Block> : null
              }
            </Block>

            <Block height={windowHeight * 0.08} width={windowWidth * 0.9} marginTop={windowHeight * 0.03} justifyCenter alignCenter >
              <Button height='90%' width={windowWidth * 0.4} backgroundColor='orange' radius={20} justifyCenter alignCenter
                onPress={() => onDangKy()}
              >
                <Text style={{ fontSize: 18, fontWeight: '700', color: 'white' }} >Tiếp tục</Text>
              </Button>
            </Block>

          </Block>
        </Block>
        {modalOtp()}
        <AlertMessage message={info.errorOtp} modalVisible={modalMessage} setModalVisible={setModalMessage} />
        <AlertMessage message={messageSignUp} modalVisible={modalMessageSignUp} setModalVisible={setModalMessageSignUp} functionModal={()=>navigate('SignIn')}  />
      </ImageBackground>
    </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default SignUp;