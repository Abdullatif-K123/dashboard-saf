import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import controllers from "../../constants/controllers";
import { getNextPageParam, getPreviousPageParam } from "../../utils/apiHelpers";
import countryAPI from "./api";
import { CountryGetAllParams } from "./type";
const countryQueries = {
  useInfiniteQuery: (params: CountryGetAllParams) => {
    const queryResult = useInfiniteQuery(
      [controllers.COUNTRY, "all", params.query, params.pageNumber],
      async ({ pageParam = 0 }) => {
        const data = await countryAPI.getAll(params);
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
    const queryResult = useQuery([controllers.COUNTRY, id], () => countryAPI.get(id ?? ""), {
      enabled: !!id,
    });
    return queryResult;
  },
  useSelectQuery: () => {
    const queryResult = useQuery([controllers.COUNTRY, "select"], () => countryAPI.getAllNp(), {
      select: (countries) => countries.map(({ id, name }) => ({ id, name })),
    });
    return queryResult;
  },
};
export default countryQueries;
