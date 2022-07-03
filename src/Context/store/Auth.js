import React , { useReducer, useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AuthReducer from '../reducers/Auth.Reducer';
import { setCurrentUser } from '../actions/Auth.action';
import AuthGlobal from './AuthGlobal';

const Auth = props => {
    const [stateUser, dispatch] = useReducer(AuthReducer,{
        isAuthenticated:null,
        user:{}
    });
    const [showChild,setShowChild] = useState(false);

    useEffect(()=>{
        setShowChild(true);
        if(AsyncStorage.jwt){
            const decode = AsyncStorage.jwt ? AsyncStorage.jwt :"";
            if (setShowChild){
                dispatch(setCurrentUser(jwtDecode(decode)))
            }
        }
        return () =>setShowChild(false)
    },[])

    if(!showChild){
        return null;
    }else {
        return (
            <AuthGlobal.Provider 
                value={{
                    stateUser,
                    dispatch          
                }}
            >
                {props.children}
            </AuthGlobal.Provider>
        )
    }
}

export default Auth;