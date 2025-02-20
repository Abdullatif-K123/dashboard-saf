import { Stack } from "@mui/system";
import settingsAPI from "API/settings/api";
import settingsQueries from "API/settings/queries";
import Submit from "components/buttons/Submit";
import Error from "components/feedback/Error";
import Loading from "components/feedback/Loading";
import Editor, { EditorRef } from "components/Inputs/Editor";
import useAxiosErrorSnackbar from "hooks/useAxiosErrorSnackbar";
import useSettingsPermission from "hooks/useSettingsPermission";
import useSuccessSnackbar from "hooks/useSuccessSnackbar";
import { FC, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import parse from "html-react-parser";
import { Paper, Typography } from "@mui/material";

export type PolicyProps = {};
export const Policy: FC<PolicyProps> = ({}) => {
  const { t } = useTranslation(undefined, { keyPrefix: "settings.policy" });
  const query = settingsQueries.usePolicy();
  const editorRef = useRef<EditorRef>(null);
  const errorSnackbar = useAxiosErrorSnackbar();
  const successSnackbar = useSuccessSnackbar();
  const [loading, setLoading] = useState(false);
  const onSubmit = async () => {
    setLoading(true);
    const data = editorRef.current?.getData() ?? "";
    try {
      await settingsAPI.policyAction({ policy: data });
      successSnackbar(t("message.success"));
    } catch (err: unknown) {
      errorSnackbar(err);
    }
    setLoading(false);
  };
  const { hasEditPermission } = useSettingsPermission();

  const editPermission = hasEditPermission();
  return (
    <>
      {query.isSuccess && (
        <Stack alignItems={"center"} gap={1} minHeight="70vh">
          {editPermission && (
            <>
              <Editor initial={query.data ?? ""} preview html ref={editorRef} />
              <Submit
                isSubmitting={loading}
                sx={{ width: "fit-content", mt: "auto" }}
                onClick={onSubmit}
              />
            </>
          )}
          {!editPermission && (
            <Typography
              component={Paper}
              minHeight="70vh"
              sx={{ p: 3 }}
              width="100%"
            >
              {parse(query.data ?? "ـــــ")}
            </Typography>
          )}
        </Stack>
      )}
      {query.isLoading && <Loading />}
      {query.isError && <Error error={query.error} />}
    </>
  );
};
export default Policy;
