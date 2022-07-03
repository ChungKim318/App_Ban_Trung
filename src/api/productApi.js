import { Base_Url } from "./BaseUrl";
import axios from "axios";

const GetAllProducts = async () => {
    try {

        let data = await axios.get(`${Base_Url}/products`);
        return data;

    }catch (err){
        console.log(err);
        return null;
    }
    
}

const DeleteProduct = async (id,token) =>{
    try {
        let datadelete = await axios.delete(`${Base_Url}/products/${id}`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        });
        return datadelete;
    }catch(err){
        console.log(err);
        return null;
    }
}

const AddProduct = async (product,token) => {
    try{
     //   console.log('formdata',product, token)
        let dataAdd = await axios.post(`${Base_Url}/products`,
            product
        ,{
            headers:{
                Authorization: `Bearer ${token}`,
                "Content-Type" : "multipart/form-data"
            }
        })
        return dataAdd;
    }catch (err){
        console.log(err)
    }
}

const UpdateProduct = async (product,token,idProduct) => {
    try{
     //  console.log('formdata',product, token," ------" ,idProduct)

   // console.log(`${Base_Url}/products/${idProduct}`)
        let dataUpdate = await axios.put(`${Base_Url}/products/${idProduct}`,
            product
        ,{
            headers:{
                Authorization: `Bearer ${token}`,
                "Content-Type" : "multipart/form-data"
            }
        })
        return dataUpdate;
    }catch (err){
        console.log(err)
    }
}


export default {
    GetAllProducts,
    DeleteProduct,
    AddProduct,
    UpdateProduct
}