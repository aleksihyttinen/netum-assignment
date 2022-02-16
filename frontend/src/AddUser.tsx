import React from "react";
import axios from "axios";
import { Button, Modal, Form, Alert } from "react-bootstrap";
import { IUser } from "./Interfaces";
interface Props {
  setEdited: Function;
}
export default function AddUser({ setEdited }: Props) {
  const [modalVisibility, setModalVisibility] = React.useState(false);
  const [alert, showAlert] = React.useState(false);
  const [newUser, setNewUser] = React.useState<IUser>({
    first_name: "",
    last_name: "",
    age: undefined,
  });
  const addUser = () => {
    if (
      newUser.first_name.length === 0 ||
      newUser.last_name.length === 0 ||
      newUser.age === undefined
    ) {
      showAlert(true);
    } else {
      axios.post(`http://localhost:8080/users/`, newUser).then((response) => {
        console.log(response);
        setEdited(true);
        setModalVisibility(false);
        showAlert(false);
      });
    }
  };
  const handleClose = () => {
    setModalVisibility(false);
    showAlert(false);
    setNewUser({
      first_name: "",
      last_name: "",
      age: undefined,
    });
  };
  return (
    <span className="add-user">
      <Button variant="secondary" onClick={() => setModalVisibility(true)}>
        Add a new user
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
                type="number"
                placeholder="Age"
                min={0}
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
          <Alert
            show={alert}
            dismissible
            onClose={() => showAlert(false)}
            variant="danger"
          >
            Please insert all values before submitting
          </Alert>
          <Button variant="primary" onClick={addUser}>
            Add user
          </Button>
        </Modal.Footer>
      </Modal>
    </span>
  );
}
