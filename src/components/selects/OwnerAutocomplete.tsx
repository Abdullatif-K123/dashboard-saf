import { Autocomplete, AutocompleteProps } from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import ownerQueries from "../../API/owner/queries";
import { OwnerSelect } from "../../API/owner/type";
import Loading from "../feedback/Loading";
type Props = {} & Omit<AutocompleteProps<OwnerSelect, false, false, false>, "options">;
const OwnerAutocomplete: FC<Props> = ({ ...props }) => {
  const { t } = useTranslation();
  const { data, isLoading } = ownerQueries.useSelectQuery();
  return (
    <Autocomplete
      isOptionEqualToValue={(option, value) => option.id === value.id}
      {...props}
      loading={isLoading}
      options={data ?? []}
      getOptionLabel={(option) => option.name}
      renderOption={(props, option) => (
        <li {...props} key={option.id}>
          {option.name}
        </li>
      )}
      loadingText={<Loading />}
      noOptionsText={t("error.noData")}
    />
  );
};
export default OwnerAutocomplete;
