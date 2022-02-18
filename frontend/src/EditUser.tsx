import React from "react";
import axios from "axios";
import { Button, Modal, Form, Alert } from "react-bootstrap";
import { IUser } from "../../src/Interfaces";
//Interface for props
interface IProps {
  user: IUser;
  setEdited: Function;
}
//Return a button and a modal for editing a user based on id
export default function EditUser({ user, setEdited }: IProps) {
  const [modalVisibility, setModalVisibility] = React.useState(false); //Boolean value for modal visibility
  const [alert, showAlert] = React.useState(false); //Boolean value for alert visibility
  const [editedUser, setEditedUser] = React.useState<IUser>({
    //Edited user object, initialized with the old user data
    first_name: user.first_name,
    last_name: user.last_name,
    age: user.age,
  });

  //If inputs aren't empty, send put request to backend with the editedUser object
  const saveChanges = () => {
    if (
      editedUser.first_name.length === 0 ||
      editedUser.last_name.length === 0 ||
      isNaN(Number(editedUser.age))
    ) {
      showAlert(true);
    } else {
      axios
        .put(`/users/${user.id}`, editedUser)
        .then((response) => {
          console.log(response);
          setEdited(true);
          setModalVisibility(false);
          showAlert(false);
        })
        .catch((err) => console.log(err));
    }
  };
  //Hide modal and alert and set editedUser to the default values
  const handleClose = () => {
    setModalVisibility(false);
    showAlert(false);
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
        <Modal
          show={modalVisibility}
          size="sm"
          backdrop="static"
          onHide={handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit user</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              {/* Form functionality isn't actually used here, but can be easily changed to work with submit if needed */}
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
                  className="number-input"
                  type="number"
                  min={0}
                  value={!isNaN(Number(editedUser.age)) ? editedUser.age : ""}
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
            <Alert
              show={alert}
              dismissible
              onClose={() => showAlert(false)}
              variant="danger"
            >
              Don't insert empty values
            </Alert>
          </Modal.Footer>
        </Modal>
      </>
    </span>
  );
}
