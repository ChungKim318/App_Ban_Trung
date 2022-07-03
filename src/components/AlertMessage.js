import React,{useState} from 'react';
import { Block,Button } from '.';
import { Modal,Dimensions,Pressable,Text } from 'react-native';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const AlertMessage = (props) =>{
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
                        <Text style={{fontSize:18,fontWeight: 'bold',textAlign:'center'}} >Thông báo</Text>
                    </Block>
                <Block height='60%' width='100%' justifyCenter alignCenter padding={15} >
                    <Text style={{fontSize:16,textAlign:'center'}} >{props.message}</Text>
                </Block>
                <Block height='20%' justifyCenter alignCenter border={5} borderColor='orange' borderBottomLeftRadius={15} borderBottomRightRadius={15}  >
                 <Button onPress={()=>{
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

export default AlertMessage;