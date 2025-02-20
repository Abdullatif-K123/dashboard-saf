export interface Pagination<T> {
  pageNumber: number;
  totalPages: number;
  totalDataCount: number;
  data: T[];
}

export interface Page<T> {
  data: Pagination<T>;
  pageParam: number;
}

export type PaginationParams = {
  pageNumber?: number;
  query?: string;
};

export enum PageSize {
  S_10 = 10,
  S_50 = 50,
  S_100 = 100,
  S_1000 = 1000,
}
