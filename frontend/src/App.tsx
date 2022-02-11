import React from "react";
import "./App.css";
import axios from "axios";
import { Table } from "react-bootstrap";
function App() {
  const [users, setUsers] = React.useState([]);
  React.useEffect(() => {
    axios.get("http://localhost:8080/users").then((response) => {
      setUsers(response.data);
    });
  }, []);
  console.log(users);
  return (
    <div className="App">
      <div className="Table-container">
        <Table bordered>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: any) => (
              <tr key={user.id}>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.age}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default App;
