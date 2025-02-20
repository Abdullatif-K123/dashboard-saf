import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import controllers from "../../constants/controllers";
import { getNextPageParam, getPreviousPageParam } from "../../utils/apiHelpers";
import branchAPI from "./api";
import { BranchGetAllBody, BranchGetAllParams, BranchSelectParams } from "./type";
const branchQueries = {
  useInfiniteQuery: (params: BranchGetAllParams, body: BranchGetAllBody) => {
    const queryResult = useInfiniteQuery(
      [controllers.BRANCH, "all", params.query, params.pageNumber, { ...body }],
      async ({ pageParam = 0 }) => {
        const data = await branchAPI.getAll(params, body);
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
  useSelectQuery: (params: BranchSelectParams) => {
    const queryResult = useQuery([controllers.BRANCH, "select", { ...params }], () =>
      branchAPI.getSelect(params)
    );
    return queryResult;
  },
  useDetailsQuery: (id: string) => {
    const queryResult = useQuery([controllers.BRANCH, "details", id], () => branchAPI.get(id), {
      enabled: !!id,
    });
    return queryResult;
  },
};
export default branchQueries;
