import React from "react";
import axios from "axios";
import { Button, Modal, Form } from "react-bootstrap";
interface Props {
  setEdited: Function;
}
interface User {
  first_name: string;
  last_name: string;
  age: number;
}
export default function AddUser({ setEdited }: Props) {
  const [modalVisibility, setModalVisibility] = React.useState(false);
  const [newUser, setNewUser] = React.useState<User>({
    first_name: "",
    last_name: "",
    age: NaN,
  });
  const addUser = () => {
    axios.post(`http://localhost:8080/users/`, newUser).then((response) => {
      console.log(response);
      setEdited(true);
      setModalVisibility(false);
    });
  };
  const handleClose = () => {
    setModalVisibility(false);
    setNewUser({
      first_name: "",
      last_name: "",
      age: NaN,
    });
  };
  return (
    <span className="add-user">
      <Button variant="secondary" onClick={() => setModalVisibility(true)}>
        Add a new person
      </Button>
      <Modal show={modalVisibility} backdrop="static" onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a new user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="edit-user" controlId="formEditUser">
              <Form.Label>First name</Form.Label>
              <Form.Control
                placeholder="First name"
                onChange={(e) =>
                  setNewUser({
                    first_name: e.target.value,
                    last_name: newUser.last_name,
                    age: newUser.age,
                  })
                }
              />
              <Form.Label>Last name</Form.Label>
              <Form.Control
                placeholder="Last name"
                onChange={(e) =>
                  setNewUser({
                    first_name: newUser.first_name,
                    last_name: e.target.value,
                    age: newUser.age,
                  })
                }
              />
              <Form.Label>Age</Form.Label>
              <Form.Control
                placeholder="Age"
                onChange={(e) => {
                  let intAge = parseInt(e.target.value);
                  setNewUser({
                    first_name: newUser.first_name,
                    last_name: newUser.last_name,
                    age: intAge,
                  });
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={addUser}>
            Add user
          </Button>
        </Modal.Footer>
      </Modal>
    </span>
  );
}
