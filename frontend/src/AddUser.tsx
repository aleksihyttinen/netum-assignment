import React from "react";
import axios from "axios";
import { Button, Modal, Form, Alert } from "react-bootstrap";
import { IUser } from "../../src/Interfaces";

//Interface for props
interface IProps {
  setEdited: Function;
}

//Return a button and a modal for adding a new user
export default function AddUser({ setEdited }: IProps) {
  const [modalVisibility, setModalVisibility] = React.useState(false); //Boolean value for modal visibility
  const [alert, showAlert] = React.useState(false); //Boolean value for alert visibility
  const [newUser, setNewUser] = React.useState<IUser>({
    //New user object
    first_name: "",
    last_name: "",
    age: undefined,
  });

  //If inputs aren't empty, send post request to backend with the newUser object
  const addUser = () => {
    if (
      newUser.first_name.length === 0 ||
      newUser.last_name.length === 0 ||
      newUser.age === undefined
    ) {
      showAlert(true);
    } else {
      axios.post(`/users/`, newUser).then((response) => {
        console.log(response);
        setEdited(true);
        setModalVisibility(false);
        showAlert(false);
      });
    }
  };
  //Hide modal and alert and set newUser to the default values
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
      <Button
        variant="secondary"
        className="add-user-button"
        onClick={() => setModalVisibility(true)}
      >
        Add a new user
      </Button>
      <Modal
        show={modalVisibility}
        size="sm"
        backdrop="static"
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add a new user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Form functionality isn't actually used here, but can be easily changed to work with submit if needed */}
            <Form.Group className="add-user" controlId="formAddUser">
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
                className="number-input"
                type="number"
                placeholder="Age"
                min={0}
                onChange={(e) => {
                  let intAge = Math.abs(parseInt(e.target.value));
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
    </span>
  );
}
