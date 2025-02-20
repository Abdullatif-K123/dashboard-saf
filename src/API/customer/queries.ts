import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import controllers from "../../constants/controllers";
import { getNextPageParam, getPreviousPageParam } from "../../utils/apiHelpers";
import customerAPI from "./api";
import { CustomerGetAllParams } from "./type";
const customerQueries = {
  useInfiniteQuery: (params: CustomerGetAllParams) => {
    const queryResult = useInfiniteQuery(
      [controllers.CUSTOMER, "all", { ...params }],
      async ({ pageParam = 0 }) => {
        const data = await customerAPI.getAll(params);
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
    useQuery([controllers.CUSTOMER, "details", id], () => customerAPI.get(id), {
      enabled: !!id,
    }),
  useChangeRecordType: () => useMutation(customerAPI.changeRecordType),
  useDownload: () => useMutation(customerAPI.getDownload),
};
export default customerQueries;
