import React, { useState, } from 'react';
import {
    Text,Image,Dimensions, Modal
} from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { Block,Button } from '../../../components';
import formatMoney from '../../../hooks/fomatMoney';
import { navigate } from '../../../router/NavigationService';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

import { useDispatch } from 'react-redux';


const ListItem = (props) => {
    const [modalProductVisible,setModalProductVisible] = useState(false)
    const dispatch = useDispatch();
    const modalProduct = () => {
        return (
            <Block >
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalProductVisible}
                onRequestClose={() => {
                  Alert.alert("Modal has been closed.");
                  setModalProductVisible(!modalProductVisible);
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
                   
                    onPress={()=>setModalProductVisible(false)}
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
                        navigate("ProductForm",{item:props.item,nameScreen:"Chỉnh sửa sản phẩm"})
                          setModalProductVisible(!modalProductVisible) 
                          }}  >
                        <Text style={{ color: 'white', fontSize: 17, }} >Chỉnh sửa</Text>
                      </Button>
                      </Block>
                      
                      <Block height='100%' width='50%' justifyCenter alignCenter backgroundColor='red' borderBottomRightRadius={15} >
                      <Button onPress={() => [
                        props.delete(props.item.id),
                        setModalProductVisible(!modalProductVisible) 
                        
                      ]}  >
                        <Text style={{ color: 'white', fontSize: 17, }} >Xóa</Text>
                      </Button>
                      </Block>
                      
                    </Block>
                  </Block>
      
                </Block>
              </Modal>
            </Block>
          );
     }


   // console.log("props ListItem",props);

    return (
        <Block >
            <Button row padding={5} width={windowWidth} backgroundColor={props.index%2 ==0?"white":"gainsboro"} 
                onPress={()=>navigate("ProductDetail",{item: props?.item,backScreen:"Products"})}
                onLongPress={()=>setModalProductVisible(true)}
            >
                <Image 
                    source={{
                        uri: props.item.Image ? props.item.Image : "https://media.healthplus.vn/thumb_x650x382/Images/Uploaded/Share/2017/09/08/nhung-loai-trung-nen-an-de-tot-cho-suc-khoe11504842188.jpg"
                    }}
                    resizeMode='contain'
                    style={{
                        borderRadius:50,
                        width:windowWidth/6,
                        height:windowHeight*0.05,
                        margin:2
                    }}
                />
                <Text style={{flexWrap:'wrap',margin:3,width:windowWidth/6}} >{props.item.ThuongHieu}</Text>
                <Text style={{flexWrap:'wrap',margin:3,width:windowWidth/6}} numberOfLines={1} ellipsizeMode='tail' >{props.item.Ten}</Text>
                <Text style={{flexWrap:'wrap',margin:3,width:windowWidth/6}} numberOfLines={1} ellipsizeMode='tail' >{props.item.Loai.Ten}</Text>
                <Text style={{flexWrap:'wrap',margin:3,width:windowWidth/6}} >{formatMoney( props.item.Gia)}đ</Text>
            </Button>
            {modalProduct()}
        </Block>
    )
}

export default ListItem;