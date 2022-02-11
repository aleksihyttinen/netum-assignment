import React from "react";
import "./App.css";
import axios from "axios";
function App() {
  const [users, setUsers] = React.useState([]);
  React.useEffect(() => {
    axios.get("http://localhost:8080/users").then((response) => {
      setUsers(response.data);
    });
  }, []);
  console.log(users);
  return <div className="App"></div>;
}

export default App;
