// import jwt_decode from 'jwt-decode';
// import AsyncStorage  from '@react-native-community/async-storage';
// import  Toast  from 'react-native-toast-message';
// import { useDispatch } from 'react-redux';
// import { onIsLoadingFalse, onIsLoadingTrue } from './appLoadingAction';
// import { authApi } from '../../api';
// import { exp } from 'react-native/Libraries/Animated/src/Easing';
// import { SET_CURRENT_USER } from '../type';


// export const LoginUser = (tenDangNhap,matKhau,dispatch) =>{
//     // const dispatch = useDispatch();

//     dispatch(onIsLoadingTrue())
//     try{
//       let dataLogin = await authApi.Login(tenDangNhap,matKhau);
//       console.log('dataLogin',dataLogin.data.data);
//       if(dataLogin.data.success==true){
//           const token = dataLogin.data.response.token;
//           AsyncStorage.setItem("jwt",token);
//           const decode = jwt_decode(token);
//           dispatch(setCurrentUser(decode,tenDangNhap,matKhau));
//           dispatch(onIsLoadingFalse())
//       }else{
//           logOutUser(dispatch)
//         dispatch(onIsLoadingFalse())
//       }
     
//     }catch (err){
//       console.log(err)
//       Toast.show({
//           topOffset:60,
//           type:'error',
//           text1:'Đăng nhập thất bại'
//       })
//       logOutUser(dispatch)
//       dispatch(onIsLoadingFalse())
//     }

// }

// export const getUserProfile = async (id,dispatch) => {
//     // const dispatch = useDispatch();
//     dispatch(onIsLoadingTrue())
//     try {
//         let dataGetUser = await authApi.GetProfile(id);
//         if(dataGetUser.data.success==true){
//             dispatch(onIsLoadingFalse())
//         }
//         dispatch(onIsLoadingFalse())
//     }catch (err) {
//         console.log(err)
//         dispatch(onIsLoadingFalse())
//     }
// }

// export const logOutUser = (dispatch) => {
//     AsyncStorage.removeItem("jwt");
//     dispatch(setCurrentUser({

//     }))
// }

// export const setCurrentUser = (decode,tenDangNhap,matKhau) => {
//     return {
//         type: SET_CURRENT_USER,
//         payload:decode,
//         userProfile:{
//             tenDangNhap:tenDangNhap,
//             matKhau:matKhau
//         }
//     }
// }