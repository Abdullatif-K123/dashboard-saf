import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";

import { useAccountingContext } from "features/Accounting/context/AccountingContext";
import ButtonsStack from "components/layout/ButtonsStack";

const SelectToursButton = () => {
  const { t } = useTranslation();
  const { setIsSelectionEnabeld, isSelectionEnabeld, tours, setModalOpened } =
    useAccountingContext();

  const handleClick = () => {
    if (isSelectionEnabeld) {
      if (tours.length !== 0) setModalOpened(true);
      else setIsSelectionEnabeld(false);
    } else {
      setIsSelectionEnabeld(true);
    }
  };

  return (
    <ButtonsStack sx={{ width: "fit-content" }}>
      <Button variant="contained" size="small" onClick={handleClick}>
        {isSelectionEnabeld &&
          tours.length !== 0 &&
          t("accounting.receivedConfirm")}
        {isSelectionEnabeld && tours.length === 0 && t("generic.cancel")}
        {!isSelectionEnabeld && t("accounting.selectToRecieve")}
      </Button>
    </ButtonsStack>
  );
};

export default SelectToursButton;
