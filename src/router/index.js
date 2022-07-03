import React, { useContext, useRef, useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Block, Text } from '../components';
import { FontAwesome,MaterialCommunityIcons,FontAwesome5,Fontisto, Ionicons,AntDesign, } from 'react-native-vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ProductContainer from '../screen/Products/ProductContainer';
import 'react-native-gesture-handler';
import { TouchableOpacity, Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';
import ProductDetail from '../screen/Products/ProductDetail';
import CartScreen from '../screen/Cart/CartScreen';
import CartIcon from '../components/CartIcon';
import Payment from '../screen/Cart/Payment';
import Delivering from '../screen/StatusProduct/Delivering';
import Bought from '../screen/StatusProduct/Bought';
import Processing from '../screen/StatusProduct/Processing';
import ExtendsScreen from '../screen/Extends/ExtendsScreen';
import SignUp from '../screen/User/SignUp';
import SignIn from '../screen/User/SignIn';
import Profile from '../screen/User/Profile';
import { useSelector, useDispatch } from 'react-redux';
import Products from '../screen/Admin/Products';
import Categories from '../screen/Admin/Categories';
import Orders from '../screen/Admin/Orders';
import ProductForm from '../screen/Admin/component/ProductForm';
import AuthGlobal from '../Context/store/AuthGlobal';
import AsyncStorage from "@react-native-async-storage/async-storage";
import EditProfile from '../screen/User/EditProfile';
import Statistical from '../screen/Extends/Statistical';
import Classify from '../screen/Extends/Classify';
import { onIsLoadingTrue, onIsLoadingFalse } from '../Redux/action/appLoadingAction'
import Classify1 from '../screen/Extends/Classify1';


const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;


const TabTitle = (props) => {
  //  console.log('prop title', props)

    return (
        <Block height={windowHeight*0.09}  width={windowWidth/3.2}  alignCenter >
            <Text style={{
                fontSize: props.focused ? 16 : 13,
                color:props.focused ? 'black' :'grey',
                fontWeight: props.focused ? 'bold': '100'
            }} >
                {props.item}
            </Text>
        </Block>

    )
}

const TabButton = (props) => {

    const { item, onPress, accessibilityState } = props;
    //  console.log(props)
    const focused = accessibilityState.selected;
    const viewRef = useRef();

    useEffect(() => {
        if (focused) {
            viewRef.current.animate({ 0: { scale: 1, rotate: '0deg', translateY: 0 }, 1: { scale: 1.2, rotate: '360deg', translateY: -5 } });
        } else {
            viewRef.current.animate({ 0: { scale: 1.2, rotate: '360deg', translateY: -5 }, 1: { scale: 1, rotate: '0deg', translateY: 0 } });
        }
    }, [focused])

    return (

        <Block flex={1} justifyCenter alignCenter >
            <TouchableOpacity onPress={onPress} activeOpacity={1} >


                <Animatable.View ref={viewRef} duration={1000} style={{
                    flex: 1, justifyContent: 'center', alignItems: 'center', width: windowWidth * 0.15,
                    height: 0, borderRadius: 30, borderWidth: 4, borderColor: '#ffa801',
                    backgroundColor: '#fff'
                }} >

                    {item.IconMore != undefined ? <item.IconMore /> : null}
                    <item.type name={focused ? item.activeIcon : item.isActiveIcon} size={24} color={focused ? '#ffa801' : '#ffda79'} />
                </Animatable.View>
            </TouchableOpacity>
        </Block>

    )
}

 const AuthStack = createStackNavigator();
 const AuthNavigation = () =>{
     return (
        <AuthStack.Navigator>
           <AuthStack.Screen name='SignIn' component={SignIn} 
            options={{
                headerShown:false
            }} /> 
            <AuthStack.Screen name='SignUp' component={SignUp} 
            options={{
                headerShown:false
            }} />  
            
        </AuthStack.Navigator>
    )
}

const AdminStack = createStackNavigator();
const AdminNavigation = () => {
    return (
        <AdminStack.Navigator>
            <AdminStack.Screen name="Products"  component={Products} 
                options={{
                    headerShown:false
                }}
            />
            <AdminStack.Screen name="Categories"  component={Categories} 
                 options={{
                    headerShown:false
                }}
            />
            <AdminStack.Screen name="Orders"  component={Orders} 
              options={{
                headerShown:false
            }}
            />
            <AdminStack.Screen name="ProductForm"  component={ProductForm}
                  options={{
                    headerShown:false
                }}
            />
        </AdminStack.Navigator>
    )
}

const HomeStack = createStackNavigator();
const HomeNavigation = () => {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name='HomeScreen' component={ProductContainer}
                options={{
                    headerShown: false
                }} />
            <HomeStack.Screen name='ProductDetail' component={ProductDetail}
                options={{
                    headerShown: false
                }} />

        </HomeStack.Navigator>
    );

}

const CartStack = createStackNavigator();
const CartNavigation = () => {
    return (
        <CartStack.Navigator>
            <CartStack.Screen name='Checkout' component={CheckOutNavigation}
                options={{
                headerShown:false
                }} />
                 <CartStack.Screen name='Payment' component={Payment}
                options={{
                headerShown:false
                }} />
                

        </CartStack.Navigator>
    );

}

const ExtendStack = createStackNavigator();
const ExtendNavigation = () => {
    return(
        <ExtendStack.Navigator>
            
            <ExtendStack.Screen name='ExtendsScreen' component={ExtendsScreen} 
            options={{
                headerShown:false
            }} />
                 <ExtendStack.Screen name='SignIn' component={SignIn} 
            options={{
                headerShown:false
            }} /> 
            <ExtendStack.Screen name='SignUp' component={SignUp} 
            options={{
                headerShown:false
            }} />  
             <ExtendStack.Screen name='Profile' component={Profile} 
            options={{
                headerShown:false
            }} /> 
             <ExtendStack.Screen name='EditProfile' component={EditProfile} 
            options={{
                headerShown:false
            }} /> 
            <ExtendStack.Screen name='Statistical' component={Statistical} 
            options={{
                headerShown:false
            }} /> 
            <ExtendStack.Screen name='Classify' component={Classify} 
            options={{
                headerShown:false
            }} /> 
             <ExtendStack.Screen name='Classify1' component={Classify1} 
            options={{
                headerShown:false
            }} /> 
        </ExtendStack.Navigator>
    )
}


const CheckOutTab = createMaterialTopTabNavigator();
const CheckOutNavigation = () => {
    return (
        <CheckOutTab.Navigator
            screenOptions={{
                tabBarStyle: {
                    borderRadius: 16,
                    backgroundColor: '#ffa801',
                    padding:5,
                    height: windowHeight * 0.09,
                    
                }
            }}
        >
             <CheckOutTab.Screen name='Chosen' component={CartScreen}
                options={{
                   
                    title: (props) => <TabTitle {...props} item={'Đã chọn'} />
                }}
            />
            <CheckOutTab.Screen name='Processing' component={Processing}
                options={{
                   
                    title: (props) => <TabTitle {...props} item={'Hóa đơn'} />
                }}
            />
            {/* <CheckOutTab.Screen name='Delivering' component={Delivering}
                options={{
                    
                    title: (props) => <TabTitle {...props} item={'Đang giao'} />
                }}
            />
            <CheckOutTab.Screen name='Bought' component={Bought}
                options={{
                   
                    title: (props) => <TabTitle {...props} item={'Đã mua'} />
                }}
            /> */}
           
        </CheckOutTab.Navigator>
    )
}







const Tab = createBottomTabNavigator();
const Main = () => {
    const context = useContext(AuthGlobal);
    const [TabArr,setTabArr] = useState([
        { route: 'Home', label: 'Home', type: Ionicons, activeIcon: 'home', isActiveIcon: 'home-outline', component: HomeNavigation, },
        { route: 'Carts', label: 'Carts', type: Ionicons, activeIcon: 'cart', isActiveIcon: 'cart-outline', component: CartNavigation, IconMore: CartIcon },
        { route: 'Extend', label: 'Extend', type:AntDesign, activeIcon: 'windows', isActiveIcon: 'windowso', component: ExtendNavigation },
    ]);

    
    console.log('contexttttttttt',context.stateUser.user.isAdmin);

    useEffect(()=>{
        AsyncStorage.getItem('isAdmin').then(res=>{
            if(res=='true'){
                setTabArr([
                    { route: 'Home', label: 'Home', type: Ionicons, activeIcon: 'home', isActiveIcon: 'home-outline', component: HomeNavigation, },
                    { route: 'Carts', label: 'Carts', type: Ionicons, activeIcon: 'cart', isActiveIcon: 'cart-outline', component: CartNavigation, IconMore: CartIcon },
                    { route: 'Admin', label: 'Admin', type:Ionicons, activeIcon: 'settings', isActiveIcon: 'settings-outline', component: AdminNavigation },
                    { route: 'Extend', label: 'Extend', type:AntDesign, activeIcon: 'windows', isActiveIcon: 'windowso', component: ExtendNavigation },
                ])
            }else{
                setTabArr([
                    { route: 'Home', label: 'Home', type: Ionicons, activeIcon: 'home', isActiveIcon: 'home-outline', component: HomeNavigation, },
                    { route: 'Carts', label: 'Carts', type: Ionicons, activeIcon: 'cart', isActiveIcon: 'cart-outline', component: CartNavigation, IconMore: CartIcon },
                    { route: 'Extend', label: 'Extend', type:AntDesign, activeIcon: 'windows', isActiveIcon: 'windowso', component: ExtendNavigation },
                ])
            }
        })
    },[context?.stateUser?.user?.isAdmin])

    
    const StateUser = async () =>{
        
    }

    return (
        <Tab.Navigator
            initialRouteName='HomeTab'
            screenOptions={{
                headerShown: false,
                keyboardHidesTabBar: true,
                showLabel: false,
                activeTintColor: '#e91e63',
                tabBarStyle: {
                    height: windowHeight * 0.08,
                    position: 'absolute',
                    bottom: windowHeight * 0.02,
                    right: windowHeight * 0.02,
                    left: windowHeight * 0.02,
                    borderRadius: 16,
                    backgroundColor: '#ffa801'
                }
            }}
        >
            {TabArr?.map((item, index) => {
                return (
                    <Tab.Screen key={index.toString()} name={item.route} component={item.component}
                        options={{
                            tabBarShowLabel: false,
                            tabBarButton: (props) => <TabButton {...props} item={item} />
                        }}

                    />
                )
            }
            )}
        </Tab.Navigator>
    )
}

export default Main;