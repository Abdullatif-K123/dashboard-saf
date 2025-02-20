import { PaginationParams } from "../../types/api";

export type CountryGetAllParams = PaginationParams;

export type Country = {
  id: string;
  name: string;
  cityCount: number;
};

export type CountrySelect = Pick<Country, "id" | "name">;
export type CountryDetails = {
  id: string;
  name: string;
  cityCount: number;
};

export type CountryActionBody = {
  id?: string;
  name: string;
};
