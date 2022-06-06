// export interface IPaginationResults {
//   readonly items: any[];
//   readonly itemCount: number;
//   readonly totalItems: number;
//   readonly pageCount: number;
//   readonly next?: string;
//   readonly previous?: string;
// }

export interface IPaginationResults {
  items: any[];
  readonly meta: {
    itemCount: number;
    totalItems: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
  readonly links?: any;
}
