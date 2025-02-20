import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Button, Stack, StackProps, Typography } from "@mui/material";
import ErrorPersonIcon from "components/icons/ErrorPersonIcon";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
type Props = { retry?: () => void; message: string | undefined } & StackProps;
const ClientError: FC<Props> = ({ retry, message, ...props }) => {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <Stack alignItems={"center"} py={10} px={1} gap={1} {...props}>
      <Box sx={{ width: "80%", display: "flex", justifyContent: "center" }}>
        <ErrorPersonIcon />
      </Box>
      <Typography color="primary" variant="h6" textAlign={"center"}>
        {t`error.sorry`} {t`error.somethingWentWrong`}
      </Typography>
      <Typography component={"span"} color="primary" variant="body1" textAlign={"center"}>
        {message && (
          <Stack>
            <Button
              sx={{ borderRadius: 1, width: "fit-content", mx: "auto" }}
              endIcon={isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              size="small"
              onClick={() => setIsExpanded((prev) => !prev)}
              variant="text"
            >
              {t(isExpanded ? "generic.showLess" : "generic.showMore")}
            </Button>
            {isExpanded && message}
          </Stack>
        )}
      </Typography>
      {retry && (
        <Button onClick={retry} variant="contained" sx={{ mt: 2, px: "30px !important" }}>
          {t("error.retry")}
        </Button>
      )}
    </Stack>
  );
};
export default ClientError;
