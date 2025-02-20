import { AccountingBody } from "API/accounting/type";
import { BranchSelect } from "API/branch/type";
import useObjectSearchParam from "hooks/useObjectSearchParam";
import { useSearchParams } from "react-router-dom";

const usePageBody = (): AccountingBody => {
  const [searchParams] = useSearchParams();
  const branchId = useObjectSearchParam<BranchSelect>("branch")?.id;
  const isCompanyConfirm = searchParams.get("isCompanyConfirm");
  const isOwnerConfirm = searchParams.get("isOwnerConfirm");
  const body = {
    branchIds: branchId ? [branchId] : null,
    from: searchParams.get("from"),
    to: searchParams.get("to"),
    isCompanyConfirm: isCompanyConfirm ? !!+isCompanyConfirm : null,
    isOwnerConfirm: isOwnerConfirm ? !!+isOwnerConfirm : null,
  };
  return body;
};

export default usePageBody;
