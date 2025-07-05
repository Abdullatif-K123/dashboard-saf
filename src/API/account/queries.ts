import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import controllers from "../../constants/controllers";
import { getNextPageParam, getPreviousPageParam } from "../../utils/apiHelpers";
import accountAPI from "./api";
import { AccountGetAllParams } from "./type";

const accountQueries = {
  useInfiniteQuery: (params: AccountGetAllParams) => {
    const queryResult = useInfiniteQuery(
      [controllers.CpUser, "all", params.query, params.pageNumber],
      async ({ pageParam = 0 }) => {
        const data = await accountAPI.getAll({
          pageNumber: params.pageNumber,
          query: params.query,
        });
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
    const queryResult = useQuery(
      [controllers.CpUser, id],
      () => accountAPI.get(id ?? ""),
      {
        enabled: !!id,
      }
    );
    return queryResult;
  },
};
export default accountQueries;
