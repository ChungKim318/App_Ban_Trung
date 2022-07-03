import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import cartReducer from './reducers/cartReducer';
import AppLoadingReducer from './reducers/appLoadingReducer';
import AuthReducer from './reducers/authReducer';

const reducers = combineReducers({
    cartReducer: cartReducer,
    appLoadingReducer:AppLoadingReducer,
    
});

const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
)

export default store;