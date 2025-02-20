import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { ButtonBase, Checkbox, Stack, TableCell } from "@mui/material";
import { PermissionName } from "API/permissions/type";
import { TourCustomer } from "API/tour/type";
import { useSnackbarContext } from "Providers/SnackbarProvider";
import LTR from "components/layout/LTR";
import TableRowStriped from "components/tables/PaginationTable/TableRowStriped";
import GenderText from "components/typography/GenderText";
import { BookingType } from "constants/enums";
import { useRoleContext } from "context/RolePermissionsContext";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
export type CustomerRowProps = {
  data: TourCustomer;
  isCancelingActive: boolean;
  onCancelChange: (chairNumber: string) => void;
  onEditClick: () => void;
};
export const CustomerRow: FC<CustomerRowProps> = ({
  data,
  onEditClick,
  isCancelingActive,
  onCancelChange,
}) => {
  const [checked, setChecked] = useState(false);
  const { t: tBookType } = useTranslation(undefined, {
    keyPrefix: "enum.BookingType",
  });
  const snackbar = useSnackbarContext();
  const { t } = useTranslation();
  const handleRowClick = () => {
    if (isCancelingActive) {
      setChecked((prev) => !prev);
      onCancelChange(data.tourCustomerChairId);
    } else {
      onEditClick();
    }
  };
  const { hasEditPermission, hasDeletePermission } = useRoleContext();

  const editPermission = hasEditPermission(PermissionName.TourBooking);
  const deletePermission = hasDeletePermission(PermissionName.TourBooking);
  return (
    <TableRowStriped
      sx={editPermission ? { cursor: "pointer" } : {}}
      onClick={editPermission ? handleRowClick : () => {}}
    >
      <TableCell width={50} sx={{ p: 0 }}>
        {isCancelingActive && deletePermission && (
          <Checkbox
            color="error"
            sx={{ svg: { color: "error.main" } }}
            checked={checked}
          />
        )}
      </TableCell>
      <TableCell>{data.customerName}</TableCell>
      <TableCell>
        <LTR>{data.customerPhoneNumber}</LTR>
      </TableCell>
      <TableCell>{data.firstName}</TableCell>
      <TableCell>{data.lastName}</TableCell>
      <TableCell>
        <GenderText gender={data.gender} />
      </TableCell>
      <TableCell>
        <LTR>{data.phomeNumber}</LTR>
      </TableCell>
      <TableCell>{data.nationalNumber}</TableCell>
      <TableCell>{data.chairNumber}</TableCell>
      <TableCell sx={{ p: 0 }}>
        <ButtonBase
          sx={{ p: 1, borderRadius: 1 }}
          onClick={(e) => {
            e.stopPropagation();
            navigator.clipboard.writeText(data.code).then(
              () => {
                snackbar({
                  message: t("copyToClipboard.success"),
                  severity: "success",
                });
              },
              (err) => {
                snackbar({
                  message: t("copyToClipboard.error"),
                  severity: "error",
                });
                console.error(err);
              }
            );
          }}
        >
          {data.code}
        </ButtonBase>
      </TableCell>
      <TableCell>
        <Stack sx={{ alignItems: "center" }}>
          {data.isPaid ? (
            <CheckIcon />
          ) : (
            <ClearIcon sx={{ color: "secondary.main" }} />
          )}
        </Stack>
      </TableCell>
      <TableCell>{tBookType(BookingType[data.bookingType])}</TableCell>
    </TableRowStriped>
  );
};
