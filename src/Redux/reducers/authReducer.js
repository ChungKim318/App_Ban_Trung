// import isEmpty from "../../hooks/isEmpty";
// import { SET_CURRENT_USER } from "../type";

// const initState = {
//     user:null,
//     userProfile:null,
//     isAuthenticated:false
// };

// const AuthReducer = (state = initState,action) => {
//     switch (action.type) {
//         case SET_CURRENT_USER:
//             return {
//                 user:action.payload,
//                 userProfile:action.userProfile,
//                 isAuthenticated: !isEmpty(action.payload)

//             };
//     }
//     return state;
// }

// export default AuthReducer;