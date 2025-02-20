import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import controllers from "constants/controllers";
import versionAPI from "./api";
import { VersionGetAllParams } from "./type";
import { getNextPageParam, getPreviousPageParam } from "utils/apiHelpers";
 


const versionQueries = {
      useInfiniteQuery: (params: VersionGetAllParams)=>{
         const queryResult = useInfiniteQuery(
             [controllers.VERSION, "all", params.pageNumber, params.query],
             async({pageParam = 0})=>{
                 const data = await versionAPI.getAll(params); 
                 return {
                     data, 
                     pageParam
                 }
             },{
                 getNextPageParam,
                 getPreviousPageParam, 
        refetchOnMount: "always",
             }
         );
         return queryResult
      }, 
      useDetailsQuery: (id: string)=>
        useQuery([controllers.VERSION, "details", id], ()=> versionAPI.get(id))
}
export default versionQueries;