import React from "react";
import "./App.css";
import axios from "axios";
import { Table } from "react-bootstrap";
import EditUser from "./EditUser";
import AddUser from "./AddUser";
import DeleteUser from "./DeleteUser";
function App() {
  const [users, setUsers] = React.useState([]);
  const [edited, setEdited] = React.useState(false);
  React.useEffect(() => {
    axios
      .get("http://localhost:8080/users")
      .then((response) => {
        setUsers(response.data);
        setEdited(false);
      })
      .catch((err) => console.log(err));
  }, [edited]);
  console.log(users);
  return (
    <div className="App">
      <AddUser setEdited={setEdited} />
      <div className="Table-container">
        <Table bordered>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
              <th>Settings</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: any) => (
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
