import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import controllers from "constants/controllers";
import versionAPI from "./api";
import { version, VersionGetAllParams } from "./type";
import { getNextPageParam, getPreviousPageParam } from "utils/apiHelpers";
 


const versionQueries = {
    useVersionGetAll: () => {
        return useQuery(
          [controllers.VERSION, "all"],
          async () => {
            const data = await versionAPI.getAll();
            return data;  
          },
          {
            refetchOnMount: "always",
          }
        );
      },
      useDetailsQuery: (id: string)=>
        useQuery([controllers.VERSION, "details", id], ()=> versionAPI.get(id))
}
export default versionQueries;