import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Paper,
  Slide,
  Typography,
  useTheme,
} from "@mui/material";
import { Stack } from "@mui/system";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import { storage } from "utils/storage";
import accountAPI from "../../API/account/api";
import { AccountLoginBody } from "../../API/account/type";
import PasswordInput from "../../components/Inputs/PasswordInput";
import UsernameInput from "../../components/Inputs/UsernameInput";
import Submit from "../../components/buttons/Submit";
import useAxiosErrorSnackbar from "../../hooks/useAxiosErrorSnackbar";
import { BusIcon, LoginBackgroundIcon } from "./icons";
import loginSchema, { loginDefault } from "./validation";
import { useQueryClient } from "@tanstack/react-query";
import controllers from "constants/controllers";
import { getFirebaseToken } from "firebase";

const isSupported = () =>
  "Notification" in window &&
  "serviceWorker" in navigator &&
  "PushManager" in window;

const Login = () => {
  const isLTR = useTheme().direction === "ltr";
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<AccountLoginBody>({
    resolver: yupResolver(loginSchema),
    defaultValues: loginDefault,
  });

  const navigate = useNavigate();
  const { t } = useTranslation();
  const errorSnackbar = useAxiosErrorSnackbar();
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const onSubmit = async (data: AccountLoginBody) => {
    const fromPage = searchParams.get("redirect");
    try {
      if (isSupported()) {
        if (Notification.permission === "granted") {
          data.fcmToken = (await getFirebaseToken()) ?? "";
        }
      }
      const token = await accountAPI.login(data);
      storage.setToken({ token });
      await queryClient.invalidateQueries([
        controllers.PERMISSION,
        "permissions",
      ]);
      navigate(fromPage || "/", { replace: true });
    } catch (err: unknown) {
      errorSnackbar(err);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          minHeight: "100vh",
          boxSizing: "border-box",
          width: "100vw",
          overflow: "hidden",
          "&>svg:nth-of-type(1)": {
            position: "fixed",
            minHeight: "100vh",
            scale: isLTR ? "-1 1" : "1",
            zIndex: -1,
            top: 0,
            right: 0,
          },
        }}
      >
        <Slide in={true} direction="up" timeout={300}>
          <Paper
            elevation={1}
            sx={{
              width: { xs: "90vw", sm: "80%", md: 600 },
              height: { xs: "70vh", sm: "fit-content" },
              mt: "12%",
              ml: { xs: "auto", md: 33 },
              mr: "auto",
              borderRadius: 2,
              overflow: "hidden",
              p: 3,
            }}
          >
            <Stack height={1}>
              <Typography color="primary" variant="h4" textAlign={"center"}>
                {t("login.submit")}
              </Typography>
              <Stack gap={2} mt={8} width="80%" mx="auto">
                <UsernameInput control={control} name="userName" />
                <PasswordInput control={control} name="password" />
                <FormControlLabel
                  sx={{ mx: 2, width: "fit-content" }}
                  control={<Checkbox />}
                  label={t`login.remember`}
                />
              </Stack>
              <Box
                mx="auto"
                sx={{ mt: { xs: "auto", sm: "0" } }}
                width="fit-content"
              >
                <Submit
                  sx={{ px: 5 }}
                  isSubmitting={isSubmitting}
                >{t`login.submit`}</Submit>
              </Box>
            </Stack>
          </Paper>
        </Slide>
        <LoginBackgroundIcon />
        <Stack
          sx={{
            position: "fixed",
            zIndex: -1,
            top: { xs: "unset", md: "10%" },
            bottom: { xs: "2%", md: "unset" },
            right: "5%",
            gap: 7,
            alignItems: "center",
            img: {
              width: 150,
              display: { xs: "none", md: "block" },
            },
            svg: {
              width: { xs: 255, sm: 455 },
              height: { xs: 234, sm: 434 },
            },
          }}
        >
          <Box component={"img"} src="images/logo.svg" />
          <BusIcon />
        </Stack>
      </Box>
    </form>
  );
};
export default Login;
