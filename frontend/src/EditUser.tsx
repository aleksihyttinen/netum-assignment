import React from "react";
import axios from "axios";
import { Button, Modal, Form } from "react-bootstrap";
interface Props {
  user: any;
  setEdited: Function;
}
interface User {
  first_name: string;
  last_name: string;
  age: number;
}
export default function EditUser({ user, setEdited }: Props) {
  const [modalVisibility, setModalVisibility] = React.useState(false);
  const [editedUser, setEditedUser] = React.useState<User>({
    first_name: user.first_name,
    last_name: user.last_name,
    age: user.age,
  });
  const saveChanges = () => {
    console.log(editedUser);
    setModalVisibility(false);
    axios
      .delete(`http://localhost:8080/users/100`)
      .then((response) => {
        setEdited(true);
        console.log(response);
      })
      .catch((err) => console.log(err));
  };
  const handleClose = () => {
    setModalVisibility(false);
    setEditedUser({
      first_name: user.first_name,
      last_name: user.last_name,
      age: user.age,
    });
  };
  return (
    <span className="Edit-user">
      <Button variant="link" size="sm" onClick={() => setModalVisibility(true)}>
        Edit
      </Button>
      <>
        <Modal show={modalVisibility} backdrop="static" onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit user</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="edit-user" controlId="formEditUser">
                <Form.Label>First name</Form.Label>
                <Form.Control
                  value={editedUser.first_name}
                  onChange={(e) =>
                    setEditedUser({
                      first_name: e.target.value,
                      last_name: editedUser.last_name,
                      age: editedUser.age,
                    })
                  }
                />
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  value={editedUser.last_name}
                  onChange={(e) =>
                    setEditedUser({
                      first_name: editedUser.first_name,
                      last_name: e.target.value,
                      age: editedUser.age,
                    })
                  }
                />
                <Form.Label>Age</Form.Label>
                <Form.Control
                  value={editedUser.age}
                  onChange={(e) => {
                    let intAge = parseInt(e.target.value);
                    setEditedUser({
                      first_name: editedUser.first_name,
                      last_name: editedUser.last_name,
                      age: intAge,
                    });
                  }}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={saveChanges}>
              Save changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </span>
  );
}
