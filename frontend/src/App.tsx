import React from "react";
import "./App.css";
import axios from "axios";
import { Table } from "react-bootstrap";
import EditUser from "./EditUser";
import AddUser from "./AddUser";
import DeleteUser from "./DeleteUser";
import { IUser, ISortConfig } from "../../src/Interfaces";
import sortArray from "./sortArray";

function App() {
  const [users, setUsers] = React.useState<IUser[]>([]); //All users in an array
  const [sortedUsers, setSortedUsers] = React.useState<IUser[]>([]); //A sorted user array
  const [edited, setEdited] = React.useState(false); //Boolean value to check if something has been edited and the page should be re-rendered
  const [sortConfig, setSortConfig] = React.useState<ISortConfig>({
    //Settings for sortArray
    sortBy: "",
    direction: "default",
  });

  //Sort array based on sortConfig
  React.useEffect(() => {
    sortArray({ users, sortConfig, setSortedUsers });
  }, [sortConfig, users]);

  //Send get request for all users, if the edited boolean value changes, send request again
  React.useEffect(() => {
    axios
      .get("/users")
      .then((response) => {
        setUsers(response.data);
        setEdited(false);
      })
      .catch((err) => console.log(err));
  }, [edited]);

  //Return a icon based on sort direction
  const getSortIcon = (column: string) => {
    if (sortConfig.sortBy === column) {
      if (sortConfig.direction === "ascending") {
        return "⬆";
      }
      if (sortConfig.direction === "decending") {
        return "⬇";
      }
      return " ";
    }
    return " ";
  };

  //Set sort config based on a column
  //First click is ascending, second is descending and third resets colum to default
  const handleSort = (column: string) => {
    setSortConfig({
      sortBy: column,
      direction:
        sortConfig.direction === "default"
          ? "ascending"
          : sortConfig.direction === "ascending"
          ? "decending"
          : "default",
    });
  };

  //Return a button for adding a new user and a table displaying all users
  return (
    <div className="App">
      <AddUser setEdited={setEdited} />
      <div className="table-container">
        <Table bordered>
          <thead>
            <tr>
              <th
                className="first-name"
                onClick={() => handleSort("first_name")}
              >
                First Name {getSortIcon("first_name")}
              </th>
              <th className="last-name" onClick={() => handleSort("last_name")}>
                Last Name {getSortIcon("last_name")}
              </th>
              <th className="age" onClick={() => handleSort("age")}>
                Age {getSortIcon("age")}
              </th>
              <th>Settings</th>
            </tr>
          </thead>
          <tbody>
            {
              //Select which array to render,
              //should be moved to a function but ran into problems with typescript
              sortedUsers.length !== 0
                ? sortedUsers.map((user: IUser) => (
                    <tr key={user.id}>
                      <td>{user.first_name}</td>
                      <td>{user.last_name}</td>
                      <td>{user.age}</td>
                      <td>
                        <EditUser user={user} setEdited={setEdited} />
                        <DeleteUser user={user} setEdited={setEdited} />
                      </td>
                    </tr>
                  ))
                : users.map((user: IUser) => (
                    <tr key={user.id}>
                      <td>{user.first_name}</td>
                      <td>{user.last_name}</td>
                      <td>{user.age}</td>
                      <td>
                        <EditUser user={user} setEdited={setEdited} />
                        <DeleteUser user={user} setEdited={setEdited} />
                      </td>
                    </tr>
                  ))
            }
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default App;
