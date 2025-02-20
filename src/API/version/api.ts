import API_ROUTES from "constants/apiRoutes"; 
import axiosInstance from "API/axios";
import { version, VersionActionType, VersionGetAllParams } from "./type";
import { Pagination } from "types/api";

const getAll = async (params: VersionGetAllParams)=>{
     const {data} = await axiosInstance.get<Pagination<version>>(API_ROUTES.Version.GET_ALL, {
         params
     });
     return data
}
const action = async(body: VersionActionType)=>{
    const {data} =  await axiosInstance.post(API_ROUTES.Version.ACTION_VERSION, body)
    return data
}
const get = async(id: string)=>{
    
     const {data} = await axiosInstance.get<version>(
         API_ROUTES.Version.GET,{
             params: {versionId: id},
         }); 
         console.log(data)
         return data; 
}


const versionAPI  = {
    getAll,
    get,
     action
}

export default versionAPI