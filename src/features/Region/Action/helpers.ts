import { RegionActionBody, RegionDetails } from "API/region/type";
import { RegionActionForm } from "./type";

export function regionFormToBody(data: RegionActionForm): RegionActionBody {
  return {
    id: data.id,
    name: data.name,
    cityId: data.city?.id ?? "",
  };
}
export function regionDetailsToForm(data: RegionDetails): RegionActionForm {
  return {
    id: data.id,
    city: {
      cityName: data.cityName,
      id: data.cityId,
    },
    country: null,
    name: data.regionName,
  };
}
