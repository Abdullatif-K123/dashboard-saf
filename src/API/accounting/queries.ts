import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import controllers from "../../constants/controllers";
import { getNextPageParam, getPreviousPageParam } from "../../utils/apiHelpers";
import accountingAPI from "./api";
import {
  AccountingBody,
  AccountingDetailsParams,
  AccountingParams,
} from "./type";

const accountingQueries = {
  useInfiniteQuery: (params: AccountingParams, body: AccountingBody) =>
    useInfiniteQuery(
      [controllers.ACCOUNTING, "all", { ...params, ...body }],
      async ({ pageParam = 0 }) => {
        const data = await accountingAPI.getAll(params, body);
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
    ),
    useInfiniteQueryCash: (params: AccountingParams, body: AccountingBody) =>
      useInfiniteQuery(
        [controllers.ACCOUNTING, "cash", { ...params, ...body }],
        async ({ pageParam = 0 }) => {
          const data = await accountingAPI.getAllCash(params, body);
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
      ),
  useDetailsInfiniteQuery: (params: AccountingDetailsParams) => {
    const queryResult = useInfiniteQuery(
      [controllers.ACCOUNTING, "details", { ...params }],
      async ({ pageParam = 0 }) => {
        const data = await accountingAPI.getDetails(params);
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
  useAction: () => useMutation(accountingAPI.action),
};
export default accountingQueries;
