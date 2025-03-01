import React, { useEffect, useState } from 'react'
import Header from '../../Shared/Header/Header'
import headimg from '../../assets/Imgs/recipes-head.png'
import axios from 'axios'
import NoData from '../../assets/Imgs/No-data.png'
import { Button, Modal } from 'react-bootstrap'
import Delete from '../../assets/Imgs/Delete-recipe.png'
import { axiosInstance, RECIPES_URLS } from '../../Services/Urls/Urls'


export default function RecpiesList() {
  const [recipesList, setRecipesList] = useState([])
  const [loading, setLoading] = useState(true) 
  const [showModal, setShowModal] = useState(false)
  const [selectedRecipe, setSelectedRecipe] = useState(null)
  
  const GetAllRecipes = async () => { 
    try {
      setLoading(true)
      let respone = await axiosInstance.get(RECIPES_URLS.RECIPES_LIST, {
        headers: {
          Authorization: localStorage.getItem("Token")
        }
      })
      setRecipesList(respone?.data?.data)
      console.log(respone?.data?.data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteClick = (recipe) => {
    setSelectedRecipe(recipe)
    setShowModal(true)
  }

  const handleDeleteConfirm = async () => {
    try {
      await axiosInstance.delete(RECIPES_URLS.DELETE_RECIPE(selectedRecipe.id), {
        headers: {
          Authorization: localStorage.getItem("Token")
        }
      })
      setRecipesList(recipesList.filter((recipe) => recipe.id !== selectedRecipe.id))
      setShowModal(false)
    } catch (error) {
      console.error("Error deleting recipe:", error)
    }
  }

  useEffect(() => { 
    GetAllRecipes()
  }, [])

  return (
    <>
      <Header 
        title="Recipes Items"
        desc="You can now add your items that any users can order it form Application and you can edit"
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
              <button className='btn btn-success'>
                Add New Recipe
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
            ) : recipesList.length > 0 ? (
              <table className="table">
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
                      <td>
                        <i 
                          className="fas fa-trash-alt text-danger mx-2" 
                          onClick={() => handleDeleteClick(recipe)} 
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

      {/* Modal for Delete Confirmation */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <div className="d-flex justify-content-end p-2">
        <i onClick={() => setShowModal(false)} style={{cursor:"pointer"}} class="far fa-times-circle text-danger fs-3 text "></i>
        </div>
        <Modal.Body>
          <div className="d-flex justify-content-center align-items-center">
               <img src={Delete} alt="delete item" />
             </div>
        </Modal.Body>
        <Modal.Footer>
        <button type="button" class="btn btn-outline-danger" onClick={handleDeleteConfirm}>
            Delete
          </button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
