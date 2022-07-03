import React, { useState, useEffect, useRef } from 'react';
import { Block, Button } from '../../components';
import { Dimensions, KeyboardAvoidingView, Text, Modal, ScrollView, TextInput, Picker } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { Lobster_400Regular } from '@expo-google-fonts/lobster';
import { useFonts } from 'expo-font';
import { AntDesign } from 'react-native-vector-icons';
import PhoneInput from "react-native-phone-number-input";
import { onIsLoadingTrue, onIsLoadingFalse } from '../../Redux/action/appLoadingAction';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { authApi } from '../../api';


const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const EditProfile = (props) => {

  const [fontsLoaded, error] = useFonts({
    Lobster_400Regular,
  });
  const dispatch = useDispatch();
  const phoneInput = useRef();
  const [TinhTP, setTinhTP] = useState([]);
  const [QuanHuyen, setQuanHuyen] = useState([]);
  const [PhuongXa, setPhuongXa] = useState([]);
  const [userProfile, setUserProfile] = useState({
    Ten: '',
    DiaChi: '',
    PhuongXa: '',
    QuanHuyen: '',
    TinhTP: '',
    SoDienThoai: '',
    DiaChiGiaoHang1: '',
    DiaChiGiaoHang2: '',
    errorMessage: ''
  });

  useEffect(() => {

    if (props?.route?.params) {
      // console.log('profile',props.route.params)
      setUserProfile(
        {
          ...userProfile,
          Ten: props.route.params.userProfile.Ten,
          DiaChi: props.route.params.userProfile.DiaChi,
          PhuongXa: props.route.params.userProfile.PhuongXa,
          QuanHuyen: props.route.params.userProfile.QuanHuyen,
          TinhTP: props.route.params.userProfile.TinhTP,
          SoDienThoai: props.route.params.userProfile.SoDienThoai,
          DiaChiGiaoHang1: props.route.params.userProfile.DiaChiGiaoHang1,
          DiaChiGiaoHang2: props.route.params.userProfile.DiaChiGiaoHang2,
        })
    }

    GetAllTinhTP();


    return ()=>{
      setUserProfile();
      setTinhTP([]);
      setQuanHuyen([]);
      setPhuongXa([]);
    }

  }, [])

  const GetAllTinhTP = async () => {
    dispatch(onIsLoadingTrue())
    try {

      let data = await axios.get(`https://provinces.open-api.vn/api/?depth=3`);
      // console.log('data tỉnh',data.data);
      if (data.data) {
        setTinhTP(data.data)
      }
      dispatch(onIsLoadingFalse())

    } catch (err) {
      console.log(err);
      dispatch(onIsLoadingFalse())
    }

  }


  const onChinhSua = async () => {
    let flag = true;
    let currentState = userProfile;
    if (
      currentState.Ten == '' ||
      currentState.DiaChi == '' ||
      currentState.PhuongXa == '' ||
      currentState.QuanHuyen == '' ||
      currentState.TinhTP == '' ||
      currentState.SoDienThoai == '' ||
      currentState.DiaChiGiaoHang1 == ''
    ) {
      currentState = {
        ...currentState,
        errorMessage: "Vui lòng nhập đầy đủ thông tin"
      };
      flag = false;
    }

    let checkValid = phoneInput.current?.isValidNumber(currentState.SoDienThoai);
    let checkcodephone = phoneInput.current?.getNumberAfterPossiblyEliminatingZero();
    //console.log("checkvalid", checkValid, "checkcidephone", checkcodephone);

    if (!checkValid) {
      currentState = {
        ...currentState,
        SoDienThoai: userProfile.SoDienThoai,
        errorMessage: "Số điện thoại không đúng !"
      };
      flag = false;
    }



    setUserProfile(currentState)
    if (flag) {
        dispatch(onIsLoadingTrue())
        try {
          console.log('propsss',props)
          let data = await authApi.EditProfile(userProfile,props.route.params.userProfile.id)
         // console.log('edittttttt',data.data);
         if(data.data.success==true){
           dispatch(onIsLoadingFalse())
          Toast.show({
            topOffset:60,
            type:'success',
            text1:"Chỉnh sửa hồ sơ thành công",
            text2:' '
        })
        setTimeout(()=>{
          props.navigation.goBack();
        },500)

         }else{
          dispatch(onIsLoadingFalse())
          Toast.show({
            topOffset:60,
            type:'error',
            text1:"Có lỗi xảy ra",
            text2:'Vui lòng thử lại sau !'
        })
         }
         

        }catch(err){
          console.log(err)
          dispatch(onIsLoadingFalse())
        }
    }

  }


  console.log('userProfile', userProfile);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView marginTop={windowHeight * 0.03} marginBottom={60} backgroundColor='#7f8c8d'  >


        <Block height={windowHeight * 0.07} alignCenter row backgroundColor='orange' >
          <Button marginLeft={windowWidth * 0.02} onPress={() => props.navigation.goBack()} >
            <AntDesign name="left" size={30} color="black" />
          </Button>
          <Block width={windowWidth * 0.8} justifyCenter alignCenter  >
            {fontsLoaded ? <Text style={{ fontFamily: 'Lobster_400Regular', fontSize: 24, color: 'black' }} > Chỉnh sửa hồ sơ </Text> : null}
          </Block>
        </Block>


        <Block height={windowHeight * 0.07} width='100%' marginTop={15} paddingHorizontal={30} justifyCenter alignCenter >
          <Block row border={5} radius={20}   >
            <TextInput
              value={userProfile.Ten}

              placeholder='Họ và tên'
              placeholderTextColor='white'
              numberOfLines={3}
              onChangeText={(ten) => setUserProfile({ ...userProfile, Ten: ten, errorMessage: "" })}
              style={{
                height: windowHeight * 0.06,
                width: '90%',
                color: 'white',
                marginLeft: 10
              }}
            />
          </Block>
         

        </Block>
        <Block height={windowHeight * 0.07} width='100%' marginTop={15} paddingHorizontal={30} justifyCenter alignCenter >
          <Block row border={5} radius={20}  >
            <TextInput
              value={userProfile.DiaChi}

              placeholder='Số nhà'
              placeholderTextColor='white'
              numberOfLines={3}
              onChangeText={(diaChi) => setUserProfile({ ...userProfile, DiaChi: diaChi, errorMessage: "" })}
              style={{
                height: windowHeight * 0.06,
                width: '90%',
                color: 'white',
                marginLeft: 10
              }}
            />
          </Block>
          <Block width={windowWidth * 0.7} height={1} backgroundColor='black' />

        </Block>

        <Block height={windowHeight * 0.07} width='100%' marginTop={15} paddingHorizontal={30} justifyCenter alignCenter >
          <Block row border={5} radius={20}  >
            <Picker
              selectedValue={userProfile.TinhTP}
              style={{ height: windowHeight * 0.06, width: '90%', color: 'white' }}
              onValueChange={(itemValue, itemIndex) => {
                setUserProfile({ ...userProfile, TinhTP: itemValue, errorMessage: "" })
                TinhTP?.map(item => {
                  if (item.name == itemValue) {
                    setQuanHuyen(item.districts);
                  }
                })
              }}
            >
              <Picker.Item label="Tỉnh/Thành phố" value={null} />
              {TinhTP ? TinhTP.map((item, index) => {
                return (
                  <Picker.Item key={index.toString()} label={item.name} value={item.name} />
                )

              }) : null}


            </Picker>
          </Block>
          <Block width={windowWidth * 0.7} height={1} backgroundColor='black' />

        </Block>
        <Block height={windowHeight * 0.07} width='100%' marginTop={15} paddingHorizontal={30} justifyCenter alignCenter >
          <Block row border={5} radius={20}  >
            <Picker
              selectedValue={userProfile.QuanHuyen}
              style={{ height: windowHeight * 0.06, width: '90%', color: 'white' }}
              onValueChange={(itemValue, itemIndex) => {
                setUserProfile({ ...userProfile, QuanHuyen: itemValue, errorMessage: "" })
                QuanHuyen?.map(item => {
                  if(item.name == itemValue) {
                    setPhuongXa(item.wards);
                  }
                })
              }}
            >
              <Picker.Item label="Quận/Huyện" value={null} />
              {QuanHuyen ? QuanHuyen.map((item, index) => {
                return (
                  <Picker.Item key={index.toString()} label={item.name} value={item.name} />
                )

              }) : null}


            </Picker>
          </Block>
          <Block width={windowWidth * 0.7} height={1} backgroundColor='black' />

        </Block>
        <Block height={windowHeight * 0.07} width='100%' marginTop={15} paddingHorizontal={30} justifyCenter alignCenter  >
          <Block row border={5} radius={20}  >
            <Picker
              selectedValue={userProfile.PhuongXa}
              style={{ height: windowHeight * 0.06, width: '90%', color: 'white' }}
              onValueChange={(itemValue, itemIndex) => {
                setUserProfile({ ...userProfile, PhuongXa: itemValue, errorMessage: "" })
                
              }}
            >
              <Picker.Item label="Phường/Xã" value={null} />
              {PhuongXa ? PhuongXa.map((item, index) => {
                return (
                  <Picker.Item key={index.toString()} label={item.name} value={item.name} />
                )

              }) : null}


            </Picker>
          </Block>
          <Block width={windowWidth * 0.7} height={1} backgroundColor='black' />

        </Block>

        <Block height={windowHeight * 0.072} width='100%' marginTop={15} paddingHorizontal={30} justifyCenter alignCenter  >
          <Block row >

            <PhoneInput
              ref={phoneInput}
              defaultValue={userProfile.SoDienThoai}
              placeholderTextColor='black'
              placeholder={userProfile.SoDienThoai ? userProfile.SoDienThoai : "Số điện thoại"}
              defaultCode="VN"
              layout="first"
              onChangeText={(text) => {
                setUserProfile({ ...userProfile, SoDienThoai: text, errorMessage: "" })
              }}
              withDarkTheme
              withShadow
              autoFocus
            />
          </Block>
          <Block width={windowWidth * 0.6} height={1} backgroundColor='black' />
        </Block>

        <Block height={windowHeight * 0.07} width='100%' marginTop={15} paddingHorizontal={30} justifyCenter alignCenter  >
          <Block row border={5} radius={20}  >
            <TextInput
              value={userProfile.DiaChiGiaoHang1}

              placeholder='Địa chỉ giao hàng 1'
              placeholderTextColor='white'
              numberOfLines={3}
              onChangeText={(diaChiGiaoHang1) => setUserProfile({ ...userProfile, DiaChiGiaoHang1: diaChiGiaoHang1, errorMessage: "" })}
              style={{
                height: windowHeight * 0.06,
                width: '90%',
                color: 'white',
                marginLeft: 10,

              }}
            />
          </Block>
          <Block width={windowWidth * 0.7} height={1} backgroundColor='black' />

        </Block>

        <Block height={windowHeight * 0.07} width='100%' marginTop={15} paddingHorizontal={30} justifyCenter alignCenter  >
          <Block row border={5} radius={20}  >
            <TextInput
              value={userProfile.DiaChiGiaoHang2}

              placeholder='Địa chỉ giao hàng 2'
              placeholderTextColor='white'
              numberOfLines={3}
              onChangeText={(diaChiGiaoHang2) => setUserProfile({ ...userProfile, DiaChiGiaoHang2: diaChiGiaoHang2, errorMessage: "" })}
              style={{
                height: windowHeight * 0.06,
                width: '90%',
                color: 'white',
                marginLeft: 10,

              }}
            />
          </Block>
          <Block width={windowWidth * 0.7} height={1} backgroundColor='black' />

        </Block>

        {userProfile.errorMessage ? <Block padding={10}><Text style={{ color: 'red' }} >{userProfile.errorMessage}</Text></Block> : null}

        <Block height={windowHeight * 0.1} width={windowWidth} marginTop={10} marginBottom={20} justifyCenter alignCenter  >
          <Button height='80%' width="50%" backgroundColor='white' radius={20} justifyCenter alignCenter
            onPress={() => { onChinhSua() }}
          >
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#7f8c8d' }} >Xác nhận </Text>
          </Button>
        </Block>
      </ScrollView>


    </KeyboardAvoidingView>

  )



}

export default EditProfile;