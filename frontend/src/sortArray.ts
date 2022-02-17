import { IUser, ISortConfig } from "./Interfaces";
interface IProps {
  users: IUser[];
  sortConfig: ISortConfig;
  setSortedUsers: Function;
}
export default function sortArray({
  users,
  sortConfig,
  setSortedUsers,
}: IProps) {
  if (sortConfig.direction === "default") {
    setSortedUsers(users);
  } else {
    let sortedArray: any[] = [...users];
    sortedArray.sort((a, b) => {
      if (typeof a[sortConfig.sortBy] === "string") {
        if (
          a[sortConfig.sortBy].toLowerCase() <
          b[sortConfig.sortBy].toLowerCase()
        ) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (
          a[sortConfig.sortBy].toLowerCase() >
          b[sortConfig.sortBy].toLowerCase()
        ) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
      } else {
        if (a[sortConfig.sortBy] < b[sortConfig.sortBy]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.sortBy] > b[sortConfig.sortBy]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
      }
      return 0;
    });
    setSortedUsers(sortedArray);
  }
}
