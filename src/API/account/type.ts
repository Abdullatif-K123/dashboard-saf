import { UserKind } from "constants/enums";
import { PaginationParams } from "../../types/api";

export type AccountGetAllParams = PaginationParams;
export type loginToken = {
  userName: string;
  firstName: string;
  lastName: string;
  token: string;
  refreshToken: string;
};
export type Account = {
  rolesName: string[];
  userName: string;
  name: string;
  phoneNumber: string;
  id: string;
};

export type AccountDetails = {
  rolesName: UserKind[];
  userName: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  id: string;
};

export type AccountActionBody = {
  id?: string;
  userName: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  roles: UserKind[];
  password?: string;
};

export type AccountLoginBody = {
  userName: string;
  password: string;
  rememberMe: boolean;
  fcmToken?: string;
};
