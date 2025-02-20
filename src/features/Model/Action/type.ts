export type ModelActionForm = {
  id?: string;
  name: string;
  chairCount: number;
  columns: number;
  rows: number;
  module: (number | null)[];
};
