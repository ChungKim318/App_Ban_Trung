import React, { useState, useEffect } from 'react';
import { SafeAreaView, Dimensions, StyleSheet, ScrollView, Modal, TextInput, Image } from 'react-native';
import { Lobster_400Regular } from '@expo-google-fonts/lobster';
import { useFonts } from 'expo-font';
import { AntDesign, MaterialCommunityIcons, FontAwesome5, FontAwesome } from 'react-native-vector-icons';
import { Block, Button } from '../../components';
import { Text } from '../../components';
import formatMoney from '../../hooks/fomatMoney';
import { Swipeable } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from "react-redux";
import { onIsLoadingTrue, onIsLoadingFalse } from "../../Redux/action/appLoadingAction";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { authApi, orderApi } from '../../api';
import *as actions from '../../Redux/action/cartAction';
import { navigate } from '../../router/NavigationService';



const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const Payment = (props) => {

  const tongTien = props?.route?.params?.tongTien;
  //console.log(props)
  const [fontsLoaded, error] = useFonts({
    Lobster_400Regular,
  })


  const [userProfile, setUserProfile] = useState();
  const dispatch = useDispatch();
  const [isaddress1, setIsAddress1] = useState(false);
  const [modalATM, setModalATM] = useState(false);
  const [isThanhToanTrucTiep, setIsThanhToanTrucTiep] = useState(true);
  const [order, setOrder] = useState({
    DsSanPham: [],
    DiaChiGiaoHang: '',
    LoaiGiaoDich: isThanhToanTrucTiep ? "Thanh toán khi nhận hàng" : "Thanh toán trực tuyến",
    SoDienThoai: '',
    TrangThai: 'Đang xử lý',
    TongTien: props?.route?.params?.tongTien,
    TaiKhoan: '',
    errorMessage: ''
  })

  useEffect(() => {
    GetProfile();
    if (isThanhToanTrucTiep) {
      setOrder({ ...order, LoaiGiaoDich: "Thanh toán khi nhận hàng" })
    } else {
      setOrder({ ...order, LoaiGiaoDich: "Thanh toán trực tuyến" })
    }


    if (isaddress1) {
      setOrder({ ...order, DiaChiGiaoHang: userProfile?.DiaChiGiaoHang1 })
    } else {
      setOrder({ ...order, DiaChiGiaoHang: userProfile?.DiaChiGiaoHang2 })
    }


    return () => {
      setUserProfile();
    }

  }, [])

  useEffect(() => {
    if (userProfile) {
      setOrder({ ...order, SoDienThoai: userProfile?.SoDienThoai, TaiKhoan: userProfile.id })

    }

  }, [userProfile?.SoDienThoai])

  useEffect(() => {
    if (isaddress1) {
      setOrder({ ...order, DiaChiGiaoHang: userProfile?.DiaChiGiaoHang1, errorMessage: '' })
    } else {
      setOrder({ ...order, DiaChiGiaoHang: userProfile?.DiaChiGiaoHang2, errorMessage: '' })
    }
  }, [isaddress1])

  useEffect(() => {

    if (isThanhToanTrucTiep) {
      setOrder({ ...order, LoaiGiaoDich: "Thanh toán khi nhận hàng", errorMessage: '' })
    } else {
      setOrder({ ...order, LoaiGiaoDich: "Thanh toán trực tuyến", errorMessage: '' })
    }
  }, [isThanhToanTrucTiep])

  useEffect(() => {

    if (props?.route?.params?.DsSanPham) {
      let DSSP = props.route.params.DsSanPham;
      let DsSanPhamTam = [];
      DSSP.map(item => {
        DsSanPhamTam.push({
          SanPham: item.id,
          SoLuong: item.SoLuong
        })
      })

      setOrder({ ...order, DsSanPham: DsSanPhamTam })

    }
  }, [props?.route?.params])

  console.log('orderrr', order);


  const clearCart = () => {
    dispatch(actions.clearCart())
  }

  const DatHang = async () => {
    let flag = true;
    let currentState = order;

    if (
      order.DiaChiGiaoHang == '' ||
      order.DsSanPham == [] ||
      order.LoaiGiaoDich == '' ||
      order.SoDienThoai == '' ||
      order.TaiKhoan == ''

    ) {
      currentState = {
        ...order, errorMessage: "Vui lòng chọn đầy đủ thông tin"
      }
      flag = false;
    }

    setOrder(currentState)

    if (flag) {
      dispatch(onIsLoadingTrue())
      try {

        let data = await orderApi.AddOrder(order)
        // console.log('dataaaaaa',data.data)
        if (data.data.success == true) {
          clearCart();
          dispatch(onIsLoadingFalse())
          Toast.show({
            topOffset: 60,
            type: 'success',
            text1: "Đặt hàng thành công",
            text2: ' Đơn hàng đang được xử lý.'
          })

          setTimeout(() => {
            navigate('Processing')
          }, 500)


        } else {
          dispatch(onIsLoadingFalse())
          Toast.show({
            topOffset: 60,
            type: 'error',
            text1: "Đặt hàng thất bại",
            text2: 'Xin vui lòng thử lại sau '
          })
        }


      } catch (err) {
        console.log(err)
        dispatch(onIsLoadingFalse())
        Toast.show({
          topOffset: 60,
          type: 'error',
          text1: "Đặt hàng thất bại",
          text2: 'Xin vui lòng thử lại sau '
        })
      }
    }

  }


  const GetProfile = () => {
    dispatch(onIsLoadingTrue())
    AsyncStorage.getItem('jwt').then(resToken => {

      if (resToken) {
        AsyncStorage.getItem('id').then(resId => {
          if (resId) {
            authApi.GetProfile(resId, resToken).then(profile => {
              // console.log('profileeeeeee',profile.data)
              if (profile.data.success == true) {
                setUserProfile(profile.data.response);

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

            }).catch(err => {
              console.log(err)
              dispatch(onIsLoadingFalse())
            })

          } else {
            dispatch(onIsLoadingFalse())
            Toast.show({
              topOffset: 60,
              type: 'error',
              text1: `Bạn chưa đăng nhập.`,
              text2: 'Xin vui lòng đăng nhập để thanh toán !.'
            })
            
            setTimeout(()=>{
              navigate('SignIn')

            },500)
            
          }


        }).catch(err => {
          console.log(err)
          dispatch(onIsLoadingFalse())
        })

      } else {
        dispatch(onIsLoadingFalse())
            Toast.show({
              topOffset: 60,
              type: 'error',
              text1: `Bạn chưa đăng nhập.`,
              text2: 'Xin vui lòng đăng nhập để thanh toán !.'
            })
            
            setTimeout(()=>{
              navigate('SignIn')

            },500)
      }


    }).catch(err => {
      console.log(err)
      dispatch(onIsLoadingFalse())
    })
  }

  const RenderRight = () => {
    return (
      <Block style={styles.renderContainer}>
        <Block style={styles.renderSubContainer}>
          <Button onPress={() => setModalATM(true)} height={46} width={windowWidth*0.8} justifyCenter alignCenter  >
            <Block height={40} width={windowWidth * 0.7} backgroundColor='#f6e58d' shadow shadowRadius={3} justifyCenter alignCenter >
              <Text>Xem thông tin chuyển tiền</Text>
            </Block>
          </Button>


        </Block>
      </Block>

    );
  };
  const RenderLeft = () => {
    return (
      <Block style={styles.renderContainer}>
        <Block style={styles.renderSubContainer}>
          <Text style={styles.renderTextRight}>Thanh toán khi nhận hàng</Text>
          <Button onPress={() => setIsThanhToanTrucTiep(!isThanhToanTrucTiep)}  >
            <FontAwesome name="check-square-o" size={30} color={isThanhToanTrucTiep ? "green" : 'grey'} />
          </Button>
        </Block>
      </Block>

    );
  };

  const ModalATM = () => {


    return (
      <Block flex={1} justifyCenter alignCenter   >
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalATM}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalATM(false);
          }}
        >
          <Block flex={1} height={windowHeight} width={windowWidth} backgroundColor='orange' >
            <Block row justifyContent='space-between' height={windowHeight * 0.08} width={windowWidth} backgroundColor='orange'  >
              <Block height={windowHeight * 0.08} width={windowWidth * 0.7} justifyCenter alignCenter >
                <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#fad390' }} >Thanh toán</Text>
              </Block>
              <Button

                height={windowHeight * 0.08} width={windowWidth * 0.3}
                row alignCenter justifyEnd paddingHorizontal={20}
                onPress={() => {
                  setModalATM(false)

                }}
              >
                <AntDesign name="closecircle" size={windowHeight * 0.05} color="white" />
              </Button>
            </Block>



            <Block height={windowHeight * 0.92} width={windowWidth}  >
              <ScrollView>
                <Block marginTop={10} height={windowHeight * 0.06} width={windowWidth} backgroundColor='#fad390' justifyCenter alignCenter >
                  <Text style={{ fontSize: 20, color: 'orange', fontWeight: 'bold' }} >ATM</Text>
                </Block>
                <Block height={windowHeight * 0.2} width={windowWidth} justifyCenter backgroundColor='#fad390' >
                  <Block row justifyContent='space-between' paddingHorizontal={10} >
                    <Text style={{ fontSize: 20, color: 'orange', fontWeight: 'bold' }} >Ngân hàng :</Text>
                    <Text style={{ fontSize: 20, color: 'orange', fontWeight: 'bold' }} > TechComBank</Text>
                  </Block>
                  <Block row justifyContent='space-between' paddingHorizontal={10} >
                    <Text style={{ fontSize: 20, color: 'orange', fontWeight: 'bold' }} >Số tài khoản :</Text>
                    <Text style={{ fontSize: 20, color: 'orange', fontWeight: 'bold' }} >19037126706016 </Text>
                  </Block>

                </Block>
                <Block marginTop={10} height={windowHeight * 0.06} width={windowWidth} backgroundColor='#fad390' justifyCenter alignCenter >
                  <Text style={{ fontSize: 20, color: 'orange', fontWeight: 'bold' }} >ZaloPay</Text>
                </Block>
                <Block height={windowHeight * 0.8} width={windowWidth} justifyCenter backgroundColor='#fad390' >
                  <Image
                    source={require('../../assets/image/zalopay.jpg')}
                    resizeMode='stretch'
                    style={{
                      height: '100%',
                      width: '100%'
                    }}
                  />

                </Block>

                <Block marginTop={10} height={windowHeight * 0.06} width={windowWidth} backgroundColor='#fad390' justifyCenter alignCenter >
                  <Text style={{ fontSize: 20, color: 'orange', fontWeight: 'bold' }} >Momo</Text>
                </Block>
                <Block height={windowHeight * 0.8} width={windowWidth} justifyCenter backgroundColor='#fad390' >
                  <Image
                    source={require('../../assets/image/momo.jpg')}
                    resizeMode='stretch'
                    style={{
                      height: '100%',
                      width: '100%'
                    }}
                  />

                </Block>


              </ScrollView>
            </Block>

          </Block>
        </Modal>

      </Block>
    )
  }

  return (
    <SafeAreaView flex={1} backgroundColor='#f7b731' >
      <Block height={windowHeight * 0.05} marginTop={windowHeight * 0.05} alignCenter row >
        <Button marginLeft={windowWidth * 0.02} onPress={() => props.navigation.goBack()} >
          <AntDesign name="left" size={30} color="black" />
        </Button>
        <Block width={windowWidth * 0.8} justifyCenter alignCenter  >
          {fontsLoaded ? <Text style={{ fontFamily: 'Lobster_400Regular', fontSize: 24, color: 'black' }} > Thông Tin Đơn Hàng </Text> : null}
        </Block>
      </Block>
      <Block height={windowHeight * 0.1} marginTop={20} justifyCenter alignCenter  >
        <Block height='100%' width={windowWidth * 0.8} backgroundColor="#fad390" radius={20} justifyContent='space-between' alignCenter row padding={10} >
          <Text >Tổng tiền</Text>
          <Text >{formatMoney(tongTien)}đ</Text>
        </Block>
      </Block>


      <Block height={windowHeight * 0.08} alignCenter justifyCenter >
        <Text style={{ fontSize: 16, color: 'white', opacity: 0.5, fontWeight: 'bold' }} >T H Ê M   Đ Ị A   C H Ỉ</Text>
      </Block>
      <Block height={windowHeight * 0.25} backgroundColor='white' opacity={0.7} alignCenter justifyCenter
        borderTopLeftRadius={20} borderBottomLeftRadius={20} width={windowWidth} alignSelf='flex-end'>
        <Block height='80%' width='100%' row alignCenter justifyContent='space-between'>

          <Block height='100%' width='48%' backgroundColor='#fff' radius={20} >
            <Block height='20%' row justifyContent='space-between' marginHorizontal={15}>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }} >Địa chỉ 1</Text>
              <Button onPress={() => {
                setIsAddress1(!isaddress1)
              }} >
                <FontAwesome5 name="dot-circle" size={24} color={isaddress1 ? "green" : 'grey'} />
              </Button>

            </Block>
            <Block height='80%' justifyCenter alignCenter paddingHorizontal={5} >
              <Text style={{ fontSize: 14 }} >{userProfile?.DiaChiGiaoHang1}</Text>

            </Block>

          </Block>
          <Block height='100%' width='48%' backgroundColor='#fff' radius={20} >
            <Block height='20%' row justifyContent='space-between' marginHorizontal={15}>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }} >Địa chỉ 2</Text>
              <Button onPress={() => {
                setIsAddress1(!isaddress1)
              }} >
                <FontAwesome5 name="dot-circle" size={24} color={isaddress1 ? 'grey' : 'green'} />
              </Button>

            </Block>
            <Block height='80%' justifyCenter alignCenter paddingHorizontal={5} >
              <Text style={{ fontSize: 14 }} >{userProfile?.DiaChiGiaoHang2}</Text>

            </Block>

          </Block>

        </Block>
      </Block>

      <Block height={windowHeight * 0.08} alignCenter justifyCenter >
        <Text style={{ fontSize: 16, color: 'white', opacity: 0.5, fontWeight: 'bold' }} >P H Ư Ơ N G   T H Ứ C   T H A N H   T O Á N</Text>
      </Block>
      <Swipeable leftThreshold={1}
        renderLeftActions={RenderLeft}
        renderRightActions={RenderRight} >
        <Block height={windowHeight * 0.1} >
          <Block height='100%' width={windowWidth * 0.8} alignSelf='center' marginHorizontal={10}
            row backgroundColor='white' opacity={0.7} radius={20} justifyCenter alignCenter
          >
            <LinearGradient
              colors={['#FFFFFF', '#FFEFBA',]}

              start={{ x: 1, y: 0 }}
              style={{
                flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%',
                height: '100%', flexDirection: 'row', borderTopLeftRadius: 20, borderBottomLeftRadius: 20
              }}
            >
              <MaterialCommunityIcons
                name="gesture-swipe-right"
                size={25} color="green" />
              <Text>Tiền mặt</Text>
            </LinearGradient>


            <LinearGradient
              colors={['#FFEFBA', '#FFFFFF']}

              start={{ x: 1, y: 0 }}
              style={{
                flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%',
                height: '100%', flexDirection: 'row', borderTopRightRadius: 20, borderBottomRightRadius: 20
              }}
            >
              <Text>Ví của bạn</Text>
              <MaterialCommunityIcons
                name="gesture-swipe-left"
                size={25} color="green" />
            </LinearGradient>
          </Block>
        </Block>
      </Swipeable>

      {order.errorMessage ? <Text style={{ color: 'red' }} >{order.errorMessage}</Text> : null}

      <Block height={windowHeight * 0.1} width={windowWidth} justifyCenter alignCenter row marginTop={20} alignSelf='center' >
        <LinearGradient start={{ x: 1, y: 1 }} end={{ x: 0.3, y: 0.8 }}
          colors={['#fc4a1a', '#f7b733']}
          style={{ height: '70%', paddingLeft: 15, paddingRight: 15, borderRadius: 15, width: '60%', flexDirection: 'row', alignItems: 'center' }} >
          <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#fff', textAlign: 'center', letterSpacing: 2, }} >Hoàn thành</Text>

        </LinearGradient>

        <LinearGradient
          start={{ x: 0.8, y: 0 }}
          colors={['#FF416C', '#f7b733', '#FF4B2B']}
          style={{ justifyContent: 'center', height: 75, width: 75, borderRadius: 35, alignItems: 'center' }} >
          <Button onPress={() => DatHang()} >
            <MaterialCommunityIcons name="fingerprint" size={40} />
          </Button>
        </LinearGradient>
        <ModalATM />

      </Block>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  renderContainer: {
    height: 50,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    opacity: 0.7,
    borderRadius: 20,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    marginVertical: 10,
    marginHorizontal: '10%',
    alignItems: 'center'
  },
  renderSubContainer: {
    justifyContent: 'space-between',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  renderTextRight: {
    color: 'black',
    marginHorizontal: 20,
  },
  locationContainer: {
    height: 150,
    backgroundColor: 'white',
    opacity: 0.7,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    marginVertical: 10,
    width: '90%',
    alignSelf: 'flex-end',
  },
  locationSubContainer: {
    height: '80%',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addLocationContainer: {
    height: 100,
    width: 70,
    backgroundColor: 'white',
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
})

export default Payment;