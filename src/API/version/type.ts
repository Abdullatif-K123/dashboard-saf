export type VersionGetAllParams = [];
export type version = {
  data: {
    id: string;
    currentVersion: string;
    minimumVersion: string;
  };
};
export type VersionActionType = {
  id?: string;
  currentVersion: string;
  minimumVersion: string;
};
