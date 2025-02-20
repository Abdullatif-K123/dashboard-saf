import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import controllers from "constants/controllers";
import { getNextPageParam, getPreviousPageParam } from "utils/apiHelpers";
import tourAPI from "./api";
import { TourGetAllBody, TourGetAllParams, TourGetCustomersParams } from "./type";
const tourQueries = {
  useInfiniteQuery: (params: TourGetAllParams, body: TourGetAllBody) => {
    const queryResult = useInfiniteQuery(
      [controllers.TOUR, "all", { ...params }, { ...body }],
      async ({ pageParam = 0 }) => {
        const data = await tourAPI.getAll(params, body);
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
  useDetailsQuery: (id: string) =>
    useQuery([controllers.TOUR, "details", id], () => tourAPI.get(id), {
      enabled: !!id,
    }),
  useDetailsForCustomerQuery: (id: string) =>
    useQuery(
      [controllers.TOUR, "detailsForCustomer", id],
      () => tourAPI.getForCustomer({ tourId: id }),
      {
        enabled: !!id,
      }
    ),
  useCustomers: (params: TourGetCustomersParams) =>
    useInfiniteQuery(
      [controllers.TOUR, "reservations", { ...params }],
      async ({ pageParam = 0 }) => {
        const data = await tourAPI.getCustomers(params);
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
  useUnBook: () => useMutation(tourAPI.unbook),
  useCustomerAction: () => useMutation(tourAPI.customerAction),
  useBookedChairs: (tourId: string) =>
    useQuery({
      queryKey: [controllers.TOUR, "bookedChairs", tourId],
      queryFn: () => tourAPI.getBusBookedChairs(tourId),
      refetchOnMount: "always",
      staleTime: Infinity,
    }),
};
export default tourQueries;
