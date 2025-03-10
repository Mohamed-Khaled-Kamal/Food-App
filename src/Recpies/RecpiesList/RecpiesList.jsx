import React, { useEffect, useState } from 'react';
import Header from '../../Shared/Header/Header';
import headimg from '../../assets/Imgs/recipes-head.png';
import axios from 'axios';
import NoData from '../../assets/Imgs/No-data.png';
import { Button, Modal } from 'react-bootstrap';
import Delete from '../../assets/Imgs/Delete-recipe.png';
import { axiosInstance, RECIPES_URLS } from '../../Services/Urls/Urls';
import { toast } from 'react-toastify';
import DeleteConfirmation from '../../Shared/DeleteConfirmation/DeleteConfirmation'

export default function RecipesList() {
  const [recipesList, setRecipesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null); 

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      let response = await axiosInstance.get(RECIPES_URLS.RECIPES_LIST, {
        headers: { Authorization: localStorage.getItem("Token") },
      });
      setRecipesList(response?.data?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (recipe) => {
    setSelectedRecipe(recipe);
    setShowModal(true);
  };

  const confirmDeleteRecipe = async () => {
    try {
      await axiosInstance.delete(RECIPES_URLS.DELETE_RECIPE(selectedRecipe.id), {
        headers: { Authorization: localStorage.getItem("Token") },
      });
      setRecipesList(recipesList.filter((recipe) => recipe.id !== selectedRecipe.id));
      setShowModal(false);
      toast.success("Recipe deleted successfully")
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <>
      <Header 
        title={
          <>
            Recipes <span style={{color:"#DFE0E0",fontWeight:"100"}}>Items</span>
          </>
        }
        desc="You can now add your items that any user can order from the Application, and you can edit."
        img={<img src={headimg} alt="head-img" />}
      />

      <div className='add-categ px-3'>
        <div className='container-fluid'>
          <div className="d-flex justify-content-between align-items-center">
            <div className="detail my-auto">
              <h2>Recipes Table Details</h2>
              <p>You can check all details</p>
            </div>

            <div className="add-btn">
              <button className='btn btn-success'>Add New Recipe</button>
            </div>
          </div>
        </div>
      </div>

      <div className="categ-table">
        <div className="table-head px-3">
          <div className="container-fluid">
            <div className='TC d-flex justify-content-between rounded-4 p-4'>
              <h4>Name</h4>
              <h4>Actions</h4>
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
            ) : recipesList.length > 0 ? (
              <table className="table text-center">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Image</th>
                    <th>Price</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recipesList.map((recipe, index) => (
                    <tr key={recipe.id}>
                      <th>{index + 1}</th>
                      <td>{recipe.id}</td>
                      <td>{recipe.name}</td>
                      <td className='w-25'>
                        <img className='w-50' src={`https://upskilling-egypt.com:3006/${recipe.imagePath}`} alt={recipe.name} />
                      </td>
                      <td>{recipe.price}</td>
                      <td>{recipe.description}</td>
                      <td className="position-relative">
                        <i 
                          className="fas fa-ellipsis-h cursor-pointer"
                          onClick={() => setDropdownOpen(dropdownOpen === recipe.id ? null : recipe.id)}
                          style={{ fontSize: '1.3rem', cursor: 'pointer' }}
                        ></i>

                        {/* Dropdown Menu */}
                        {dropdownOpen === recipe.id && (
                          <div className="dropdown-menu show position-absolute bg-light shadow rounded p-2" style={{ right: 0, top: '1.5rem' }}>
                            
                            <button className="dropdown-item  d-flex align-items-center">
                            <i class="far fa-eye me-2"></i> View
                            </button>

                            <button className="dropdown-item  d-flex align-items-center">
                              <i className="fas fa-edit me-2"></i> Edit
                            </button>

                            <button 
                              className="dropdown-item d-flex align-items-center"
                              onClick={() => handleDeleteClick(recipe)}
                            >
                              <i className="fas fa-trash-alt me-2"></i> Delete
                            </button>
                          </div>
                        )}
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

      
      {/* Modal for Delete Confirmation */}

      <DeleteConfirmation
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleDeleteConfirm={confirmDeleteRecipe}
        img={Delete}
        btnName='Delete this Item'
      />
      
      {/* <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <div className="d-flex justify-content-end p-2">
          <i 
            onClick={() => setShowModal(false)} 
            style={{ cursor: "pointer" }} 
            className="far fa-times-circle text-danger fs-3"
          ></i>
        </div>
        <Modal.Body>
          <div className="d-flex justify-content-center align-items-center">
            <img src={Delete} alt="delete item" />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={confirmDeleteRecipe}>Delete this item</Button>
        </Modal.Footer>
      </Modal> */}
    </>
  );
}
