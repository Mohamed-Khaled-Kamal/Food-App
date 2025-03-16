

import React, { useEffect, useState } from 'react';
import Header from '../../Shared/Header/Header';
import headimg from '../../assets/Imgs/recipes-head.png';
import NoData from '../../assets/Imgs/No-data.png';
import Delete from '../../assets/Imgs/Delete-recipe.png';
import NoImg from '../../assets/Imgs/noImg.png';
import { Badge, Button, Dropdown, Modal, Form } from 'react-bootstrap';
import { axiosInstance, CATEGORIES_URLS, privateAxiosInstance, RECIPES_URLS, TAGS_URLS } from '../../Services/Urls/Urls';
import { toast } from 'react-toastify';
import DeleteConfirmation from '../../Shared/DeleteConfirmation/DeleteConfirmation';
import { Link } from 'react-router-dom';

export default function RecipesList() {
  const [recipesList, setRecipesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 3;
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [name, setName] = useState('')
  const [tagValue, setTagValue] = useState('')
  const [catValue, setCatValue] = useState('')

  

  const GetRecipes = async (pageNumber = 1,name,tag,cat) => {
    try {
      setLoading(true);
      const response = await privateAxiosInstance.get(RECIPES_URLS.RECIPES_LIST, {
        params: {
          pageSize,
          pageNumber,
          name: name,
          tagId: tag,
          categoryId: cat,
          
        },
      });
      setRecipesList(response?.data?.data);
      console.log(response?.data?.data)
      setTotalPages(response?.data?.totalNumberOfPages || 1);
      setCurrentPage(pageNumber);
    } catch (error) {
      console.error("Error fetching recipes:", error);
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
      await privateAxiosInstance.delete(RECIPES_URLS.DELETE_RECIPE(selectedRecipe.id));
      toast.success("Recipe deleted successfully");
      GetRecipes(currentPage);
      setShowModal(false);
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      GetRecipes(page);
    }
  };

  const GetCategories = async () => {
      try {
        setLoading(true);
        let response = await privateAxiosInstance.get(CATEGORIES_URLS.CATEGORIES_LIST,{params:{pageSize:1000,pageNumber:1}});
    
        setCategories(response?.data?.data);
        console.log(response?.data?.data)
        setArryOfPages(Array(response?.data?.totalNumberOfPages).fill().map((_, index) => index + 1));
        setCurrentPage(pageNumber); 
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
  };
  
  const GetTags = async () => {
    try {
      setLoading(true);
      let response = await privateAxiosInstance.get(TAGS_URLS.GET_TAGS,{params:{pageSize:1000,pageNumber:1}});
  
      setTags(response?.data);
      console.log(response?.data)
      setArryOfPages(Array(response?.data?.totalNumberOfPages).fill().map((_, index) => index + 1));
      setCurrentPage(pageNumber); 
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getNameValue = (e) => {
    // console.log(e.target.value)
    setName(e.target.value)
    // GetRecipes(1,e.target.value,tagValue,catValue)
    GetRecipes(1,e.target.value,tagValue,catValue)
}

const getTagValue = (e) => {
  setTagValue(e.target.value)
  GetRecipes(1,name,e.target.value,catValue)
  }
  
 

  const getCatValue = (e) => {
    setCatValue(e.target.value);
    GetRecipes(1, name, tagValue, e.target.value);
  };
  
  
  
  useEffect(() => {
    GetRecipes();
    GetCategories();
    GetTags();
      
  }, []);

  return (
    <>
      <Header 
        title={<>
          Recipes <span style={{color:"#DFE0E0", fontWeight:"100"}}>Items</span>
        </>}
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
              <Link to="/dashbord/recpies/new-recpie" className='btn btn-success'>Add New Recipe</Link>
            </div>
          </div>
        </div>
      </div>

      <div>
       
          <div className="d-flex align-items-center gap-3 p-3 bg-light rounded">
  {/*  Search Bar */}
  <input type="text" className="form-control" placeholder="Search..." onChange={getNameValue} />

  {/* Tag List*/}
  <select className="form-select" onChange={getTagValue}>
    <option value="">Tags</option>
            {tags?.map(({id,name}) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
  </select>

  {/* Categories List */}
  <select className="form-select" onChange={getCatValue}>
    <option value="">Category</option>
    {categories?.map(({id,name}) => (
      <option key={id} value={id}>
      {name}
      </option>
    ))}
  </select>
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
            <table className="table text-center table table-striped table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Image</th>
                  <th>Price</th>
                  <th>Tag</th>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {recipesList.map((recipe, index) => (
                  <tr key={recipe.id}>
                    <th>{(currentPage - 1) * pageSize + index + 1}</th>
                    <td>{recipe.id}</td>
                    <td>{recipe.name}</td>
                    <td className='w-25'>
                      <img 
                        className='w-50' 
                        src={recipe.imagePath ? `https://upskilling-egypt.com:3006/${recipe.imagePath}` : NoImg} 
                        alt="Recipe Image" 
                      />
                    </td>
                    <td>{recipe.price} $</td>
                    <td>{recipe.tag.name}</td>
                    <td>{recipe.category?.[0]?.name || "No Category"}</td>
                    <td>{recipe.description}</td>
                    <td className="position-relative">
                        <i
                          className="fas fa-ellipsis-h cursor-pointer"
                          onClick={() => setDropdownOpen(dropdownOpen === recipe.id ? null : recipe.id)}
                          style={{ fontSize: '1.3rem', cursor: 'pointer' }}
                        ></i>

                        {dropdownOpen === recipe.id && (
                          <div className="dropdown-menu show position-absolute bg-light shadow rounded p-2" style={{ right: 0, top: '1.5rem' }}>
                            <button className="dropdown-item d-flex align-items-center">
                              <i className="far fa-eye me-2"></i> View
                            </button>
                            <Link to={`${recipe.id}`} className="dropdown-item d-flex align-items-center">
                              <i className="fas fa-edit me-2"></i> Edit
                            </Link>
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

<nav aria-label="Page navigation">
  <ul className="pagination justify-content-center">
    
    <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
      <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
    </li>

    
    {totalPages > 1 && (
      <>
        <li className={`page-item ${currentPage === 1 ? "active" : ""}`}>
          <button className="page-link" onClick={() => handlePageChange(1)}>1</button>
        </li>
        {totalPages > 1 && (
          <li className={`page-item ${currentPage === 2 ? "active" : ""}`}>
            <button className="page-link" onClick={() => handlePageChange(2)}>2</button>
          </li>
        )}
      </>
    )}

    
    {currentPage > 5 && <li className="page-item disabled"><span className="page-link">...</span></li>}

    
    {Array.from({ length: totalPages }, (_, i) => i + 1)
      .slice(Math.max(2, currentPage - 2), Math.min(totalPages - 2, currentPage + 1))
      .map(page => (
        <li className={`page-item ${page === currentPage ? "active" : ""}`} key={page}>
          <button className="page-link" onClick={() => handlePageChange(page)}>{page}</button>
        </li>
      ))}

    
    {currentPage < totalPages - 4 && <li className="page-item disabled"><span className="page-link">...</span></li>}

   
    {totalPages > 2 && (
      <>
        <li className={`page-item ${currentPage === totalPages - 1 ? "active" : ""}`}>
          <button className="page-link" onClick={() => handlePageChange(totalPages - 1)}>{totalPages - 1}</button>
        </li>
        <li className={`page-item ${currentPage === totalPages ? "active" : ""}`}>
          <button className="page-link" onClick={() => handlePageChange(totalPages)}>{totalPages}</button>
        </li>
      </>
    )}

    
    <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
      <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>Next</button>
    </li>
  </ul>
</nav>


      <DeleteConfirmation show={showModal} handleClose={() => setShowModal(false)} handleDeleteConfirm={confirmDeleteRecipe} img={Delete} btnName='Delete this Item' />
    </>
  );
}
