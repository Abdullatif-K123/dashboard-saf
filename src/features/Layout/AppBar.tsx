import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import { MenuItem, Select, SelectChangeEvent, Tooltip } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import languageContext from "context/languageContext";
import i18next from "i18next";
import { availableLanguages } from "lib/i18next";
import { FC, useContext } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { storage } from "utils/storage";
import { drawerWidth } from ".";
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

export const AppBarStyled = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
type Props = { open: boolean; onDrawerOpen: () => void; onDrawerClose: () => void };
const AppBar: FC<Props> = ({ open, onDrawerOpen, onDrawerClose }) => {
  const { t } = useTranslation();
  let pageTitle = useLocation().pathname.split("/")[1];
  pageTitle = pageTitle ? pageTitle : "home";
  const { lang, setLang } = useContext(languageContext);
  const navigate = useNavigate();
  const handleChangeLanguage = (e: SelectChangeEvent) => {
    setLang(e.target.value);
    setLanguageGlobally(e.target.value);
  };
  const handleLogout = () => {
    navigate("/login");
    storage.clearToken();
  };
  return (
    <AppBarStyled position="fixed" open={open} key={pageTitle}>
      <Toolbar>
        <IconButton color="inherit" onClick={open ? onDrawerClose : onDrawerOpen} edge="start">
          <MenuIcon sx={{ color: "white" }} />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          {t(`navLink.${pageTitle}`)}
        </Typography>
        <Select
          value={lang}
          onChange={handleChangeLanguage}
          size="small"
          sx={{
            color: "white",
            svg: { color: "white" },
            height: "fit-content",
            ml: "auto",
          }}
          MenuProps={{ MenuListProps: { sx: { p: 0 } } }}
        >
          {availableLanguages.map((language) => (
            <MenuItem value={language} key={language}>
              {language}
            </MenuItem>
          ))}
        </Select>
        <Tooltip title={t("generic.logout")}>
          <IconButton onClick={handleLogout}>
            <LogoutIcon sx={{ color: "white" }} />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBarStyled>
  );
};
export const setLanguageGlobally = (lang: string) => {
  i18next.changeLanguage(lang);
  document.documentElement.lang = lang;
  localStorage.setItem("lang", lang);
  switch (lang) {
    case "ar":
      document.dir = "rtl";
      break;
    default:
      document.dir = "ltr";
  }
};
export default AppBar;
