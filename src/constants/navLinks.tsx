import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
// import AppsIcon from "@mui/icons-material/Apps";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import BusinessIcon from "@mui/icons-material/Business";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import ExploreIcon from "@mui/icons-material/Explore";
import GridViewIcon from "@mui/icons-material/GridView";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PeopleIcon from "@mui/icons-material/People";
import PublicIcon from "@mui/icons-material/Public";
import SecurityIcon from "@mui/icons-material/Security";
import SettingsIcon from "@mui/icons-material/Settings";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import TuneIcon from "@mui/icons-material/Tune";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import AppsIcon from "@mui/icons-material/Apps";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { PermissionName } from "API/permissions/type";

import { ReactNode } from "react";
export type NavLink = {
  href: string;
  permissionName:
    | PermissionName
    | "No_Permission_Needed"
    | "Settings_Permission";
  icon: ReactNode;
  children?: NavLink[];
};

export const HomeLink: NavLink = {
  href: "",
  permissionName: "No_Permission_Needed",
  icon: <AppsIcon />,
};

export const navLinks: NavLink[][] = [
  [
    {
      href: "owners",
      permissionName: PermissionName.Owner,
      icon: <SupportAgentIcon />,
    },
    {
      href: "branches",
      permissionName: PermissionName.Branch,
      icon: <CorporateFareIcon />,
    },
    {
      href: "models",
      permissionName: PermissionName.Model,
      icon: <GridViewIcon />,
    },
    {
      href: "buses",
      permissionName: PermissionName.Bus,
      icon: <DirectionsBusIcon />,
    },
    {
      href: "tours",
      permissionName: PermissionName.Tour,
      icon: <ExploreIcon />,
    },
    {
      href: "customers",
      permissionName: PermissionName.Customer,
      icon: <PeopleIcon />,
    },
  ],

  [
    {
      href: "accounting",
      permissionName: PermissionName.Accounting,
      icon: <AttachMoneyIcon />,
      children: [
        {
          href: "cash",
          permissionName: PermissionName.Accounting,
          icon: <AttachMoneyIcon />,
        },
        {
          href: "online",
          permissionName: PermissionName.Accounting,
          icon: <PriceCheckIcon />,
        },
      ],
    },
  ],
  [
    {
      href: "admins",
      permissionName: PermissionName.Account,
      icon: <AdminPanelSettingsIcon />,
    },
    {
      href: "permissions",
      permissionName: PermissionName.Permission,
      icon: <VpnKeyIcon />,
    },
    {
      href: "settings",
      permissionName: "Settings_Permission",
      icon: <SettingsIcon />,
      children: [
        {
          href: "general",
          permissionName: PermissionName.Setting,
          icon: <TuneIcon />,
        },
        {
          href: "countries",
          permissionName: PermissionName.Country,
          icon: <PublicIcon />,
        },
        {
          href: "cities",
          permissionName: PermissionName.City,
          icon: <LocationCityIcon />,
        },
        {
          href: "regions",
          permissionName: PermissionName.Region,
          icon: <BusinessIcon />,
        },
        {
          href: "version",
          permissionName: PermissionName.Setting,
          icon: <AppRegistrationIcon />,
        },
        {
          href: "about",
          permissionName: PermissionName.Setting,
          icon: <HelpOutlineOutlinedIcon />,
        },
        {
          href: "policy",
          permissionName: PermissionName.Setting,
          icon: <SecurityIcon />,
        },
      ],
    },
  ],
];
