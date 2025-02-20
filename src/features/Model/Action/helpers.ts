import { ModelActionBody, ModelDetails } from "API/model/type";
import { ModelActionForm } from "./type";

export function modelFormToBody(data: ModelActionForm): ModelActionBody {
  return {
    id: data.id,
    columnCount: data.columns,
    name: data.name,
    chairCount: data.chairCount,
    module: JSON.stringify(data.module),
  };
}
export function modelDetailsToForm(data: ModelDetails): ModelActionForm {
  return {
    id: data.id,
    columns: data.columnCount,
    name: data.name,
    rows: (JSON.parse(data.module) as (number | null)[]).length / data.columnCount,
    module: JSON.parse(data.module) as (number | null)[],
    chairCount: data.chairCount,
  };
}
