import { saveAs } from "file-saver";
import customerQueries from "API/customer/queries";
import usePageNumberSearchParam from "hooks/usePageNumberSearchParam";
import useQuerySearchParam from "hooks/useQuerySearchParam";
import useNumberEnumSearchParam from "hooks/useNumberEnumSearchParam";
import { PageSize } from "types/api";
import { RecordType } from "constants/enums";
import useAxiosErrorSnackbar from "hooks/useAxiosErrorSnackbar";
import LoadingButton from "components/buttons/LoadingButton";

const ExportCustomersButton = () => {
  const download = customerQueries.useDownload();
  const pageNumber = usePageNumberSearchParam();
  const query = useQuerySearchParam();
  const recordType = useNumberEnumSearchParam<RecordType>("recordType") ?? null;
  const pageSize = useNumberEnumSearchParam<PageSize>("ps") ?? null;

  const params = {
    query,
    recordType,
    pageNumber,
    pageSize,
  };
  const errSnack = useAxiosErrorSnackbar();

  const handleClick = () => {
    download.mutate(params, {
      onSuccess: (val) => {
        const blob = new Blob([val.data], {
          type: "application/vnd.ms-excel",
        });
        const contentDisposition = val.headers["content-disposition"];
        const filenameMatch = contentDisposition.match(/filename="(.*?)"/);
        const filename: string | undefined = filenameMatch
          ? filenameMatch[1]
          : undefined;

        let newName =
          filename !== undefined ? filename.slice(filename.length - 16) : null;

        newName = ` قائمة الزبائن ${newName}`;
        saveAs(blob, newName);
      },
      onError: (err) => errSnack(err),
    });
  };

  return (
    <>
      <LoadingButton
        isLoading={download.isLoading}
        type="button"
        variant="contained"
        sx={{
          fontSize: { xs: 10, sm: 15 },
          minWidth: 140,
        }}
        onClick={handleClick}
        label="تصدير"
      />
    </>
  );
};

export default ExportCustomersButton;
