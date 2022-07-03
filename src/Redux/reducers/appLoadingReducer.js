import { IS_LOADING_TRUE, IS_LOADING_FALSE } from "../type";

const initState = {
    isLoading: false,
};

const AppLoadingReducer = (state = initState,action) => {
    switch (action.type) {
        case IS_LOADING_TRUE:
            return {
                isLoading: true,
            };
        case IS_LOADING_FALSE:
            return {
                isLoading:false,
            };
    }
    return state;
}

export default AppLoadingReducer;