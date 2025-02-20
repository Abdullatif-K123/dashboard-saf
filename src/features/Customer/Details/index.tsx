import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DividedStack, { DividedStackProps } from "components/layout/DividedStack";
import LabelValue from "components/typography/LabelValue";

import customerQueries from "API/customer/queries";
import NoData from "components/feedback/NoData";
import DialogTitle from "components/forms/DialogTitle";
import GenderText from "components/typography/GenderText";
import RecordTypeColored from "components/typography/RecordTypeColored";
import { LoadingProvider } from "context/loadingContext";
import useDetailsSearchParams from "hooks/useDetailsSearchParams";
import { FC } from "react";
import { useTranslation } from "react-i18next";
type Props = {};
const dividedStackProps: DividedStackProps = {
  gap: 2,
  sx: {
    "& > * ": {
      flexBasis: { xs: "100%" },
      flexGrow: 1,
    },
    "& *": {
      justifyContent: "space-between",
    },
  },
};
const CustomerDetails: FC<Props> = ({}) => {
  const { t } = useTranslation(undefined, { keyPrefix: "customer.details" });
  const { id, isActive, clearDetailsParams } = useDetailsSearchParams();
  const { data, isInitialLoading, isSuccess, isError } = customerQueries.useDetailsQuery(id);
  const handleClose = () => {
    clearDetailsParams();
  };
  return (
    <Dialog open={isActive} onClose={handleClose} fullWidth maxWidth={"xs"}>
      <DialogTitle onClose={handleClose} fontSize={30} color="primary">
        {t("title")}
      </DialogTitle>
      <DialogContent>
        {(isSuccess || isInitialLoading) && (
          <LoadingProvider value={isInitialLoading}>
            <DividedStack {...dividedStackProps}>
              <LabelValue label={t("fullName")} sx={{ flexBasis: { xs: "100%" } }}>
                {data?.fullName}
              </LabelValue>
              <LabelValue label={t("gender")}>
                <GenderText gender={data?.gender ?? 0} />
              </LabelValue>
              <LabelValue label={t("phoneNunber")} ltr>
                {data?.phoneNunber}
              </LabelValue>
              <LabelValue label={t("recordType")} ltr>
                {isSuccess && <RecordTypeColored recordType={data.recordType} />}
              </LabelValue>
            </DividedStack>
          </LoadingProvider>
        )}
        {isError && <NoData />}
      </DialogContent>
    </Dialog>
  );
};
export default CustomerDetails;
