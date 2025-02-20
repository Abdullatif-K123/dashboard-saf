import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import controllers from "../../constants/controllers";
import { getNextPageParam, getPreviousPageParam } from "../../utils/apiHelpers";
import ownerAPI from "./api";
import { OwnerGetAllParams } from "./type";
const ownerQueries = {
  useInfiniteQuery: (params: OwnerGetAllParams) => {
    const queryResult = useInfiniteQuery(
      [controllers.OWNER, "all", { ...params }],
      async ({ pageParam = 0 }) => {
        const data = await ownerAPI.getAll(params);
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
  useSelectQuery: () => {
    const queryResult = useQuery([controllers.OWNER, "select"], () => ownerAPI.getSelect());
    return queryResult;
  },
  useDetailsQuery: (id: string) =>
    useQuery([controllers.OWNER, "details", id], () => ownerAPI.get(id), {
      enabled: !!id,
    }),
  useChangeRecordType: () => useMutation(ownerAPI.changeRecordType),
};
export default ownerQueries;
