import { Base_Url } from "./BaseUrl";
import axios from 'axios';

const GetAllOrder = async () => {
    try {

        let data = await axios.get(`${Base_Url}/orders`,);
        return data;

    } catch (err) {
        console.log(err);
        return null;
    }

};
const GetAllOrderById = async (id) => {
    try {

        let data = await axios.get(`${Base_Url}/orders/byiduser/${id}`,);
        return data;

    } catch (err) {
        console.log(err);
        return null;
    }

};

const AddOrder = async (order) => {
    try {

        let data = await axios.post(`${Base_Url}/orders`, {
            DiaChiGiaoHang: order.DiaChiGiaoHang,
            DsSanPham: order.DsSanPham,
            LoaiGiaoDich: order.LoaiGiaoDich,
            SoDienThoai: order.SoDienThoai,
            TaiKhoan: order.TaiKhoan,
            TongTien: order.TongTien,
            TrangThai: order.TrangThai
        });
        return data;

    } catch (err) {
        console.log(err);
        return null;
    }

};

const EditOrder = async (id,TrangThai) => {
    try {

        let data = await axios.put(`${Base_Url}/orders/${id}`, {
            
            TrangThai:TrangThai
        });
        return data;

    } catch (err) {
        console.log(err);
        return null;
    }

};


export default {
    GetAllOrder,
    AddOrder,
    GetAllOrderById,
    EditOrder

}