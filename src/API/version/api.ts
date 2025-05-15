import API_ROUTES from "constants/apiRoutes"; 
import axiosInstance from "API/axios";
import { version, VersionActionType, VersionGetAllParams } from "./type"; 

const getAll = async ()=>{
     const {data} = await axiosInstance.get<version>(API_ROUTES.Version.GET_ALL);
     return data
}
const action = async(body: VersionActionType)=>{
    const {data} =  await axiosInstance.post(API_ROUTES.Version.ACTION_VERSION, body)
    return data
}
const get = async(id: string)=>{
    
     const {data} = await axiosInstance.get<version>(
         API_ROUTES.Version.GET,{
             params: {id: id},
         });  
         return data; 
}


const versionAPI  = {
    getAll,
    get,
     action
}

export default versionAPI