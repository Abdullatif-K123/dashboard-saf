import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import controllers from "../../constants/controllers";
import { getNextPageParam, getPreviousPageParam } from "../../utils/apiHelpers";
import { RolesGetAllParams } from "API/permissions/type";
import permissionsAPI from "./api";

const permissionsQueries = {
  useInfiniteQuery: (params: RolesGetAllParams) => {
    const queryResult = useInfiniteQuery(
      [controllers.PERMISSION, "all", { ...params }],
      async ({ pageParam = 0 }) => {
        const data = await permissionsAPI.getAll(params);
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
    useQuery(
      [controllers.PERMISSION, "details", id],
      () => permissionsAPI.get(id),
      {
        enabled: !!id,
      }
    ),
  usePermissionsQuery: () =>
    useQuery(
      [controllers.PERMISSION, "permissions"],
      () => permissionsAPI.getPermissions(),
      { staleTime: Infinity }
    ),
  useAction: () => useMutation(permissionsAPI.action),
  useGetRolePermissions: () =>
    useQuery(
      [controllers.PERMISSION, "role-permissions"],
      () => permissionsAPI.getRolePermissions(),
      { staleTime: Infinity }
    ),
};
export default permissionsQueries;
