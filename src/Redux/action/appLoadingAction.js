import { IS_LOADING_TRUE, IS_LOADING_FALSE } from "../type";

const onIsLoadingTrue = () =>{
    return {
        type: IS_LOADING_TRUE,
    };
};

const onIsLoadingFalse = () => {
    return {
        type: IS_LOADING_FALSE,
    };
};


export { onIsLoadingTrue,onIsLoadingFalse }