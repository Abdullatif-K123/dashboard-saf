import { PaginationParams } from "types/api"
export type VersionGetAllParams = PaginationParams;
export type version  = {
     id: string,
     currentVersion: string,
     minimumVersion: string
}
export type VersionActionType = {
     id?: string,
     currentVersion: string, 
     minimumVersion: string
}