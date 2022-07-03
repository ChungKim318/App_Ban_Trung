import React,{useState} from 'react';
import { Block,Button } from '../../../components';
import { Modal,Dimensions,Pressable,Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const FilterTime = (props) =>{
   // const [modalVisible, setModalVisible] = useState(props.visible);
    return (
        <Block >
          <Modal
            animationType="slide"
            transparent={true}
            visible={props.modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!props.modalVisible);
            }}
          >
            <Block height={windowHeight} width={windowWidth} backgroundColor='transparent' justifyCenter alignCenter >
                <Block height={windowHeight/3.5} width={windowWidth*0.8} backgroundColor='#fff' borderColor='orange' border={5} borderWidth={3} radius={20} >
                    <Block height='20%' backgroundColor='orange' borderTopLeftRadius={15} borderTopRightRadius={15} >
                        <Text style={{fontSize:18,fontWeight: 'bold',textAlign:'center'}} >Chọn thời gian báo cáo</Text>
                    </Block>
                <Block height='60%' width='100%' justifyCenter alignCenter padding={15} >
                    <Block height='40%' width='100%'  row justifyContent='space-between' alignCenter paddingHorizontal={5} >
                    <Text style={{fontSize:16,textAlign:'center'}} >Hôm nay</Text>
                    <Button onPress={()=>{
                        if(!props.valueFilter.homNay){
                            props.setValueFilter({homNay:true,bayNgayTruoc:false,thangNay:false})
                        }
                    }} >
                    <Ionicons name={props.valueFilter.homNay==true ? "checkmark-done-circle": "checkmark-done-circle-outline"} size={30} color={props.valueFilter.homNay==true ? "#00a8ff": "grey"} />
                    </Button>
                    </Block>
                    <Block height='40%' width='100%'  row justifyContent='space-between' alignCenter paddingHorizontal={5} >
                    <Text style={{fontSize:16,textAlign:'center'}} >7 ngày vừa qua</Text>
                    <Button onPress={()=>{
                        if(!props.valueFilter.bayNgayTruoc){
                            props.setValueFilter({homNay:false,bayNgayTruoc:true,thangNay:false})
                        }
                    }} >
                    <Ionicons name={props.valueFilter.bayNgayTruoc==true ? "checkmark-done-circle": "checkmark-done-circle-outline"} size={30} color={props.valueFilter.bayNgayTruoc==true ? "#00a8ff": "grey"} />
                    </Button>
                    </Block>
                    <Block height='40%' width='100%'  row justifyContent='space-between' alignCenter paddingHorizontal={5} >
                    <Text style={{fontSize:16,textAlign:'center'}} >Tháng hiện tại</Text>
                    <Button onPress={()=>{
                        if(!props.valueFilter.thangNay){
                            props.setValueFilter({homNay:false,bayNgayTruoc:false,thangNay:true})
                        }
                    }} >
                    <Ionicons name={props.valueFilter.thangNay==true ? "checkmark-done-circle": "checkmark-done-circle-outline"} size={30} color={props.valueFilter.thangNay==true ? "#00a8ff": "grey"} />
                    </Button>
                    </Block>
                </Block>
                <Block height='20%' justifyCenter alignCenter border={5} borderColor='orange' borderBottomLeftRadius={15} borderBottomRightRadius={15}  >
                 <Button height='100%' width='100%' justifyCenter alignCenter onPress={()=>{
                   if(props.functionModal == undefined){
                    props.setModalVisible(!props.modalVisible)
                   }else {
                     props.functionModal();
                   }
                  }} >
                     <Text style={{color:'orange', fontSize:17}} >OK</Text>
                 </Button>
                </Block>
                </Block>
             
            </Block>
          </Modal>
        </Block>
      );

}

export default FilterTime;