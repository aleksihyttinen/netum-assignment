import React from "react";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
interface Props {
  user: any;
  setEdited: Function;
}
export default function EditUser({ user, setEdited }: Props) {
  const [modalVisibility, setModalVisibility] = React.useState(false);
  const deleteUser = () => {
    axios.delete(`http://localhost:8080/users/${user.id}`).then((response) => {
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