import React, { useEffect, useState } from 'react'
import Header from '../../Shared/Header/Header'
import headimg from '../../assets/Imgs/recipes-head.png'
import axios from 'axios'
import NoData from '../../assets/Imgs/No-data.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap';
import Delete from '../../assets/Imgs/delete.png'
import { axiosInstance, CATEGORIES_URLS } from '../../Services/Urls/Urls'

export default function CategoriesList() {

  const [categoriesList, setCategoriesList] = useState([])
  const [loading, setLoading] = useState(true) 
  const [showModal, setShowModal] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [newCategory, setNewCategory] = useState({ name: '' })

  const GetAllCategories = async () => { 
    try {
      setLoading(true)
      let response = await axiosInstance.get(CATEGORIES_URLS.CATEGORIES_LIST)
      setCategoriesList(response?.data?.data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => { 
    GetAllCategories()
  },[])

  const handleDeleteClick = (category) => {
    setSelectedCategory(category)
    setShowModal(true)
  }


  const handleDeleteConfirm = async () => {
    try {
        await axiosInstance.delete(CATEGORIES_URLS.DELETE_CATEGORY(selectedCategory.id), {
            headers: { Authorization: localStorage.getItem("Token") }
        });
        setShowModal(false);
        setCategoriesList(categoriesList.filter(cat => cat.id !== selectedCategory.id));
    } catch (error) {
        console.error("Failed to delete category:", error);
    }
};


  const handleAddCategory = async () => {
    try {
      const response = await axiosInstance.post(CATEGORIES_URLS.ADD_CATEGORY, newCategory, {
        headers: { Authorization: localStorage.getItem("Token") }
      })
      setCategoriesList([...categoriesList, response.data])
      setShowAddModal(false)
      setNewCategory({ name: '' })
    } catch (error) {
      console.error("Failed to add category:", error)
    }
  }

  return (
    <>
      <Header 
        title={"Categories Items"}
        desc={"You can now add your items that any user can order it from the Application and you can edit"}
        img={<img src={headimg} alt="head-img" />}
      />

      <div className='add-categ px-3'>
        <div className='container-fluid'>
          <div className="d-flex justify-content-between align-items-center">
            <div className="detail my-auto">
              <h2>Categories Table Details</h2>
              <p>You can check all details</p>
            </div>

            <div className="add-btn">
              <button className='btn btn-success' onClick={() => setShowAddModal(true)}>
                Add New Category
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="categ-table">
        <div className="table-head px-3">
          <div className="container-fluid">
            <div className='TC d-flex justify-content-between rounded-4 p-4'>
              <div>
                <h4>Name</h4>
              </div>
              <div>
                <h4>Actions</h4>
              </div>
            </div>
          </div>
        </div>

        <div className="table-content px-3">
          <div className="container-fluid">
            {loading ? (
              <div className="d-flex justify-content-center align-items-center" style={{ height: '70vh' }}>
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : categoriesList.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Create Date</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categoriesList.map((category, index) => (
                    <tr key={category.id}>
                      <th scope="row">{index + 1}</th>
                      <td>{category.id}</td>
                      <td>{category.name}</td>
                      <td>{category.creationDate}</td>
                      <td>
                        <i 
                          className="fas fa-trash-alt text-danger mx-2" 
                          onClick={() => handleDeleteClick(category)} 
                          style={{ cursor: 'pointer' }}
                        ></i>
                        <i className="fas fa-edit text-warning mx-2"></i>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="d-flex justify-content-center align-items-center" style={{ height: '70vh' }}>
                <img src={NoData} alt="No Data" />
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal
  show={showModal}
  onHide={() => setShowModal(false)}
  centered
>

        <div className="d-flex justify-content-end p-2">
    
      <i onClick={() => setShowModal(false)} style={{cursor:"pointer"}} class="far fa-times-circle text-danger fs-3 text "></i>
    
  </div>
        <Modal.Body>
    <div className="d-flex justify-content-center align-items-center">
      <img src={Delete} alt="delete category" />
    </div>
  </Modal.Body>
  <Modal.Footer>
          <button type="button" class="btn btn-outline-danger" onClick={handleDeleteConfirm}>
            Delete
          </button>
  </Modal.Footer>
</Modal>


      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
        {/* <div className="d-flex justify-content-end p-2">
    
      <i onClick={() => setShowModal(false)} style={{cursor:"pointer"}} class="far fa-times-circle text-danger fs-3 text "></i>
    
  </div> */}
        <Modal.Header closeButton>
          <Modal.Title>Add New Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Category Name</Form.Label>
              <Form.Control type="text" value={newCategory.name} onChange={(e) => setNewCategory({ name: e.target.value })} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleAddCategory}>Add</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
