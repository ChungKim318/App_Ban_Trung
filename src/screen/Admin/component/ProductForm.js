import React, { useEffect, useState } from "react";
import { Block, Button } from "../../../components";
import { Text, Dimensions, TextInput, Image, KeyboardAvoidingView, ScrollView, Platform, Picker } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { Lobster_400Regular } from '@expo-google-fonts/lobster';
import { useFonts } from 'expo-font';
import { AntDesign } from 'react-native-vector-icons';
import { categoryApi, productApi } from "../../../api";
import { useDispatch } from "react-redux";
import { onIsLoadingTrue, onIsLoadingFalse } from "../../../Redux/action/appLoadingAction";
import * as ImagePicker from 'expo-image-picker';
import AlertMessage from "../../../components/AlertMessage";
import mime from 'mime';
import { navigate } from "../../../router/NavigationService";


const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const ProductForm = (props) => {

    const [loaiS, setLoaiS] = useState([]);
    const [token, setToken] = useState();
    const [mainImage, setMainImage] = useState("https://media.healthplus.vn/thumb_x650x382/Images/Uploaded/Share/2017/09/08/nhung-loai-trung-nen-an-de-tot-cho-suc-khoe11504842188.jpg");
    const [item, setItem] = useState(null);
    const [modalVisibleCamera,setModalVisibleCamera] = useState(false)
    const [product, setProduct] = useState({
        thuongHieu: '',
        ten: '',
        gia: '',
        moTa: '',
        image: '',
        loai:'',
        tonKho: '',
        errorMessage:''

    });

    const dispatch = useDispatch();

    const [fontsLoaded, error] = useFonts({
        Lobster_400Regular,
    })

    useEffect(() => {

      // console.log('param',props.route.params)
    if(props?.route?.params?.item){
        setItem(props?.route?.params?.item);
        setProduct({...product,
            thuongHieu:props.route.params.item.ThuongHieu,
            ten:props.route.params.item.Ten,
            gia:props.route.params.item.Gia.toString(),
            moTa:props.route.params.item.MoTa,
            image:props.route.params.item.Image,
            loai:props.route.params.item.Loai._id,
            tonKho:props.route.params.item.TonKho.toString()
        })
        setMainImage(props.route.params.item.Image);

       // console.log("item",props.route.params.item.item)
    }

        AsyncStorage.getItem("jwt").then((res)=>{
            setToken(res);
        }).catch(err => console.log(err))



        GetAllCategories();

        (async ()=>{
            if(Platform.OS !=='web'){
                const {
                    status,
                } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if(status=="granted"){
                    setModalVisibleCamera(true);
                }
            }
        })();

        return () => {
            setLoaiS([]);
            setToken();
            setModalVisibleCamera(false)

        }

    }, [])

    const pickImage = async () =>{
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes:ImagePicker.MediaTypeOptions.All,
            allowsEditing:true,
            aspect:[4,3],
            quality:1
        });
        if(!result.cancelled){
            setMainImage(result.uri);
            setProduct({...product,image:result.uri})
        }
    }


    const GetAllCategories = async () => {
        dispatch(onIsLoadingTrue())
        try {
            let data = await categoryApi.GetAllCategories();

            //  console.log('dataCategory',data.data)
            if (data.data.success == true) {
                setLoaiS(data.data.response)
                dispatch(onIsLoadingFalse())
            }
            dispatch(onIsLoadingFalse())
        } catch (err) {
            console.log(err)
            dispatch(onIsLoadingFalse())
        }

    }

    const AddProduct = async () =>{
        if(
            product.ten == "" ||
            product.thuongHieu == "" ||
            product.gia == "" ||
            product.moTa == "" ||
            product.loai == "" ||
            product.tonKho == "" 
        ){
            setProduct({...product,errorMessage:"Vui lòng điền đầy đủ các thông tin !"})
        }
        let formData = new FormData();

        const newImageUri = "file:///" + product.image.split("file:/").join("");

        if(product.image.includes('https://')){
            console.log("chưa chọn ảnh");

        }else{
            formData.append("Image",{
                uri: newImageUri,
                type:mime.getType(newImageUri),
                name: newImageUri.split("/").pop()
            });
        }
        
        formData.append("Ten",product.ten);
        formData.append("ThuongHieu",product.thuongHieu);
        formData.append("Gia", parseInt( product.gia));
        formData.append("MoTa",product.moTa);
        formData.append("Loai",product.loai);
        formData.append("TonKho", parseInt(product.tonKho));
       
       
        if(props?.route?.params?.item){
            dispatch(onIsLoadingTrue())
            

            try{
                let idProduct = props?.route?.params?.item?.id;
                console.log("idProduct",idProduct)
                let dataUpdate = await productApi.UpdateProduct(formData,token,idProduct);
    
                console.log("dataUpdate",dataUpdate)
                if(dataUpdate.data.success==true){
                    dispatch(onIsLoadingFalse())
                    Toast.show({
                        topOffset:60,
                        type:'success',
                        text1:"Chỉnh sửa thành công",
                        text2:' '
                    })

                    setTimeout(()=>{
                        navigate("Products");
                    },500)
                    
                }else{
                    dispatch(onIsLoadingFalse())
                    Toast.show({
                        topOffset:60,
                        type:'error',
                        text1:"Chỉnh sửa thất bại",
                        text2:'Vui lòng thử lại sau'
                    })
                   
                }
    
                
            }catch (err){
                dispatch(onIsLoadingFalse())
                    Toast.show({
                        topOffset:60,
                        type:'error',
                        text1:"Chỉnh sửa thất bại",
                        text2:'Vui lòng thử lại sau'
                    })
                console.log(err)
            }

        }else{
           

            dispatch(onIsLoadingTrue())

            try{
                let dataAdd = await productApi.AddProduct(formData,token);
    
                if(dataAdd.data.success==true){
                    dispatch(onIsLoadingFalse())
                    Toast.show({
                        topOffset:60,
                        type:'success',
                        text1:"Thêm thành công",
                        text2:' '
                    })

                    setTimeout(()=>{
                        navigate("Products");
                    },500)
                    
                }else{
                    dispatch(onIsLoadingFalse())
                    Toast.show({
                        topOffset:60,
                        type:'error',
                        text1:"Thêm thất bại",
                        text2:'Vui lòng thử lại sau'
                    })
                   
                }
    
                
            }catch (err){
                dispatch(onIsLoadingFalse())
                    Toast.show({
                        topOffset:60,
                        type:'error',
                        text1:"Thêm thất bại",
                        text2:'Vui lòng thử lại sau'
                    })
                console.log(err)
            }

        }

       
        
    }

    console.log("ProductForm", "product", product)

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <ScrollView marginTop={windowHeight * 0.035} marginBottom={60} backgroundColor='#7f8c8d'  >


                <Block height={windowHeight * 0.07} alignCenter row backgroundColor='orange' >
                    <Button marginLeft={windowWidth * 0.02} onPress={() => props.navigation.goBack()} >
                        <AntDesign name="left" size={30} color="black" />
                    </Button>
                    <Block width={windowWidth * 0.8} justifyCenter alignCenter  >
                        {fontsLoaded ? <Text style={{ fontFamily: 'Lobster_400Regular', fontSize: 24, color: 'black' }} > {props.route.params.nameScreen} </Text> : null}
                    </Block>
                </Block>

                <Block justifyCenter alignCenter >
                <Block width={200} height={200} borderStyle='solid' borderWidth={8} justifyCenter radius={100} borderColor='#b2bec3' elevation={10} >
                     <Image source={{uri: mainImage }} 
                        style={{
                            width:'100%',
                            height:'100%',
                            borderRadius:100,

                        }}
                     /> 
                    <Button style={{
                            position:'absolute',
                            right:5,
                            bottom:5,
                            backgroundColor:'grey',
                            padding:8,
                            borderRadius:100,
                            elevation:20
                        }}  
                        onPress={()=>pickImage()}
                      >
                       <AntDesign name="camera" size={24} color="#b2bec3" />
                    </Button>
                </Block>
                </Block>
                <Block height={windowHeight * 0.07} width='100%' marginTop={15} paddingHorizontal={30} justifyCenter alignCenter >
                    <Block row border={5} radius={20}  >
                        <TextInput
                            value={product.thuongHieu}

                            placeholder='Thương hiệu'
                            placeholderTextColor='white'
                            numberOfLines={3}
                            onChangeText={(thuongHieu) => setProduct({ ...product, thuongHieu: thuongHieu, errorMessage: "" })}
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
                        <TextInput
                            value={product.ten}

                            placeholder='Tên'
                            placeholderTextColor='white'
                            numberOfLines={3}
                            onChangeText={(ten) => setProduct({ ...product, ten: ten, errorMessage: "" })}
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
                        <TextInput
                            value={product.gia}
                            keyboardType='numeric'
                            placeholder='Giá '
                            placeholderTextColor='white'
                            numberOfLines={3}
                            onChangeText={(gia) => setProduct({ ...product, gia: gia, errorMessage: "" })}
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
                        <TextInput
                            value={product.moTa}
                            multiline
                            placeholder='Mô tả'
                            placeholderTextColor='white'
                            numberOfLines={3}
                            onChangeText={(moTa) => setProduct({ ...product, moTa: moTa, errorMessage: "" })}
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
                <Block height={windowHeight * 0.07} width='100%' marginTop={15} paddingHorizontal={30} justifyCenter alignCenter  >
                    <Block row border={5} radius={20}  >
                        <TextInput
                            value={product.tonKho}
                            keyboardType='numeric'
                            placeholder='Tồn kho'
                            placeholderTextColor='white'
                            numberOfLines={3}
                            onChangeText={(tonKho) => setProduct({ ...product, tonKho: tonKho, errorMessage: "" })}
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
                <Block height={windowHeight * 0.07} width='100%' marginTop={15} paddingHorizontal={30} justifyCenter alignCenter   >
                    <Block row border={5} radius={20}  >
                        <Picker
                            selectedValue={product.loai}
                            style={{ height: windowHeight*0.06, width: '90%',color:'white' }}
                            onValueChange={(itemValue, itemIndex) => setProduct({ ...product, loai: itemValue, errorMessage: "" })}
                        >
                           <Picker.Item label="Chọn phân loại" value={null} />
                            { loaiS ? loaiS.map((item, index) => {
                                return (
                                    <Picker.Item key={index.toString()} label={item.Ten} value={item._id} />
                                )

                            }) : null}
                            

                        </Picker>
                    </Block>

                    {product.errorMessage ?
                        <Block width={windowWidth * 0.6}  >
                            <Text style={{ color: 'red' }} >{product.errorMessage}</Text>
                        </Block> : null
                    }
                </Block>

                <Block height={windowHeight * 0.1} width={windowWidth} marginTop={20} marginBottom={20} justifyCenter alignCenter  >
                    <Button height='80%' width="50%" backgroundColor='white' radius={20} justifyCenter alignCenter
                        onPress={()=>AddProduct()}
                    >
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#7f8c8d' }} >Xác nhận </Text>
                    </Button>
                </Block>
            </ScrollView>

            <AlertMessage message='Cần cho phép quyền truy cập máy ảnh và thư viện.' modalVisible={modalVisibleCamera} setModalVisible={setModalVisibleCamera} />
        </KeyboardAvoidingView>
    )
}

export default ProductForm;