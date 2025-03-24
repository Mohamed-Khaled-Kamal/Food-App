

import React, { useEffect, useState } from 'react';
import Header from '../../Shared/Header/Header';
import headimg from '../../assets/Imgs/recipes-head.png';
// import NoData from '../../assets/Imgs/No-data.png';
import Delete from '../../assets/Imgs/Delete-recipe.png';
import NoImg from '../../assets/Imgs/noImg.png';
import { Badge, Button, Dropdown, Modal, Form } from 'react-bootstrap';
import { axiosInstance, CATEGORIES_URLS, FAVS_URLS, ImgUrl, privateAxiosInstance, RECIPES_URLS, TAGS_URLS } from '../../Services/Urls/Urls';
import { toast } from 'react-toastify';
import DeleteConfirmation from '../../Shared/DeleteConfirmation/DeleteConfirmation';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import NoData from '../../Shared/NoData/NoData';
import Preloader from '../../Shared/Preloader/Preloader';

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
  const [userGroup, setUserGroup] = useState(null);
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
    setName(e.target.value)
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
  
  const addToFavourite = async (id) => {
    try {
      
      let response = await privateAxiosInstance.post(FAVS_URLS.CREATE_FAVS,{'recipeId':id});
  
      
      console.log(response)
      toast.success("Added to Favourite");
    } catch (error) {
      console.log(error);
      toast.error("Failed to add to favourite");
    } 
  }
  
  
  useEffect(() => {
    GetRecipes();
    GetCategories();
    GetTags();
    const token = localStorage.getItem("Token");
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          setUserGroup(decodedToken?.userGroup); 
          console.log(`System Group :${decodedToken?.userGroup}`)
        } catch (error) {
          console.error("Invalid token", error);
        }
      }
      
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

          <div className="row align-items-center">
  
  <div className="col-12 col-md-6 text-md-start text-center my-auto">
    <h2>Recipes Table Details</h2>
    <p>You can check all details</p>
  </div>

  
  {userGroup !== "SystemUser" && (
    <div className="col-12 col-md-6 text-md-end text-center mt-3 mt-md-0">
      <Link to="/dashbord/recpies/new-recpie" className="btn btn-success">
        Add New Recipe
      </Link>
    </div>
  )}
</div>

        </div>
      </div>

      <div>
       
          <div className="row d-flex align-items-center  p-3 bg-light rounded">
          {/*  Search Bar */}
          <div className="col-md-4 my-2">
  <input type="text" className="form-control" placeholder="Search..." onChange={getNameValue} />
          </div>

          {/* Tag List*/}
          <div className="col-md-4 my-2">
  <select className="form-select" onChange={getTagValue}>
    <option value="">Tags</option>
            {tags?.map(({id,name}) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
  </select>
          </div>

          {/* Categories List */}
          <div className="col-md-4 my-2">
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

</div>

      <div className="table-content px-3">
        <div className="container-fluid d-none d-md-block">
          {loading ? (
          <Preloader/>
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
                        src={recipe.imagePath ? `${ImgUrl}${recipe.imagePath}` : NoImg} 
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
    <button className="dropdown-item d-flex align-items-center" onClick={() => { setSelectedRecipe(recipe); handleShow(); }}>
      <i className="far fa-eye me-2"></i> View
    </button>

    {userGroup !== "SystemUser" ? (
      <>
        <Link to={`${recipe.id}`} className="dropdown-item d-flex align-items-center">
          <i className="fas fa-edit me-2"></i> Edit
        </Link>
        <button
          className="dropdown-item d-flex align-items-center"
          onClick={() => handleDeleteClick(recipe)}
        >
          <i className="fas fa-trash-alt me-2"></i> Delete
        </button>
      </>
    ) : (
        <button
        className="dropdown-item d-flex align-items-center"
        onClick={()=> addToFavourite(recipe.id)}
        >
        <i className="far fa-heart me-2"></i> Favorites
      </button>
    )}
  </div>
)}

                      </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
                <NoData/>
          )}
        </div>
        
        <div className="d-md-none">
                {recipesList.length > 0 ? (
                  <div className="row">
                    {recipesList.map((recipe) => (
                      <div key={recipe.id} className="col-12 mb-3">
                        <div className="card">
                          <img className="card-img-top" src={recipe.imagePath ? `${ImgUrl}${recipe.imagePath}` : NoImg} alt="Recipe" />
                          <div className="card-body">
                            <h5 className="card-title">{recipe.name}</h5>
                            <p className="card-text">{recipe.description}</p>
                            <p className="card-text"><strong>Price:</strong> {recipe.price} $</p>
                            <p className="card-text"><strong>Tag:</strong> {recipe.tag.name}</p>
                            <p className="card-text"><strong>Category:</strong> {recipe.category?.[0]?.name || "No Category"}</p>
                          </div>
                          <div className="d-flex justify-content-between mt-3 p-2">
                
                {/* <button className="btn btn-outline-success" onClick={() =>  setSelectedRecipe(recipe) }>
                  <i className="far fa-eye me-1"></i> View
                </button> */}
                            <button className="btn btn-outline-success" onClick={() => { setSelectedRecipe(recipe); handleShow(); }}>
                              <i className="far fa-eye me-1"></i> View
                            </button>


                {userGroup !== "SystemUser" ? (
                  <>
                    
                    <Link to={`${recipe.id}`} className="btn btn-outline-success">
                      <i className="fas fa-edit me-1"></i> Edit
                    </Link>

                    
                    <button className="btn btn-outline-success" onClick={() => handleDeleteClick(recipe)}>
                      <i className="fas fa-trash-alt me-1"></i> Delete
                    </button>
                  </>
                ) : (
                 
                  <button className="btn btn-outline-success" onClick={() => addToFavourite(recipe.id)}>
                    <i className="far fa-heart me-1"></i> Favorites
                  </button>
                )}
              </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <NoData/>
                )}
              </div>
      </div>

      {/* Modal View */}

      <Modal show={show} onHide={handleClose} animation={true} className='mt-3'>
      <Modal.Header closeButton className='px-4'>
        <Modal.Title>Recipe details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container d-flex flex-column">
          <div className="recipe-image d-flex justify-content-center position-relative">
            <img style={{ maxWidth: 250, height: 250, objectFit: 'cover' }} loading='lazy' className='img-fluid w-100 rounded-4 my-3' src={selectedRecipe?.imagePath ? `${ImgUrl}/${selectedRecipe?.imagePath}` : `${NoImg}`} alt="Recipe Image" />
          </div>
          <div>
            <h3 className='mb-2 text-capitalize text-center p-3 border-bottom '>
              {selectedRecipe?.name}
            </h3>
            <div className='text d-flex justify-content-between'>
              <p><span className='fw-bold'>Description: </span> {selectedRecipe?.description}</p>
            </div>
            <div >
              <p><span className='fw-bold'>Tag: </span> {selectedRecipe?.tag?.name}</p>
              <p className=''><span className='fw-bold'>Category: </span>{selectedRecipe?.category?.[0].name}</p>
              </div>
              <div className='text-center'>
              <p className='badge bg-success fs-3'> Price: {selectedRecipe?.price} $</p>
            </div>
          </div>

        </div>
      </Modal.Body>
      {userGroup === 'SuperAdmin' ?  <>
      
      </> :  <Modal.Footer>
        <Button disabled={loading} variant="outline-dark" onClick={() => { addToFav(selectedRecipe?.id); }}>
          {loading ? <i className='fas fa-spin fa-spinner'></i> : 'Add To Favorites'}
        </Button>
      </Modal.Footer>}
    </Modal>

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
