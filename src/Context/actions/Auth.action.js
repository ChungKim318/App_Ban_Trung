import jwtDecode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage"
import Toast from "react-native-toast-message";
import { onIsLoadingTrue, onIsLoadingFalse } from "../../Redux/action/appLoadingAction";
import { useDispatch } from "react-redux";
import { authApi } from "../../api";
import { SET_CURRENT_USER } from "../../Redux/type";


export const loginUser = async (tenDangNhap,matKhau,dispatch) =>{
  // const dispatchs = useDispatch();
  //  dispatch(onIsLoadingTrue())
        try{
          let dataLogin = await authApi.Login(tenDangNhap,matKhau);
          console.log('dataLogin',dataLogin.data);
          if(dataLogin.data.success==true){
              const token = dataLogin.data.response.token;
              const isAdmin = dataLogin.data.response.isAdmin;
              const id = dataLogin.data.response.id;
            //  console.log('token',token)
            
              AsyncStorage.setItem("jwt",token);
              if(isAdmin){
                AsyncStorage.setItem("isAdmin",'true');
              }else{
                AsyncStorage.setItem("isAdmin",'false');
              }
              
              AsyncStorage.setItem("id",id);
              const decode = jwtDecode(token);
              dispatch(setCurrentUser(decode,tenDangNhap,matKhau));
             // dispatch(onIsLoadingFalse())
          }else{
              logoutUser(dispatch)
         //  dispatch(onIsLoadingFalse())
          }
         
        }catch (err){
          console.log(err)
          Toast.show({
              topOffset:60,
              type:'error',
              text1:'Đăng nhập thất bại'
          })
          logoutUser(dispatch)
       //  dispatch(onIsLoadingFalse())
        }
    }


export const getUserProfile = async (id) =>{
  //  const dispatch = useDispatch();
//    dispatch(onIsLoadingTrue())
    try {
        let dataGetUser = await authApi.GetProfile(id);
        if(dataGetUser.data.success==true){
            console.log('dataGetUser',dataGetUser.data.data.response)
       //     dispatch(onIsLoadingFalse())
        }
        dispatch(onIsLoadingFalse())
    }catch (err) {
        console.log(err)
   //     dispatch(onIsLoadingFalse())
    }
}

export const logoutUser = (dispatch) => {
    AsyncStorage.removeItem("jwt");
    AsyncStorage.removeItem('isAdmin');
    AsyncStorage.removeItem('id')
    dispatch(setCurrentUser({}))
}

export const setCurrentUser =(decode,tenDangNhap,matKhau) =>{
    return {
        type : SET_CURRENT_USER,
        payload:decode,
        userProfile : {
            tenDangNhap:tenDangNhap,
            matKhau:matKhau
        }
    }
}