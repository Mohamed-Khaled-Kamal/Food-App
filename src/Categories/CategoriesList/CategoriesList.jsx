// import React, { useEffect, useState } from 'react';
// import Header from '../../Shared/Header/Header';
// import headimg from '../../assets/Imgs/recipes-head.png';
// import axios from 'axios';
// import NoData from '../../assets/Imgs/No-data.png';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Modal, Button, Form } from 'react-bootstrap';
// import Delete from '../../assets/Imgs/delete.png';
// import { axiosInstance, CATEGORIES_URLS } from '../../Services/Urls/Urls';
// import { toast } from 'react-toastify';

// export default function CategoriesList() {
//   const [categoriesList, setCategoriesList] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [newCategory, setNewCategory] = useState({ name: '' });
//   const [dropdownOpen, setDropdownOpen] = useState(null);

//   const GetAllCategories = async () => {
//     try {
//       setLoading(true);
//       let response = await axiosInstance.get(CATEGORIES_URLS.CATEGORIES_LIST);
//       setCategoriesList(response?.data?.data);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     GetAllCategories();
//   }, []);

//   const handleDeleteClick = (category) => {
//     setSelectedCategory(category);
//     setShowModal(true);
//   };

//   const handleDeleteConfirm = async () => {
//     try {
//       await axiosInstance.delete(CATEGORIES_URLS.DELETE_CATEGORY(selectedCategory.id), {
//         headers: { Authorization: `Bearer ${localStorage.getItem("Token")}` }
//       });
//       setShowModal(false);
//       setCategoriesList(categoriesList.filter(cat => cat.id !== selectedCategory.id));
//       toast.success("Category deleted successfully");
//     } catch (error) {
//       console.error("Failed to delete category:", error);
//     }
//   };

//   const handleAddCategory = async () => {
//     try {
//       const response = await axiosInstance.post(CATEGORIES_URLS.ADD_CATEGORY, newCategory, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("Token")}` }
//       });
//       setCategoriesList([...categoriesList, response.data]);
//       setShowAddModal(false);
//       setNewCategory({ name: '' });
//       toast.success("Category created successfully");
//     } catch (error) {
//       console.error("Failed to add category:", error);
//     }
//   };

//   return (
//     <>
//       <Header
//         title={
//           <>
//             Categories <span style={{color:"#DFE0E0", fontWeight:"100"}}>Items</span>
//             </>
//         }
//         desc={"You can now add your items that any user can order it from the application and you can edit."}
//         img={<img src={headimg} alt="head-img" />}
//       />

//       <div className='add-categ px-3'>
//         <div className='container-fluid'>
//           <div className="d-flex justify-content-between align-items-center">
//             <div className="detail my-auto">
//               <h2>Categories Table Details</h2>
//               <p>You can check all details</p>
//             </div>
//             <div className="add-btn">
//               <button className='btn btn-success' onClick={() => setShowAddModal(true)}>
//                 Add New Category
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="categ-table">
//         <div className="table-head px-3">
//           <div className="container-fluid">
//             <div className='TC d-flex justify-content-between rounded-4 p-4'>
//               <div>
//                 <h4>Name</h4>
//               </div>
//               <div>
//                 <h4>Actions</h4>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="table-content px-3">
//           <div className="container-fluid">
//             {loading ? (
//               <div className="d-flex justify-content-center align-items-center" style={{ height: '70vh' }}>
//                 <div className="spinner-border text-primary" role="status">
//                   <span className="visually-hidden">Loading...</span>
//                 </div>
//               </div>
//             ) : categoriesList.length > 0 ? (
//               <table className="table text-center">
//                 <thead>
//                   <tr>
//                     <th>#</th>
//                     <th>ID</th>
//                     <th>Name</th>
//                     <th>Create Date</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {categoriesList.map((category, index) => (
//                     <tr key={category.id}>
//                       <th scope="row">{index + 1}</th>
//                       <td>{category.id}</td>
//                       <td>{category.name}</td>
//                       <td>{category.creationDate}</td>
//                       <td className="position-relative">
//                         <i
//                           className="fas fa-ellipsis-h"
//                           style={{ cursor: 'pointer' }}
//                           onClick={() => setDropdownOpen(dropdownOpen === category.id ? null : category.id)}
//                         ></i>

//                         {dropdownOpen === category.id && (
//                           <div className="dropdown-menu show position-absolute" style={{ right: 0 }}>

//                             <button className="dropdown-item  d-flex align-items-center">
//                             <i class="far fa-eye me-2"></i> View
//                             </button>

//                             <button className="dropdown-item  d-flex align-items-center">
//                               <i className="fas fa-edit me-2"></i> Edit
//                             </button>

//                             <button
//                               className="dropdown-item  d-flex align-items-center"
//                               onClick={() => handleDeleteClick(category)}
//                             >
//                               <i className="fas fa-trash-alt me-2"></i> Delete
//                             </button>
//                           </div>
//                         )}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             ) : (
//               <div className="d-flex justify-content-center align-items-center" style={{ height: '70vh' }}>
//                 <img src={NoData} alt="No Data" />
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       <Modal
//   show={showModal}
//   onHide={() => setShowModal(false)}
//   centered
// >

//         <div className="d-flex justify-content-end p-2">
    
//       <i onClick={() => setShowModal(false)} style={{cursor:"pointer"}} class="far fa-times-circle text-danger fs-3 text "></i>
    
//   </div>
//         <Modal.Body>
//     <div className="d-flex justify-content-center align-items-center">
//       <img src={Delete} alt="delete category" />
//     </div>
//   </Modal.Body>
//   <Modal.Footer>
//           <button class="btn btn-outline-danger" onClick={handleDeleteConfirm}>
//             Delete
//           </button>
//   </Modal.Footer>
// </Modal>

//       <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Add New Category</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group>
//               <Form.Label>Category Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={newCategory.name}
//                 onChange={(e) => setNewCategory({ name: e.target.value })}
//               />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="success" onClick={handleAddCategory}>
//             Save
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// }


/**////////////////////////////////////////////////////////////////////// */

// import React, { useEffect, useState } from "react";
// import Header from "../../Shared/Header/Header";
// import headimg from "../../assets/Imgs/recipes-head.png";
// import axios from "axios";
// import NoData from "../../assets/Imgs/No-data.png";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Modal, Button } from "react-bootstrap";
// import Delete from "../../assets/Imgs/delete.png";
// import { axiosInstance, CATEGORIES_URLS } from "../../Services/Urls/Urls";
// import { toast } from "react-toastify";
// import AddCategoryModal from "../CategoriesData/CategoriesData"; // ✅ استيراد الكومبوننت الجديد

// export default function CategoriesList() {
//   const [categoriesList, setCategoriesList] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(null);

//   const GetAllCategories = async () => {
//     try {
//       setLoading(true);
//       let response = await axiosInstance.get(CATEGORIES_URLS.CATEGORIES_LIST);
//       setCategoriesList(response?.data?.data);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     GetAllCategories();
//   }, []);

//   const handleDeleteClick = (category) => {
//     setSelectedCategory(category);
//     setShowModal(true);
//   };

//   const handleDeleteConfirm = async () => {
//     try {
//       await axiosInstance.delete(CATEGORIES_URLS.DELETE_CATEGORY(selectedCategory.id), {
//         headers: { Authorization: `Bearer ${localStorage.getItem("Token")}` }
//       });
//       setShowModal(false);
//       setCategoriesList(categoriesList.filter((cat) => cat.id !== selectedCategory.id));
//       toast.success("Category deleted successfully");
//     } catch (error) {
//       console.error("Failed to delete category:", error);
//     }
//   };

//   const handleAddCategory = async (newCategory) => {
//     try {
//       const response = await axiosInstance.post(CATEGORIES_URLS.ADD_CATEGORY, newCategory, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("Token")}` }
//       });
//       setCategoriesList([...categoriesList, response.data]);
//       setShowAddModal(false);
//       toast.success("Category created successfully");
//     } catch (error) {
//       console.error("Failed to add category:", error);
//     }
//   };

//   return (
//     <>
//       <Header
//         title={
//           <>
//             Categories <span style={{ color: "#DFE0E0", fontWeight: "100" }}>Items</span>
//           </>
//         }
//         desc={"You can now add your items that any user can order it from the application and you can edit."}
//         img={<img src={headimg} alt="head-img" />}
//       />

//       <div className="add-categ px-3">
//         <div className="container-fluid">
//           <div className="d-flex justify-content-between align-items-center">
//             <div className="detail my-auto">
//               <h2>Categories Table Details</h2>
//               <p>You can check all details</p>
//             </div>
//             <div className="add-btn">
//               <button className="btn btn-success" onClick={() => setShowAddModal(true)}>
//                 Add New Category
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ✅ استدعاء الكومبوننت الجديد */}
//       <AddCategoryModal show={showAddModal} handleClose={() => setShowAddModal(false)} handleAddCategory={handleAddCategory} />

//       <div className="categ-table">
//         <div className="table-head px-3">
//           <div className="container-fluid">
//             <div className="TC d-flex justify-content-between rounded-4 p-4">
//               <div>
//                 <h4>Name</h4>
//               </div>
//               <div>
//                 <h4>Actions</h4>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="table-content px-3">
//           <div className="container-fluid">
//             {loading ? (
//               <div className="d-flex justify-content-center align-items-center" style={{ height: "70vh" }}>
//                 <div className="spinner-border text-primary" role="status">
//                   <span className="visually-hidden">Loading...</span>
//                 </div>
//               </div>
//             ) : categoriesList.length > 0 ? (
//               <table className="table text-center">
//                 <thead>
//                   <tr>
//                     <th>#</th>
//                     <th>ID</th>
//                     <th>Name</th>
//                     <th>Create Date</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {categoriesList.map((category, index) => (
//                     <tr key={category.id}>
//                       <th scope="row">{index + 1}</th>
//                       <td>{category.id}</td>
//                       <td>{category.name}</td>
//                       <td>{category.creationDate}</td>
//                       <td className="position-relative">
//                         <i
//                           className="fas fa-ellipsis-h"
//                           style={{ cursor: "pointer" }}
//                           onClick={() => setDropdownOpen(dropdownOpen === category.id ? null : category.id)}
//                         ></i>

//                         {dropdownOpen === category.id && (
//                           <div className="dropdown-menu show position-absolute" style={{ right: 0 }}>
//                             <button className="dropdown-item d-flex align-items-center">
//                               <i className="far fa-eye me-2"></i> View
//                             </button>
//                             <button className="dropdown-item d-flex align-items-center">
//                               <i className="fas fa-edit me-2"></i> Edit
//                             </button>
//                             <button className="dropdown-item d-flex align-items-center" onClick={() => handleDeleteClick(category)}>
//                               <i className="fas fa-trash-alt me-2"></i> Delete
//                             </button>
//                           </div>
//                         )}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             ) : (
//               <div className="d-flex justify-content-center align-items-center" style={{ height: "70vh" }}>
//                 <img src={NoData} alt="No Data" />
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }


/**////////////////////////////////////////////////////// */
// import React, { useEffect, useState } from "react";
// import Header from "../../Shared/Header/Header";
// import headimg from "../../assets/Imgs/recipes-head.png";
// import axios from "axios";
// import NoData from "../../assets/Imgs/No-data.png";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { toast } from "react-toastify";
// import { axiosInstance, CATEGORIES_URLS } from "../../Services/Urls/Urls";
// import AddCategoryModal from "../CategoriesData/CategoriesData";
// import DeleteConfirmation from "../../Shared/DeleteConfirmation/DeleteConfirmation"; // ✅ استيراد الكومبوننت العام
// import CategoriesData from "../CategoriesData/CategoriesData";

// export default function CategoriesList() {
//   const [categoriesList, setCategoriesList] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [dropdownOpen, setDropdownOpen] = useState(null);
//   const [showAddModal, setShowAddModal] = useState(false);
// const [categoryToEdit, setCategoryToEdit] = useState(null);



//   const GetAllCategories = async () => {
//     try {
//       setLoading(true);
//       let response = await axiosInstance.get(CATEGORIES_URLS.CATEGORIES_LIST);
//       setCategoriesList(response?.data?.data);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     GetAllCategories();
//   }, []);

//   const handleDeleteClick = (category) => {
//     setSelectedCategory(category);
//     setShowDeleteModal(true);
//   };

//   const handleDeleteConfirm = async () => {
//     try {
//       await axiosInstance.delete(CATEGORIES_URLS.DELETE_CATEGORY(selectedCategory.id), {
//         headers: { Authorization: `Bearer ${localStorage.getItem("Token")}` }
//       });
//       setShowDeleteModal(false);
//       setCategoriesList(categoriesList.filter((cat) => cat.id !== selectedCategory.id));
//       toast.success("Category deleted successfully");
//     } catch (error) {
//       console.error("Failed to delete category:", error);
//     }
//   };

//   const handleAddCategory = async (newCategory) => {
//     try {
//       const response = await axiosInstance.post(CATEGORIES_URLS.ADD_CATEGORY, newCategory, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("Token")}` }
//       });
//       setCategoriesList([...categoriesList, response.data]);
//       setShowAddModal(false);
//       toast.success("Category created successfully");
//     } catch (error) {
//       console.error("Failed to add category:", error);
//     }
//   };

//   const handleEditClick = (category) => {
//     setCategoryToEdit(category);
//     setShowAddModal(true);
//   };

//   const handleEditCategory = async (updatedCategory) => {
//     try {
//       await axiosInstance.put(CATEGORIES_URLS.EDIT_CATEGORY(selectedCategory.id), updatedCategory, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("Token")}` }
//       });
//       setCategoriesList(categoriesList.map(cat => (cat.id === id ? { ...cat, ...updatedCategory } : cat)));
//       toast.success("Category updated successfully");
//     } catch (error) {
//       console.error("Failed to update category:", error);
//     }
//   };

//   return (
//     <>
//       <Header
//         title={
//           <>
//             Categories <span style={{ color: "#DFE0E0", fontWeight: "100" }}>Items</span>
//           </>
//         }
//         desc={"You can now add your items that any user can order it from the application and you can edit."}
//         img={<img src={headimg} alt="head-img" />}
//       />

//       <div className="add-categ px-3">
//         <div className="container-fluid">
//           <div className="d-flex justify-content-between align-items-center">
//             <div className="detail my-auto">
//               <h2>Categories Table Details</h2>
//               <p>You can check all details</p>
//             </div>
//             <div className="add-btn">
//               <button className="btn btn-success" onClick={() => setShowAddModal(true)}>
//                 Add New Category
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ✅ استدعاء كومبوننت الإضافة */}
//       <AddCategoryModal
//         show={showAddModal}
//         handleClose={() => setShowAddModal(false)}
//         handleAddCategory={handleAddCategory}
//       />

//       {/* ✅ استدعاء كومبوننت الحذف العام */}
//       <DeleteConfirmation
//         show={showDeleteModal}
//         handleClose={() => setShowDeleteModal(false)}
//         handleDeleteConfirm={handleDeleteConfirm}
//         title="Delete Category"
//         message={`Are you sure you want to delete the category "${selectedCategory?.name}"?`}
//         img={NoData}
//       />

//       {/* ✅ استدعاء كومبوننت التعديل */}
//       <CategoriesData
//         show={showAddModal}
//         handleClose={() => setShowAddModal(false)}
//         handleAddCategory={handleAddCategory}
//         handleEditCategory={handleEditCategory}
//         categoryToEdit={categoryToEdit}
//       />

//       <div className="categ-table">
//         <div className="table-head px-3">
//           <div className="container-fluid">
//             <div className="TC d-flex justify-content-between rounded-4 p-4">
//               <div>
//                 <h4>Name</h4>
//               </div>
//               <div>
//                 <h4>Actions</h4>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="table-content px-3">
//           <div className="container-fluid">
//             {loading ? (
//               <div className="d-flex justify-content-center align-items-center" style={{ height: "70vh" }}>
//                 <div className="spinner-border text-primary" role="status">
//                   <span className="visually-hidden">Loading...</span>
//                 </div>
//               </div>
//             ) : categoriesList.length > 0 ? (
//               <table className="table text-center">
//                 <thead>
//                   <tr>
//                     <th>#</th>
//                     <th>ID</th>
//                     <th>Name</th>
//                     <th>Create Date</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {categoriesList.map((category, index) => (
//                     <tr key={category.id}>
//                       <th scope="row">{index + 1}</th>
//                       <td>{category.id}</td>
//                       <td>{category.name}</td>
//                       <td>{category.creationDate}</td>
                      
//                       <td className="position-relative">
//   <i
//     className="fas fa-ellipsis-h"
//     style={{ cursor: 'pointer' }}
//     onClick={() => setDropdownOpen(dropdownOpen === category.id ? null : category.id)}
//   ></i>

//   {dropdownOpen === category.id && (
//     <div className="dropdown-menu show position-absolute" style={{ right: 0 }}>
//       <button className="dropdown-item d-flex align-items-center">
//         <i className="far fa-eye me-2"></i> View
//       </button>

//       <button
//         className="dropdown-item d-flex align-items-center"
//         onClick={() => handleEditCategory(category)}
//       >
//         <i className="fas fa-edit me-2"></i> Edit
//       </button>

//       <button
//         className="dropdown-item d-flex align-items-center"
//         onClick={() => handleDeleteClick(category)}
//       >
//         <i className="fas fa-trash-alt me-2"></i> Delete
//       </button>
//     </div>
//   )}
// </td>

                      
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             ) : (
//               <div className="d-flex justify-content-center align-items-center" style={{ height: "70vh" }}>
//                 <img src={NoData} alt="No Data" />
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }


/**///////////////////////////////////////////////// */


import React, { useEffect, useState } from "react";
import Header from "../../Shared/Header/Header";
import headimg from "../../assets/Imgs/recipes-head.png";
import axios from "axios";
import NoData from "../../assets/Imgs/No-data.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import { axiosInstance, CATEGORIES_URLS } from "../../Services/Urls/Urls";
import AddCategoryModal from "../CategoriesData/CategoriesData";
import DeleteConfirmation from "../../Shared/DeleteConfirmation/DeleteConfirmation";
import CategoriesData from "../CategoriesData/CategoriesData";
import Delete from '../../assets/Imgs/Delete.png'

export default function CategoriesList() {
  const [categoriesList, setCategoriesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState(null);

  const GetAllCategories = async () => {
    try {
      setLoading(true);
      let response = await axiosInstance.get(CATEGORIES_URLS.CATEGORIES_LIST);
      setCategoriesList(response?.data?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GetAllCategories();
  }, []);

  const handleDeleteClick = (category) => {
    setSelectedCategory(category);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axiosInstance.delete(CATEGORIES_URLS.DELETE_CATEGORY(selectedCategory.id), {
        headers: { Authorization: `Bearer ${localStorage.getItem("Token")}` }
      });
      
      setShowDeleteModal(false);
      setCategoriesList(categoriesList.filter((cat) => cat.id !== selectedCategory.id));
      toast.success("Category deleted successfully");
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  };

  const handleAddCategory = async (newCategory) => {
    try {
      const response = await axiosInstance.post(CATEGORIES_URLS.ADD_CATEGORY, newCategory, {
        headers: { Authorization: `Bearer ${localStorage.getItem("Token")}` }
      });
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
      await axiosInstance.put(CATEGORIES_URLS.EDIT_CATEGORY(categoryToEdit.id), updatedCategory, {
        headers: { Authorization: `Bearer ${localStorage.getItem("Token")}` }
      });

      setCategoriesList(categoriesList.map(cat => (cat.id === categoryToEdit.id ? { ...cat, ...updatedCategory } : cat)));
      setShowAddModal(false);
      toast.success("Category updated successfully");
    } catch (error) {
      console.error("Failed to update category:", error);
    }
  };


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
          <div className="d-flex justify-content-between align-items-center">
            <div className="detail my-auto">
              <h2>Categories Table Details</h2>
              <p>You can check all details</p>
            </div>
            <div className="add-btn">
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

      <div className="categ-table">
        <div className="table-content px-3">
          <div className="container-fluid">
            {loading ? (
              <div className="d-flex justify-content-center align-items-center" style={{ height: "70vh" }}>
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
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
                      <th scope="row">{index + 1}</th>
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

      <button
        className="dropdown-item d-flex align-items-center"
        onClick={() => handleEditClick(category)}
      >
        <i className="fas fa-edit me-2"></i> Edit
      </button>

      <button
        className="dropdown-item d-flex align-items-center"
        onClick={() => handleDeleteClick(category)}
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
              <div className="d-flex justify-content-center align-items-center" style={{ height: "70vh" }}>
                <img src={NoData} alt="No Data" />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
