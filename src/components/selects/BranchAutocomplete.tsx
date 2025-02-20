import { Autocomplete, AutocompleteProps } from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import branchQueries from "../../API/branch/queries";
import { BranchSelect, BranchSelectParams } from "../../API/branch/type";
import Loading from "../feedback/Loading";
type Props = { params: BranchSelectParams } & Omit<
  AutocompleteProps<BranchSelect, false, false, false>,
  "options"
>;
const BranchAutocomplete: FC<Props> = ({ params, ...props }) => {
  const { t } = useTranslation();
  const { data, isLoading } = branchQueries.useSelectQuery(params);
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
export default BranchAutocomplete;
