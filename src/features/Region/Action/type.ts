export type RegionActionForm = {
  id?: string;
  name: string;
  country: {
    id: string;
    name: string;
  } | null;
  city: {
    id: string;
    cityName: string;
  } | null;
};
