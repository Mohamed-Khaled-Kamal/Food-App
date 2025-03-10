import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

export default function CategoriesData({ 
  show, handleClose, handleAddCategory, handleEditCategory, categoryToEdit 
}) {
  const [category, setCategory] = useState({ name: "" });

  useEffect(() => {
    if (categoryToEdit !== null) {  
      setCategory({ name: categoryToEdit.name });
    } else {
      setCategory({ name: "" });
    }
  }, [categoryToEdit]);

  const handleSave = () => {
    if (categoryToEdit) {
        handleEditCategory({ id: categoryToEdit.id, name: category.name }); 
    } else {
        handleAddCategory(category);
    }
    handleClose();
};

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{categoryToEdit ? "Edit Category" : "Add New Category"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Category Name</Form.Label>
            <Form.Control 
              type="text" 
              value={category.name} 
              onChange={(e) => setCategory({ name: e.target.value })} 
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={handleSave}>
          {categoryToEdit ? "Update" : "Add"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
