import React from "react";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import { IUser } from "../../src/Interfaces";
//Interface for props
interface IProps {
  user: IUser;
  setEdited: Function;
}

//Return a button and a modal for deleting a user based on user id
export default function EditUser({ user, setEdited }: IProps) {
  const [modalVisibility, setModalVisibility] = React.useState(false); //Boolean value for modal visibility

  //Send delete request to backend and change setEdited to true, to re-render the table
  const deleteUser = () => {
    axios.delete(`/users/${user.id}`).then((response) => {
      console.log(response);
      setEdited(true);
      setModalVisibility(false);
    });
  };

  return (
    <span className="delete-user">
      <Button variant="link" size="sm" onClick={() => setModalVisibility(true)}>
        Delete
      </Button>
      <Modal
        show={modalVisibility}
        backdrop="static"
        onHide={() => setModalVisibility(false)}
      >
        <Modal.Header>
          <Modal.Title>
            Are you sure you want to delete this user permanently?
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button onClick={() => setModalVisibility(false)}>Cancel</Button>
          <Button variant="danger" onClick={deleteUser}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </span>
  );
}
