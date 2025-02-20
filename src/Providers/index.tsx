import { CssBaseline } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "lib/i18next";
import { FC, useEffect, useState } from "react";
import languageContext, {
  initialContextValue,
} from "../context/languageContext";
import MaterialThemeProvider from "../context/themeContext";
import { changeLanguage } from "../lib/i18next";
import Direction from "./Direction";
import QueryClientContext from "./QueryClient";
import SnackbarProvider from "./SnackbarProvider";
import SocketHubConnectionProvider from "./SocketHubConnectionProvider";
import RolePermissionsProvider from "Providers/RolePermissionsProvider";
const Providers: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState(initialContextValue.lang);
  useEffect(() => {
    changeLanguage(lang);
  }, [lang]);
  return (
    <QueryClientContext>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <languageContext.Provider value={{ lang, setLang }}>
          <MaterialThemeProvider>
            <SnackbarProvider>
              <SocketHubConnectionProvider>
                <Direction>
                  <CssBaseline />
                  <RolePermissionsProvider>{children}</RolePermissionsProvider>
                </Direction>
              </SocketHubConnectionProvider>
            </SnackbarProvider>
          </MaterialThemeProvider>
        </languageContext.Provider>
      </LocalizationProvider>
    </QueryClientContext>
  );
};
export default Providers;
