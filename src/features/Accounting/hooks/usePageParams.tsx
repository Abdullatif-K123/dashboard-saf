import { AccountingParams } from "API/accounting/type";
import usePageNumberSearchParam from "../../../hooks/usePageNumberSearchParam";
import useQuerySearchParam from "../../../hooks/useQuerySearchParam";

export const usePageParams = (): AccountingParams => {
  const query = useQuerySearchParam();
  const pageNumber = usePageNumberSearchParam();

  return { query, pageNumber };
};
export default usePageParams;
