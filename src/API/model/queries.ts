import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import controllers from "../../constants/controllers";
import { getNextPageParam, getPreviousPageParam } from "../../utils/apiHelpers";
import modelAPI from "./api";
import { ModelGetAllParams } from "./type";
const modelQueries = {
  useInfiniteQuery: (params: ModelGetAllParams) => {
    const queryResult = useInfiniteQuery(
      [controllers.MODEL, "all", params.query, params.pageNumber],
      async ({ pageParam = 0 }) => {
        const data = await modelAPI.getAll(params);
        return {
          data,
          pageParam,
        };
      },
      {
        getNextPageParam,
        getPreviousPageParam,
      }
    );
    return queryResult;
  },
  useDetailsQuery: (id: string | null) =>
    useQuery([controllers.MODEL, "details", id], () => modelAPI.get(id ?? ""), {
      enabled: !!id,
    }),

  useAction: () => useMutation(modelAPI.action),
  useRemove: () => useMutation(modelAPI.remove),
};
export default modelQueries;
