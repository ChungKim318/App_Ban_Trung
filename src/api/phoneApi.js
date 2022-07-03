import { Base_Url_2 } from "./BaseUrl";
import axios from "axios";

const SendOtp = async (soDienThoai) => {
    try {
        let data = await axios.post(`${Base_Url_2}/sendOtp`,
        {
            
                messageFormat : "Mã OTP ${otp} của bạn tại ứng dụng Trứng yêu. Xin vui lòng không chia sẻ cho bất cứ cá nhân hay tổ chức nào.",
                phoneNumber : soDienThoai,
                otpLength : 6,
                otpValidityInSeconds : 120,     
        },
        {
            headers: {
                "x-as-apikey":"ce80a2ba-9504-4fcf-922c-eed363bffcd8",
                "Content-Type":"application/json"
            }
        }
        );

        return data;

    }catch (err){
        console.log(err)
        return null;
    }
}

const VerifyOtp = async (requestId,otp) => {
    try {
        let data = await axios.post(`${Base_Url_2}/verifyOtp`,
        {
            
                requestId : requestId ,
                otp : otp 
                       
        },
        {
            headers: {
                "x-as-apikey":"ce80a2ba-9504-4fcf-922c-eed363bffcd8",
                "Content-Type":"application/json"
            }
        }
        );

        return data;

    }catch (err){
        console.log(err)
        return null;
    }
}

export default {
    SendOtp,
    VerifyOtp
}