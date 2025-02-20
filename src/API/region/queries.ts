import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import controllers from "../../constants/controllers";
import { getNextPageParam, getPreviousPageParam } from "../../utils/apiHelpers";
import regionAPI from "./api";
import { RegionGetAllNpParams, RegionGetAllParams } from "./type";

const regionQueries = {
  useInfiniteQuery: (params: RegionGetAllParams) => {
    const queryResult = useInfiniteQuery(
      [controllers.REGION, "all", params.query, params.pageNumber, params.cityId, params.countryId],
      async ({ pageParam = 0 }) => {
        const data = await regionAPI.getAll(params);
        return {
          data,
          pageParam,
        };
      },
      {
        getNextPageParam,
        getPreviousPageParam,
        refetchOnMount: "always",
      }
    );
    return queryResult;
  },
  useQuery: (id: string | null) => {
    const queryResult = useQuery([controllers.REGION, id], () => regionAPI.get(id ?? ""), {
      enabled: !!id,
    });
    return queryResult;
  },
  useSelectQuery: (params: RegionGetAllNpParams) => {
    const queryResult = useQuery(
      [controllers.REGION, "select", { ...params }],
      () => regionAPI.getAllNp(params),
      { select: (regions) => regions.map(({ id, regionName }) => ({ id, regionName })) }
    );
    return queryResult;
  },
};
export default regionQueries;
