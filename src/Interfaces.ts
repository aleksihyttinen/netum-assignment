export interface IUser {
  id?: number;
  first_name: string;
  last_name: string;
  age?: number;
}
export interface ISortConfig {
  sortBy: string;
  direction?: string;
}
