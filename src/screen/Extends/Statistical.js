import React, { useState, useEffect, useRef } from "react";
import { Block, Button } from "../../components";
import { Picker, Dimensions, Text, ScrollView } from 'react-native';
import { Fontisto, AntDesign } from 'react-native-vector-icons';
import Toast from "react-native-toast-message";
import { onIsLoadingTrue, onIsLoadingFalse } from "../../Redux/action/appLoadingAction";
import { useDispatch } from "react-redux";
import { orderApi, authApi } from "../../api";
import { Lobster_400Regular } from '@expo-google-fonts/lobster';
import { useFonts } from 'expo-font';
import { Ionicons } from "@expo/vector-icons";
import FilterTime from "./component/FilterTime";
import moment from 'moment';
import fomatMoney from '../../hooks/fomatMoney';
import { PieChart } from '../../components/node_modules_custom/react-native-chart-kit'


const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const Statistical = (props) => {
    const [orders, setOrders] = useState([]);
    const [ordersOri, setOrdersOri] = useState([]);
    const [users, setUsers] = useState([]);
    const [usersOri, setUsersOri] = useState([]);
    const [ModalFilterVisible, setModalFilterVisivle] = useState(false);
    const [valueFilter, setValueFilter] = useState({
        homNay: true,
        bayNgayTruoc: false,
        thangNay: false
    })
    const [formThongKe, setFormThongKe] = useState({
        doanhThu: 0,
        doanhThuThangTruoc: 0,
        doanhThuCungKyNamTruoc: 0,
        tongSoHoaDon: 0,
        tongSoHoaDonThangTruoc: 0,
        tongSoHoaDonCungKyNamTruoc: 0,
        tongSoKhachHang: 0,
        tongSoKhachHangThangTruoc: 0,
        tongSoKhachHangCungKyNamTruoc: 0
    });
    const dispatch = useDispatch();

    const [fontsLoaded, error] = useFonts({
        Lobster_400Regular,
    })


    useEffect(() => {
        GetAllOrder();
        GetAllUser();
        TinhDoanhThuVaHoaDon()

        return () => {
            setOrders([]);
            setOrdersOri([]);
            setUsers([]);
            setUsersOri([]);
        }

    }, [])

    useEffect(() => {
        TinhDoanhThuVaHoaDon();
    }, [valueFilter, orders])

    const GetAllOrder = async () => {
        dispatch(onIsLoadingTrue())
        try {
            let data = await orderApi.GetAllOrder()
            if (data.data.success == true) {
                setOrders(data.data.response);
                setOrdersOri(data.data.response);
                dispatch(onIsLoadingFalse())
            } else {
                dispatch(onIsLoadingFalse())
                Toast.show({
                    topOffset: 60,
                    type: 'error',
                    text1: "Tải dữ liệu thất bại",
                    text2: 'Xin vui lòng thử lại sau '
                })
            }
        } catch (err) {
            console.log(err);
            dispatch(onIsLoadingFalse())
        }

    }

    const GetAllUser = async () => {
        dispatch(onIsLoadingTrue());
        try {
            let data = await authApi.GetAllUser();
            if (data.data.success == true) {
                setUsers(data.data.response);
                setUsersOri(data.data.response);
                dispatch(onIsLoadingFalse())
            } else {
                dispatch(onIsLoadingFalse())
                Toast.show({
                    topOffset: 60,
                    type: 'error',
                    text1: "Tải dữ liệu thất bại",
                    text2: 'Xin vui lòng thử lại sau '
                })
            }

        } catch (err) {
            dispatch(onIsLoadingFalse());
            console.log(err)
        }
    }

    //console.log('oderr', orders);
    //console.log('users', users);
    //console.log('timeeee',moment().format('DD'))


    const ThongKeComponent = (typeFilter, iconType, iconName, giaTri, giaTriThangTruoc, giaTriCungKy) => {
        return (
            <Block height={windowHeight * 0.6} width={windowWidth * 0.9} backgroundColor='#fad390' shadow radius={10} marginVertical={10}  >
                <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: 'grey' }} >{typeFilter == 1 ?'Tổng doanh thu':'Tổng hóa đơn'} {valueFilter.homNay ? 'hôm nay' : valueFilter.bayNgayTruoc ? '7 ngày vừa qua' : 'tháng này'}</Text>
                <Block marginTop={10} row justifyContent='space-between' paddingHorizontal={15}  >
                    <iconType.iconType name={iconName} size={35} color='grey' />
                    <Text style={{ fontSize: 24, color: 'grey', fontWeight: 'bold' }} >{typeFilter == 1 ? `${fomatMoney(giaTri)}đ`: `${giaTri} đơn`}</Text>
                </Block>
                <Block marginTop={10} alignCenter justifyContent='space-between' paddingHorizontal={15} >
                    <Text style={{ fontSize: 20, color: 'grey' }} >So với tháng trước:</Text>
                    {giaTri < giaTriThangTruoc ?
                        <Block row >
                            <Text style={{ fontSize: 20, color: 'grey' }} >
                                {typeFilter==1? `${fomatMoney(giaTriThangTruoc - giaTri)}đ` : `${giaTriThangTruoc-giaTri} đơn` }
                            </Text>
                            <Ionicons name="ios-arrow-down-sharp" size={30} color="red" />
                        </Block>

                        : <Block row >
                            <Text style={{ fontSize: 20, color: 'grey' }} >
                                {typeFilter==1 ? `${fomatMoney(giaTri - giaTriThangTruoc)}đ` : `${giaTri-giaTriThangTruoc} đơn`}
                                </Text>
                            <Ionicons name="ios-arrow-up-sharp" size={30} color="green" />
                        </Block>
                    }
                </Block>
                <Block marginTop={10} alignCenter justifyContent='space-between' paddingHorizontal={15} >
                    <Text style={{ fontSize: 20, color: 'grey' }} >So với cùng kỳ năm trước:</Text>
                    {giaTri < giaTriCungKy ?
                        <Block row >
                            <Text style={{ fontSize: 20, color: 'grey' }} >
                                { typeFilter==1 ?`${fomatMoney(giaTriCungKy - giaTri)}đ` :`${giaTriCungKy-giaTri} đơn`}
                                </Text>
                            <Ionicons name="ios-arrow-down-sharp" size={30} color="red" />
                        </Block>

                        : <Block row >
                            <Text style={{ fontSize: 20, color: 'grey' }} >
                                {typeFilter ==1?`${fomatMoney(giaTri - giaTriCungKy)}đ` : `${giaTri-giaTriCungKy} đơn`}
                                </Text>
                            <Ionicons name="ios-arrow-up-sharp" size={30} color="green" />
                        </Block>}
                </Block>
                <CustomePieChart
                    horizontal
                    data={[1, 2, 3]}
                    pretreatmentData={[
                        {
                            name: valueFilter.homNay ? (typeFilter==1? 'đ Hôm nay':'đơn Hôm nay') : valueFilter.bayNgayTruoc ? (typeFilter ==1 ?'đ 7 ngày vừa qua':'đơn 7 ngày vừa qua' ): (typeFilter==1? 'đ tháng hiện tại':'đơn tháng hiện tại'),
                            population: giaTri,
                            color: `rgb(${Math.round(
                                Math.random() * 255,
                            )}, ${Math.round(Math.random() * 255)}, ${Math.round(
                                Math.random() * 255,
                            )})`,
                            legendFontColor: '#7F7F7F',
                            legendFontSize: 15,
                        },
                        {
                            name: typeFilter == 1 ? 'đ Tháng trước': 'đơn Tháng trước',
                            population: giaTriThangTruoc,
                            color: `rgb(${Math.round(
                                Math.random() * 255,
                            )}, ${Math.round(Math.random() * 255)}, ${Math.round(
                                Math.random() * 255,
                            )})`,
                            legendFontColor: '#7F7F7F',
                            legendFontSize: 15,
                        },
                        {
                            name: typeFilter==1? 'đ Cùng kỳ năm trước ': 'đơn Cùng kỳ năm trước',
                            population: giaTriCungKy,
                            color: `rgb(${Math.round(
                                Math.random() * 255,
                            )}, ${Math.round(Math.random() * 255)}, ${Math.round(
                                Math.random() * 255,
                            )})`,
                            legendFontColor: '#7F7F7F',
                            legendFontSize: 15,
                        },
                    ]}
                />
            </Block>
        );
    }

    const chartConfig = {
        backgroundGradientFrom: '#fff',
        backgroundGradientFromOpacity: 0.5,
        backgroundGradientTo: '#fff',
        backgroundGradientToOpacity: 0.5,
        fillShadowGradient: '#0041ff',
        fillShadowGradientOpacity: 2,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        strokeWidth: 2,
        useShadowColorFromDataset: false,
        decimalPlaces: 0,
    };

    const CustomePieChart = (params) => {
        return (
            <ScrollView horizontal={params.horizontal ? true : false} keyboardShouldPersistTaps="always"  >
                <PieChart
                    style={{ borderRadius: 10 }}
                    data={params.pretreatmentData}
                    width={windowWidth * 1.8}
                    height={180}
                    chartConfig={chartConfig}
                    accessor={'population'}
                    backgroundColor={'transparent'}
                    absolute={params.noAbsolute ? false : true}
                    paddingLeft={-240}
                    center={[150, 0]}
                />
            </ScrollView>
        );
    };


    console.log('formThongKe', formThongKe)


    const TinhDoanhThuVaHoaDon = () => {
        dispatch(onIsLoadingTrue())
        if (valueFilter.homNay == true) {
            let dthu = 0;
            let dthuThangTruoc = 0;
            let dthuCungKy = 0;
            let hdon = 0;
            let hdthangTruoc = 0;
            let hdcungKy = 0;
            orders?.map(item => {
                // console.log('timeeeee', moment(item.NgayMua).format('DD/MM/YY'))
                // console.log('timeeeee111', moment().format('DD/MM/YY'))
                if (moment(item.NgayMua).format('DD/MM/YY') === moment().format('DD/MM/YY') && item.TrangThai == 'Đã giao') {
                    dthu += item.TongTien;
                    hdon += 1;
                }
                if (moment(item.NgayMua).format('DD/MM/YY') === moment().subtract(1, 'months').format('DD/MM/YY') && item.TrangThai == 'Đã giao') {
                    dthuThangTruoc += item.TongTien;
                    hdthangTruoc += 1;
                }
                if (moment(item.NgayMua).format('DD/MM/YY') === moment().subtract(1, 'years').format('DD/MM/YY') && item.TrangThai == 'Đã giao') {
                    dthuCungKy += item.TongTien;
                    hdcungKy += 1;
                }
                // console.log('doanhthuuuuu',dthu);
                setFormThongKe({ ...formThongKe, doanhThu: dthu, doanhThuThangTruoc: dthuThangTruoc, doanhThuCungKyNamTruoc: dthuCungKy, tongSoHoaDon: hdon, tongSoHoaDonThangTruoc: hdthangTruoc, tongSoHoaDonCungKyNamTruoc: hdcungKy })
            })
            // console.log('doanhthuuuuu111111',dthu);
            dispatch(onIsLoadingFalse())
        }
        if (valueFilter.bayNgayTruoc == true) {
            let date = new Date();
            let dthu7ngay = 0;
            let dthu7ngayThangTruoc = 0;
            let dthu7ngayCungKy = 0;
            let hd7ngay = 0;
            let hd7ngayThangTruoc = 0;
            let hd7ngayCungKy = 0;
            orders?.map(item => {
                //  console.log('abc',date.getDate()  , moment(item.NgayMua).format('DD'))
                //  console.log('abc1',moment(item.NgayMua).format('DD') , date.getDate()-6)
                //  console.log('abc2',moment(item.NgayMua).format('MM'), date.getMonth())
                //  console.log('abc3',moment(item.NgayMua).format('YYYY') , date.getFullYear())

                if (date.getDate() >= moment(item.NgayMua).format('DD')
                    && moment(item.NgayMua).format('DD') >= date.getDate() - 6
                    && moment(item.NgayMua).format('MM') == date.getMonth() + 1
                    && moment(item.NgayMua).format('YYYY') == date.getFullYear()
                    && item.TrangThai == 'Đã giao') {
                    dthu7ngay += item.TongTien;
                    hd7ngay += 1;

                }
                if (date.getDate() >= moment(item.NgayMua).format('DD')
                    && moment(item.NgayMua).format('DD') >= date.getDate() - 6
                    && moment(item.NgayMua).format('MM') == date.getMonth()
                    && moment(item.NgayMua).format('YYYY') == date.getFullYear()
                    && item.TrangThai == 'Đã giao') {
                    dthu7ngayThangTruoc += item.TongTien;
                    hd7ngayThangTruoc += 1;
                    // console.log('doanhthuhomnay ', moment(item.NgayMua).format('DD/MM/YY'))
                }
                if (date.getDate() >= moment(item.NgayMua).format('DD')
                    && moment(item.NgayMua).format('DD') >= date.getDate() - 6
                    && moment(item.NgayMua).format('MM') == date.getMonth() + 1
                    && moment(item.NgayMua).format('YYYY') == date.getFullYear() - 1
                    && item.TrangThai == 'Đã giao') {
                    dthu7ngayCungKy += item.TongTien;
                    hd7ngayCungKy += 1;
                }
                // console.log('doanhthuuuuu',dthu);
                setFormThongKe({ ...formThongKe, doanhThu: dthu7ngay, doanhThuThangTruoc: dthu7ngayThangTruoc, doanhThuCungKyNamTruoc: dthu7ngayCungKy, tongSoHoaDon: hd7ngay, tongSoHoaDonThangTruoc: hd7ngayThangTruoc, tongSoHoaDonCungKyNamTruoc: hd7ngayCungKy })
            })
            // console.log('doanhthuuuuu111111',dthu);
            dispatch(onIsLoadingFalse())
        }
        if (valueFilter.thangNay == true) {
            let date = new Date();
            let dthuthang = 0;
            let dthuthangTruoc = 0;
            let dthuthangCungKy = 0;
            let hdthang = 0;
            let hdthangTruoc = 0;
            let hdthangCungKy = 0;
            orders?.map(item => {


                if (moment(item.NgayMua).format('MM') == date.getMonth() + 1
                    && moment(item.NgayMua).format('YYYY') == date.getFullYear()
                    && item.TrangThai == 'Đã giao') {
                    dthuthang += item.TongTien;
                    hdthang += 1;

                }
                if (moment(item.NgayMua).format('MM') == date.getMonth()
                    && moment(item.NgayMua).format('YYYY') == date.getFullYear()
                    && item.TrangThai == 'Đã giao') {
                    dthuthangTruoc += item.TongTien;
                    hdthangTruoc += 1;
                    // console.log('doanhthuhomnay ', moment(item.NgayMua).format('DD/MM/YY'))
                }
                if (moment(item.NgayMua).format('MM') == date.getMonth() + 1
                    && moment(item.NgayMua).format('YYYY') == date.getFullYear() - 1
                    && item.TrangThai == 'Đã giao') {
                    dthuthangCungKy += item.TongTien;
                    hdthangCungKy += 1;
                }
                // console.log('doanhthuuuuu',dthu);
                setFormThongKe({ ...formThongKe, doanhThu: dthuthang, doanhThuThangTruoc: dthuthangTruoc, doanhThuCungKyNamTruoc: dthuthangCungKy, tongSoHoaDon: hdthang, tongSoHoaDonThangTruoc: hdthangTruoc, tongSoHoaDonCungKyNamTruoc: hdthangCungKy })
            })
            // console.log('doanhthuuuuu111111',dthu);
            dispatch(onIsLoadingFalse())
        }

    }

   


    return (
        <Block windowHeight={windowHeight} width={windowWidth}  >
            <Block height={windowHeight * 0.05} justifyContent='space-between' alignCenter row >
                <Button onPress={() => props.navigation.goBack()} >
                    <AntDesign name="left" size={35} color="black" />
                </Button>
                <Block width={windowWidth * 0.8} justifyCenter alignCenter  >
                    {fontsLoaded ? <Text style={{ fontFamily: 'Lobster_400Regular', fontSize: 24, color: 'black' }} > Báo cáo tổng quát </Text> : null}
                </Block>
                <Button marginLeft={windowWidth * 0.01} onPress={() => setModalFilterVisivle(true)} >
                    <Ionicons name="md-filter-sharp" size={35} color="black" />
                </Button>

            </Block>
            <ScrollView height={windowHeight * 0.8}  >
                <Block height={windowHeight * 0.7} width={windowWidth} justifyCenter alignCenter >
                    {ThongKeComponent(1, { iconType: Fontisto }, 'money-symbol', formThongKe.doanhThu, formThongKe.doanhThuThangTruoc, formThongKe.doanhThuCungKyNamTruoc)}
                </Block>
                <Block height={windowHeight * 0.7} width={windowWidth} justifyCenter alignCenter >
                    {ThongKeComponent(2, { iconType: Fontisto }, 'money-symbol', formThongKe.tongSoHoaDon, formThongKe.tongSoHoaDonThangTruoc, formThongKe.tongSoHoaDonCungKyNamTruoc)}
                </Block>
            </ScrollView>

            <FilterTime modalVisible={ModalFilterVisible} setModalVisible={setModalFilterVisivle} valueFilter={valueFilter} setValueFilter={setValueFilter} />
        </Block>
    );
}

export default Statistical;