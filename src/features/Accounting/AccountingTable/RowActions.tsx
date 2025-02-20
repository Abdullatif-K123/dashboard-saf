import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";

import { AccountingGet } from "API/accounting/type";
import ShowIconButton from "components/buttons/ShowIconButton";
import ButtonsStack from "components/layout/ButtonsStack";
import { useAccountingContext } from "features/Accounting/context/AccountingContext";

type Props = {
  row: AccountingGet;
};

const RowActions = ({ row }: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setModalOpened, setTours } = useAccountingContext();

  return (
    <ButtonsStack alignItems="center" justifyContent="left">
      <ShowIconButton
        onClick={() => {
          navigate(`/cash/${row.tourId}`);
        }}
      />
      {row.isCompanyConfirm && (
        <Typography sx={{ color: "gray" }} variant="subtitle2">
          {t("accounting.received")}
        </Typography>
      )}
      {!row.isCompanyConfirm && (
        <Button
          sx={{ whiteSpace: "nowrap" }}
          disabled={row.isCompanyConfirm}
          onClick={() => {
            setTours([row.tourId]);
            setModalOpened(true);
          }}
        >
          {t("accounting.receivedConfirm")}
        </Button>
      )}
    </ButtonsStack>
  );
};

export default RowActions;
