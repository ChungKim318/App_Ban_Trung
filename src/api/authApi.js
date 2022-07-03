import { Base_Url } from "./BaseUrl";
import axios from "axios";


const Login = async (TenTaiKhoan,MatKhau) => {
    try {
        
        let data = await axios.post(`${Base_Url}/users/login`,{
            TaiKhoan:TenTaiKhoan,
            MatKhau:MatKhau
        },{
            headers:{
                "Content-Type":"application/json"
            }
        }
        );
       // console.log(data)
        return data;
    } catch (err) {
        console.log(err);
        return null;
    } 
};

const Register = async (TenTaiKhoan,MatKhau,SoDienThoai) => {
    try {
        let data = await axios.post(`${Base_Url}/users/register`,{
            TaiKhoan:TenTaiKhoan,
            MatKhau:MatKhau,
            SoDienThoai:SoDienThoai
        },
        );
     //   console.log(data)
        return data;
    } catch (err) {
        console.log(err);
        return null;
    } 
};

const GetProfile = async (id,token) =>{
    try {
        let data = await axios.get(`${Base_Url}/users/${id}`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        return data;
    }catch (err){
        console.log(err)
        return null;
    }
}

const GetAllUser = async () =>{
    try {
        let data = await axios.get(`${Base_Url}/users`)
        return data;
    }catch (err){
        console.log(err)
        return null;
    }
}

const EditProfile = async (profile,id) =>{
    try {
        console.log('editttttt',profile, id)
        let data = await axios.put(`${Base_Url}/users/${id}`,{
            Ten:profile.Ten,
            DiaChi:profile.DiaChi,
            TinhTP:profile.TinhTP,
            QuanHuyen:profile.QuanHuyen,
            PhuongXa:profile.PhuongXa,
            SoDienThoai:profile.SoDienThoai,
            DiaChiGiaoHang1:profile.DiaChiGiaoHang1,
            DiaChiGiaoHang2:profile.DiaChiGiaoHang2
        })
        return data;
    }catch (err){
        console.log(err)
        return null;
    }
}

export default {
    Login,
    Register,
    GetProfile,
    GetAllUser,
    EditProfile
}