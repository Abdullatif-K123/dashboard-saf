import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import controllers from "../../constants/controllers";
import { getNextPageParam, getPreviousPageParam } from "../../utils/apiHelpers";
import busAPI from "./api";
import { BusGetAllBody, BusGetAllParams } from "./type";
const busQueries = {
  useInfiniteQuery: (params: BusGetAllParams, body: BusGetAllBody) => {
    const queryResult = useInfiniteQuery(
      [controllers.BUS, "all", params.query, params.pageNumber, { ...body }],
      async ({ pageParam = 0 }) => {
        const data = await busAPI.getAll(params, body);
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
  useDetailsQuery: (id: string) =>
    useQuery([controllers.BUS, "details", id], () => busAPI.get(id), {
      enabled: !!id,
    }),
};
export default busQueries;
