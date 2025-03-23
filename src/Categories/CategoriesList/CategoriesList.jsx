import React, { useEffect, useState } from "react";
import Header from "../../Shared/Header/Header";
import headimg from "../../assets/Imgs/recipes-head.png";
import axios from "axios";
import NoData from "../../assets/Imgs/No-data.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import { axiosInstance, CATEGORIES_URLS, privateAxiosInstance } from "../../Services/Urls/Urls";
import AddCategoryModal from "../CategoriesData/CategoriesData";
import DeleteConfirmation from "../../Shared/DeleteConfirmation/DeleteConfirmation";
import CategoriesData from "../CategoriesData/CategoriesData";
import Delete from '../../assets/Imgs/Delete.png'
import Pagination from "../../Shared/Pagination/Pagination";
import Preloader from "../../Shared/Preloader/Preloader";


export default function CategoriesList() {
  const [categoriesList, setCategoriesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState(null);
  const [arryOfPages, setArryOfPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(3); 
  const [name, setName] = useState('')



  
  const GetCategories = async (pageSize, pageNumber,name) => {
    try {
      setLoading(true);
      let response = await privateAxiosInstance.get(CATEGORIES_URLS.CATEGORIES_LIST, {
        params: {
          pageSize: pageSize,
          pageNumber: pageNumber,
          name: name,
        },
      });
  
      setCategoriesList(response?.data?.data);
      setArryOfPages(Array(response?.data?.totalNumberOfPages).fill().map((_, index) => index + 1));
      setCurrentPage(pageNumber); 
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    GetCategories(3,1);
  }, []);

  const handleDeleteClick = (category) => {
    setSelectedCategory(category);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await privateAxiosInstance.delete(CATEGORIES_URLS.DELETE_CATEGORY(selectedCategory.id) );
      
      setShowDeleteModal(false);
      setCategoriesList(categoriesList.filter((cat) => cat.id !== selectedCategory.id));
      toast.success("Category deleted successfully");
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  };

  const handleAddCategory = async (newCategory) => {
    try {
      const response = await privateAxiosInstance.post(CATEGORIES_URLS.ADD_CATEGORY, newCategory,);
      setCategoriesList([...categoriesList, response.data]);
      setShowAddModal(false);
      toast.success("Category created successfully");
    } catch (error) {
      console.error("Failed to add category:", error);
    }
  };

  const handleEditClick = (category) => {
    setCategoryToEdit(category);
    setShowAddModal(true);
    console.log("Editing Category:", category);

  };

  const handleEditCategory = async (updatedCategory) => {
    try {
      await privateAxiosInstance.put(CATEGORIES_URLS.EDIT_CATEGORY(categoryToEdit.id), updatedCategory,);

      setCategoriesList(categoriesList.map(cat => (cat.id === categoryToEdit.id ? { ...cat, ...updatedCategory } : cat)));
      setShowAddModal(false);
      toast.success("Category updated successfully");
    } catch (error) {
      console.error("Failed to update category:", error);
    }
  };

  const getNameValue = (e) => {
    console.log(e.target.value)
    setName(e.target.value)
    // GetRecipes(1,e.target.value,tagValue,catValue)
    GetCategories(3,1,e.target.value)
}


  return (
    <>
      <Header
        title={<>
          Categories <span style={{ color: "#DFE0E0", fontWeight: "100" }}>Items</span>
        </>}
        desc={"You can now add your items that any user can order it from the application and you can edit."}
        img={<img src={headimg} alt="head-img" />}
      />

      <div className="add-categ px-3">
        <div className="container-fluid">
          <div className="row align-items-center">
          <div className="detail col-12 col-md-6 text-md-start text-center my-auto">
              <h2>Categories Table Details</h2>
              <p>You can check all details</p>
            </div>

            <div className="add-btn col-12 col-md-6 text-md-end text-center mt-3 mt-md-0">
            <button className="btn btn-success" onClick={() => {
              setCategoryToEdit(null);
              setShowAddModal(true);
              }}>
  Add New Category
</button>
            </div>

          </div>
        </div>
      </div>

      <AddCategoryModal
        show={showAddModal}
        handleClose={() => setShowAddModal(false)}
        handleAddCategory={handleAddCategory}
        handleEditCategory={handleEditCategory}
        categoryToEdit={categoryToEdit}
      />

      <DeleteConfirmation
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        handleDeleteConfirm={handleDeleteConfirm}
        title="Delete Category"
        message={`Are you sure you want to delete the category "${selectedCategory?.name}"?`}
        btnName="Delete Item"
        img={Delete}
      />

<div className="d-flex align-items-center gap-3 p-3 bg-light rounded">
  {/*  Search Bar */}
  <input type="text" className="form-control" placeholder="Search..." onChange={getNameValue} />

</div>
      
      <div className="categ-table">
  
        <div className="table-content px-3">
    <div className="container-fluid">

      {/* ❌ جدول (يظهر فقط على الشاشات الكبيرة) */}
      <div className="d-none d-md-block">
        {loading ? (
        <Preloader/>
        ) : categoriesList.length > 0 ? (
          <table className="table text-center">
            <thead>
              <tr>
                <th>#</th>
                <th>ID</th>
                <th>Name</th>
                <th>Create Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categoriesList.map((category, index) => (
                <tr key={category.id}>
                  <th scope="row">{(currentPage - 1) * pageSize + index + 1}</th>
                  <td>{category.id}</td>
                  <td>{category.name}</td>
                  <td>{category.creationDate}</td>
                  <td className="position-relative">
                    <i
                      className="fas fa-ellipsis-h"
                      style={{ cursor: "pointer" }}
                      onClick={() => setDropdownOpen(dropdownOpen === category.id ? null : category.id)}
                    ></i>

                    {dropdownOpen === category.id && (
                      <div className="dropdown-menu show position-absolute" style={{ right: 0 }}>
                        <button className="dropdown-item d-flex align-items-center">
                          <i className="far fa-eye me-2"></i> View
                        </button>
                        <button className="dropdown-item d-flex align-items-center" onClick={() => handleEditClick(category)}>
                          <i className="fas fa-edit me-2"></i> Edit
                        </button>
                        <button className="dropdown-item d-flex align-items-center" onClick={() => handleDeleteClick(category)}>
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
          <div className="d-flex justify-content-center align-items-center" style={{ height: "70vh" }}>
            <img src={NoData} alt="No Data" />
          </div>
        )}
      </div>

      {/* ✅ كروت (تظهر فقط على الموبايل) */}
      <div className="d-block d-md-none">
        {loading ? (
        <Preloader/>
        ) : categoriesList.length > 0 ? (
          <div className="row">
            {categoriesList.map((category) => (
              <div className="col-12 mb-3" key={category.id}>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{category.name}</h5>
                    <p className="card-text">
                      <strong>ID:</strong> {category.id} <br />
                      <strong>Created on:</strong> {category.creationDate}
                    </p>
                    <div className="d-flex justify-content-between">
                      <button className="btn btn-outline-success btn-sm">
                        <i className="far fa-eye me-1"></i> View
                      </button>
                      <button className="btn btn-outline-success btn-sm" onClick={() => handleEditClick(category)}>
                        <i className="fas fa-edit me-1"></i> Edit
                      </button>
                      <button className="btn btn-outline-success btn-sm" onClick={() => handleDeleteClick(category)}>
                        <i className="fas fa-trash-alt me-1"></i> Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="d-flex justify-content-center align-items-center" style={{ height: "70vh" }}>
            <img src={NoData} alt="No Data" />
          </div>
        )}
      </div>
      
    </div>
  </div>
       
        
        <nav aria-label="Page navigation example">
  <ul className="pagination justify-content-center">
    
    <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
      <button className="page-link" onClick={() => GetCategories(3, currentPage - 1)}>Previous</button>
    </li>

    
    {arryOfPages.length > 1 && (
      <>
        <li className={`page-item ${currentPage === 1 ? "active" : ""}`}>
          <button className="page-link" onClick={() => GetCategories(3, 1)}>1</button>
        </li>
        {arryOfPages.length > 1 && (
          <li className={`page-item ${currentPage === 2 ? "active" : ""}`}>
            <button className="page-link" onClick={() => GetCategories(3, 2)}>2</button>
          </li>
        )}
      </>
    )}

   
    {currentPage > 5 && <li className="page-item disabled"><span className="page-link">...</span></li>}

   
    {arryOfPages.slice(
      Math.max(2, currentPage - 2), 
      Math.min(arryOfPages.length - 2, currentPage + 1)
    ).map((page) => (
      <li className={`page-item ${page === currentPage ? "active" : ""}`} key={page}>
        <button className="page-link" onClick={() => GetCategories(3, page)}>{page}</button>
      </li>
    ))}

    
    {currentPage < arryOfPages.length - 4 && <li className="page-item disabled"><span className="page-link">...</span></li>}


    {arryOfPages.length > 2 && (
      <>
        <li className={`page-item ${currentPage === arryOfPages.length - 1 ? "active" : ""}`}>
          <button className="page-link" onClick={() => GetCategories(3, arryOfPages.length - 1)}>{arryOfPages.length - 1}</button>
        </li>
        <li className={`page-item ${currentPage === arryOfPages.length ? "active" : ""}`}>
          <button className="page-link" onClick={() => GetCategories(3, arryOfPages.length)}>{arryOfPages.length}</button>
        </li>
      </>
    )}

    
    <li className={`page-item ${currentPage === arryOfPages.length ? "disabled" : ""}`}>
      <button className="page-link" onClick={() => GetCategories(3, currentPage + 1)}>Next</button>
    </li>
  </ul>
        </nav>





      </div>
    </>
  );
}


