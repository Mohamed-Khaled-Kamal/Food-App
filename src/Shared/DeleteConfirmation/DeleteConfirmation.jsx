import React from "react";
import { Modal, Button } from "react-bootstrap";
import Delete from "../../assets/Imgs/delete.png";

export default function DeleteConfirmation({ 
  show, 
  handleClose, 
  handleDeleteConfirm, 
  btnName = "Delete",
  img
}) {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <div className="d-flex justify-content-end p-2">
        <i 
          onClick={handleClose} 
          style={{ cursor: "pointer" }} 
          className="far fa-times-circle text-danger fs-3"
        ></i>
      </div>
      <Modal.Body>
        <div className="text-center">
          <img src={img} alt="delete confirmation" className="mb-3" />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="btn btn-outline-danger" onClick={handleDeleteConfirm}>
          {btnName}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
