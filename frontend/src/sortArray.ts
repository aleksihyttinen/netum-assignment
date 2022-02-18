import { IUser, ISortConfig } from "../../src/Interfaces";
//Interface for props
interface IProps {
  users: IUser[];
  sortConfig: ISortConfig;
  setSortedUsers: Function;
}
//Sort an array based on sortConfig
export default function sortArray({
  users,
  sortConfig,
  setSortedUsers,
}: IProps) {
  //If direction is default, set the table to default order
  if (sortConfig.direction === "default") {
    setSortedUsers(users);
  } else {
    let sortedArray: any[] = [...users];
    //Sort users based on the given column and direction
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
