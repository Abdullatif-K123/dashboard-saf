import { StackProps } from "@mui/material";
import { AxiosError } from "axios";
import { FC } from "react";
import { parseBackendError } from "utils/apiHelpers";
import ClientError from "./ClientError";
import SomethingWentWrong from "./SomethingWentWrong";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";
export type ErrorProps = { error: unknown; retry?: () => void } & StackProps;
export const Error: FC<ErrorProps> = ({ error, retry, ...props }) => {
  const { t } = useTranslation();
  let message: string | undefined = t("error.somethingWentWrong");
  let status = 500;
  if (error instanceof AxiosError) {
    const backendError = parseBackendError(error);
    if (backendError) {
      message = backendError;
    }
    status = error.response?.status ?? status;
  }
  if (status === 403) {
    return <Navigate to="/403" />;
  }
  return status === 500 ? (
    <SomethingWentWrong retry={retry} {...props} />
  ) : (
    <ClientError message={message} retry={retry} {...props} />
  );
};
export default Error;
