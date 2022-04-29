export interface PaginationCriteria {
  page: number;
  pageSize: number;
}

export interface Paginated<T> {
  items: T[];
  total: number;
}
