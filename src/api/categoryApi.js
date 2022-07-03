import { Base_Url } from "./BaseUrl";
import axios from 'axios';

const GetAllCategories = async () => {
    try {

        let data = await axios.get(`${Base_Url}/categories`,);
        return data;

    }catch (err){
        console.log(err);
        return null;
    }
    
};
const AddCategories = async (Ten,token) => {
    try {

        let data = await axios.post(`${Base_Url}/categories`,{
            "Ten":Ten
        },{
            headers:{
                Authorization: `Bearer ${token}`,
                "Content-Type":"application/json"
            }
        });

        return data;

    }catch (err){
        console.log(err);
        return null;
    }
    
};

const UpdateCategories = async (Ten,token,id) => {
    try {

        let data = await axios.put(`${Base_Url}/categories/${id}`,{
            "Ten":Ten
        },{
            headers:{
                Authorization: `Bearer ${token}`,
                "Content-Type":"application/json"
            }
        });

        return data;

    }catch (err){
        console.log(err);
        return null;
    }
    
};

const DeleteCategories = async (id,token) => {
    try {

        let data = await axios.delete(`${Base_Url}/categories/${id}`,      
        {
            headers:{
                Authorization: `Bearer ${token}`,
                "Content-Type":"application/json"
            }
        });

        return data;

    }catch (err){
        console.log(err);
        return null;
    }
    
};

export default {
    GetAllCategories,
    AddCategories,
    UpdateCategories,
    DeleteCategories

}