import { TablePagination } from "@mui/material";
import { InfiniteData } from "@tanstack/react-query";
import useNumberEnumSearchParam from "hooks/useNumberEnumSearchParam";
import { useTranslation } from "react-i18next";
import { PageSize, Pagination } from "types/api";

interface PaginationTableProps {
  data?: InfiniteData<{
    data: Pagination<unknown>;
    pageParam: any;
  }>;
  page: number;
  handleChangePage: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => void;
}

const PaginationButtons = ({
  data,
  page,
  handleChangePage,
}: PaginationTableProps) => {
  const { t } = useTranslation();
  const isDisabled = !data;
  const pageSize = useNumberEnumSearchParam<PageSize>("ps") ?? null;

  return (
    <TablePagination
      rowsPerPageOptions={[data?.pages[0].data.data?.length ?? 0]}
      labelDisplayedRows={(info) => t("generic.pagination", { ...info })}
      component="div"
      count={data?.pages[0].data.totalDataCount ?? 0}
      rowsPerPage={pageSize ?? 10}
      page={page}
      onPageChange={handleChangePage}
      SelectProps={{
        disabled: isDisabled,
      }}
    />
  );
};

export default PaginationButtons;
