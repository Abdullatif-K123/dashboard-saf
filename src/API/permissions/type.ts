import { PaginationParams } from "types/api";

export type RolesGetAllParams = PaginationParams;

export interface Role {
  roleId: string;
  roleName: string;
  permissions: userRole[];
}
export interface NewRole {
  roleId: string;
  roleName: string;
}
export type Permission = {
  id: string;
  name: string;
  canAdd: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canView: boolean;
  canDownload: boolean;
};

export type userRole = {
  id: string;
  name: string;
};

export enum PermissionAction {
  canAdd = "canAdd",
  canEdit = "canEdit",
  canDelete = "canDelete",
  canView = "canView",
  canDownload = "canDownload",
}

export enum PermissionName {
  Owner = "Owner",
  Branch = "Branch",
  Model = "Model",
  Bus = "Bus",
  Tour = "Tour",
  Customer = "Customer",
  Accounting = "Accounting",
  Account = "Account",
  Setting = "Setting",
  Country = "Country",
  City = "City",
  Region = "Region",
  Version = "Version",
  Permission = "Permission",
  TourBooking = "TourBooking",
}

export type RoleDetails = Omit<Role, "permissions"> & {
  name: string;
  permissions: Permission[];
};

export type RolePermissions = Permission[];

export type RoleBody = RoleDetails;
