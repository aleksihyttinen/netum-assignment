import React from "react";
import "./App.css";
import axios from "axios";
import { Table } from "react-bootstrap";
import EditUser from "./EditUser";
import AddUser from "./AddUser";
import DeleteUser from "./DeleteUser";
import { IUser, ISortConfig } from "./Interfaces";
import sortArray from "./sortArray";
function App() {
  const [users, setUsers] = React.useState<IUser[]>([]);
  const [sortedUsers, setSortedUsers] = React.useState<IUser[]>([]);
  const [edited, setEdited] = React.useState(false);
  const [sortConfig, setSortConfig] = React.useState<ISortConfig>({
    sortBy: "",
    direction: "default",
  });

  React.useEffect(() => {
    sortArray({ users, sortConfig, setSortedUsers });
  }, [sortConfig, users]);

  React.useEffect(() => {
    axios
      .get("/users")
      .then((response) => {
        setUsers(response.data);
        setEdited(false);
      })
      .catch((err) => console.log(err));
  }, [edited]);

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

  return (
    <div className="App">
      <AddUser setEdited={setEdited} />
      <div className="Table-container">
        <Table bordered>
          <thead>
            <tr>
              <th
                className="first-name"
                onClick={() => {
                  setSortConfig({
                    sortBy: "first_name",
                    direction:
                      sortConfig.direction === "default"
                        ? "ascending"
                        : sortConfig.direction === "ascending"
                        ? "decending"
                        : "default",
                  });
                }}
              >
                First Name {getSortIcon("first_name")}
              </th>
              <th
                className="last-name"
                onClick={() => {
                  setSortConfig({
                    sortBy: "last_name",
                    direction:
                      sortConfig.direction === "default"
                        ? "ascending"
                        : sortConfig.direction === "ascending"
                        ? "decending"
                        : "default",
                  });
                }}
              >
                Last Name {getSortIcon("last_name")}
              </th>
              <th
                className="age"
                onClick={() => {
                  setSortConfig({
                    sortBy: "age",
                    direction:
                      sortConfig.direction === "default"
                        ? "ascending"
                        : sortConfig.direction === "ascending"
                        ? "decending"
                        : "default",
                  });
                }}
              >
                Age {getSortIcon("age")}
              </th>
              <th>Settings</th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.length !== 0
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
                ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default App;
