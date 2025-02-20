import { Checkbox, TableCell, Tooltip } from "@mui/material";
import { useAccountingContext } from "features/Accounting/context/AccountingContext";
import { useTranslation } from "react-i18next";

const ToggleTourSelectionButton = ({
  id,
  disabled,
}: {
  id: string;
  disabled?: boolean;
}) => {
  const { t } = useTranslation();

  const { isSelectionEnabeld, tours, toggleTour } = useAccountingContext();
  if (!isSelectionEnabeld) return <TableCell></TableCell>;

  const isChecked = tours.includes(id);

  return (
    <TableCell width={50} sx={{ p: 0 }}>
      {isSelectionEnabeld && (
        <Tooltip
          title={
            disabled
              ? t("accounting.disabledTourSelectionTooltip")
              : t("accounting.tourSelectionTooltip")
          }
        >
          <div>
            <Checkbox
              disabled={disabled}
              color="error"
              sx={{ svg: { color: disabled ? "#777" : "error.main" } }}
              checked={isChecked}
              onClick={() => toggleTour(id)}
            />
          </div>
        </Tooltip>
      )}
    </TableCell>
  );
};

export default ToggleTourSelectionButton;
