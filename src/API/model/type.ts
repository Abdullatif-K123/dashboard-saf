import { PaginationParams } from "../../types/api";

export type ModelGetAllParams = PaginationParams;
export type Model = {
  id: string;
  name: string;
  module: string;
  chairCount: number;
  busCount: number;
  columnCount: number;
};
export type ModelDetails = {
  id: string;
  name: string;
  module: string;
  columnCount: number;
  chairCount: number;
};
export type ModelActionBody = {
  id?: string;
  name: string;
  module: string;
  chairCount: number;
  columnCount: number;
};
