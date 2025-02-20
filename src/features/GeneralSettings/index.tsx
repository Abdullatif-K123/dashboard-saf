import { Paper } from "@mui/material";
import { Stack } from "@mui/system";
import settingsQueries from "API/settings/queries";
import Loading from "components/feedback/Loading";
import { FC } from "react";
import CompanyRatio from "./CompanyRatio";
import Error from "components/feedback/Error";
import useSettingsPermission from "hooks/useSettingsPermission";
import ViewOnly from "features/GeneralSettings/CompanyRatio/ViewOnly";

export type GeneralSettings = {};

export const GeneralSettings: FC<GeneralSettings> = ({}) => {
  const query = settingsQueries.useCompanyRatio();
  const { hasEditPermission } = useSettingsPermission();

  const editPermission = hasEditPermission();
  return (
    <Paper sx={{ minHeight: "70vh" }}>
      {query.isSuccess && (
        <Stack gap={1} px={5}>
          {editPermission && <CompanyRatio data={query.data} />}
          {!editPermission && <ViewOnly value={query.data} />}
        </Stack>
      )}
      {query.isInitialLoading && <Loading stackProps={{ py: 10 }} />}
      {query.isError && <Error error={query.error} />}
    </Paper>
  );
};
export default GeneralSettings;
