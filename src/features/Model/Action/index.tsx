import { yupResolver } from "@hookform/resolvers/yup";
import { Fade, Grid, Stack } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

import { useQueryClient } from "@tanstack/react-query";
import modelQueries from "API/model/queries";
import TextFieldControlled from "components/Inputs/TextFieldControlled";
import Submit from "components/buttons/Submit";
import ActionForm from "components/forms/ActionForm";
import DialogTitle from "components/forms/DialogTitle";
import controllers from "constants/controllers";
import useActionSearchParams from "hooks/useActionSearchParams";
import useAxiosErrorSnackbar from "hooks/useAxiosErrorSnackbar";
import useSuccessSnackbar from "hooks/useSuccessSnackbar";
import { FC, useCallback, useDeferredValue, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Bus } from "./Bus";
import { modelDetailsToForm, modelFormToBody } from "./helpers";
import { ModelActionForm } from "./type";
import modelActionSchema, { modelActionDefault } from "./validation";
import { useRoleContext } from "context/RolePermissionsContext";
import { PermissionName } from "API/permissions/type";

type Props = {};
const ModelAction: FC<Props> = ({}) => {
  const { t } = useTranslation();
  const tName = "model";
  const { clearActionParams, id, isActive, isEdit } = useActionSearchParams();
  const { data, isLoading } = modelQueries.useDetailsQuery(id);
  const { control, setValue, reset, trigger, watch, handleSubmit } =
    useForm<ModelActionForm>({
      resolver: yupResolver(modelActionSchema),
      defaultValues: modelActionDefault,
      mode: "onTouched",
    });
  const errorSnackbar = useAxiosErrorSnackbar();
  const successSnackbar = useSuccessSnackbar();
  const queryClient = useQueryClient();
  const action = modelQueries.useAction();
  const deferredRows = useDeferredValue(watch("rows"));
  const deferredColumns = useDeferredValue(watch("columns"));
  const [initialModule, setInitialModel] = useState(() => watch("module"));
  const updateModel = useCallback(
    (module: (number | null)[]) => {
      setValue("module", module);
      setValue(
        "chairCount",
        module.reduce(
          (sum, value) => (value !== null ? Number(sum) + 1 : sum),
          0
        ) ?? 0
      );
      trigger("chairCount");
    },
    [setValue, trigger]
  );
  const handleClose = () => {
    clearActionParams();
    reset(modelActionDefault);
    setInitialModel([]);
  };
  const onSubmit = (form: ModelActionForm) => {
    action.mutate(modelFormToBody(form), {
      onSuccess: () => {
        queryClient.invalidateQueries([controllers.MODEL, id]);
        //TODO invalidate is not working for some reason
        queryClient.removeQueries([controllers.MODEL, "all"]);
        successSnackbar(t(`${tName}.message.${isEdit ? "edit" : "add"}`));
        handleClose();
      },
      onError: errorSnackbar,
    });
  };
  useEffect(() => {
    if (data) {
      reset(modelDetailsToForm(data));
      setInitialModel(modelDetailsToForm(data).module);
    }
  }, [data, reset]);

  const { hasAddPermission, hasEditPermission } = useRoleContext();

  if (isEdit && !hasEditPermission(PermissionName.Model)) {
    return null;
  }
  if (!isEdit && !hasAddPermission(PermissionName.Model)) {
    return null;
  }

  return (
    <>
      <Dialog open={isActive} onClose={handleClose} fullWidth maxWidth={"sm"}>
        <Fade in={isActive} timeout={0}>
          <DialogTitle onClose={handleClose} fontSize={30} color="primary">
            {t(`${tName}.${isEdit ? "edit" : "add"}`)}
          </DialogTitle>
        </Fade>
        <DialogContent sx={{ height: "80vh" }}>
          <ActionForm isEdit={isEdit} isLoading={isLoading}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container>
                <Grid
                  item
                  xs={12}
                  md={6}
                  my={1}
                  gap={2}
                  component={Stack}
                  sx={{ flexDirection: "column" }}
                >
                  <TextFieldControlled
                    control={control}
                    name="name"
                    label={t(`${tName}.name`)}
                  />
                  <TextFieldControlled
                    control={control}
                    type="number"
                    label={t(`${tName}.columns`)}
                    onChange={(event) => {
                      const newValue = Number(event.currentTarget.value);
                      if (newValue >= 1 && newValue <= 7) {
                        setValue("columns", newValue);
                        const newModel = migrateGrid(
                          watch("rows"),
                          newValue,
                          watch("module")
                        );
                        updateModel(newModel);
                        setInitialModel(newModel);
                      }
                    }}
                    name={"columns"}
                  />
                  <TextFieldControlled
                    control={control}
                    type="number"
                    label={t(`${tName}.rows`)}
                    onChange={(event) => {
                      const newValue = Number(event.currentTarget.value);
                      if (newValue >= 1 && newValue <= 16) {
                        setValue("rows", newValue);
                        const newModel = migrateGrid(
                          newValue,
                          watch("columns"),
                          watch("module")
                        );
                        updateModel(newModel);
                        setInitialModel(newModel);
                      }
                    }}
                    name={"rows"}
                  />
                  <TextFieldControlled
                    InputProps={{ readOnly: true }}
                    control={control}
                    label={t(`${tName}.chairCount`)}
                    name={"chairCount"}
                  />
                  <Submit isSubmitting={action.isLoading} sx={{ mt: "auto" }} />
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{ overflowY: "hidden", order: { xs: -1, md: 1 } }}
                >
                  {((data && isEdit) || !isEdit) && (
                    <Bus
                      key={data?.id}
                      rows={deferredRows}
                      columns={deferredColumns}
                      initialModule={initialModule}
                      setModule={updateModel}
                    />
                  )}
                </Grid>
              </Grid>
            </form>
          </ActionForm>
        </DialogContent>
      </Dialog>
    </>
  );
};
function migrateGrid(
  newRows: number,
  newCols: number,
  prevBlock: (number | null)[]
): (number | null)[] {
  const blocks: (number | null)[] = new Array(newRows * newCols).fill(null);
  for (let r = 0; r < newRows; r++) {
    for (let c = 0; c < newCols; c++) {
      if (r < newRows && c < newCols) {
        blocks[r * newCols + c] = prevBlock[r * newCols + c] ?? null;
      } else {
        blocks[r * newCols + c] = null;
      }
    }
  }
  return blocks;
}
export default ModelAction;
