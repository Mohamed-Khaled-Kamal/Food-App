// import React, { useEffect, useState } from "react";
// import Header from "../../Shared/Header/Header";
// import headimg from "../../assets/Imgs/recipes-head.png";
// import NoData from "../../assets/Imgs/No-data.png";
// import { axiosInstance, privateAxiosInstance, USER_URLS } from "../../Services/Urls/Urls";
// import DeleteConfirmation from "../../Shared/DeleteConfirmation/DeleteConfirmation";
// import Delete from "../../assets/Imgs/delete user.png";
// import { toast } from "react-toastify";

// export default function UsersList() {
//   const [usersList, setUsersList] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [dropdownOpen, setDropdownOpen] = useState(null);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [selectedUser, setSelectedUser] = useState(null);

//   const GetAllUsers = async () => {
//     try {
//       setLoading(true);
//       let response = await privateAxiosInstance.get(USER_URLS.USERS_LIST);
//       setUsersList(response.data.data);
//       console.log(response.data.data);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     GetAllUsers();
//   }, []);

//   const handleDeleteClick = (user) => {
//     setSelectedUser(user);
//     setShowDeleteModal(true);
//   };



//   const handleDeleteConfirm = async () => {
//     if (!selectedUser) return;
//     console.log("Deleting user:", selectedUser.id);
//     console.log("DELETE URL:", USER_URLS.DELETE_USER(selectedUser.id));
  
//     try {
//       let response = await privateAxiosInstance.delete(USER_URLS.DELETE_USER(selectedUser.id));
      
//       console.log("Response:", response);
//       setUsersList(usersList.filter((user) => user.id !== selectedUser.id));
//       setShowDeleteModal(false);
//       setSelectedUser(null);
//       toast.success(response.data.message)
//     } catch (error) {
//       console.log("Error deleting user:", error.response || error);
//     }
//   };
  

//   return (
//     <>
//       <Header
//         title={
//           <>
//             Users <span style={{ color: "#DFE0E0", fontWeight: "100" }}>List</span>
//           </>
//         }
//         desc="You can now add your items that any user can order from the application and you can edit."
//         img={<img src={headimg} alt="head-img" />}
//       />

//       <div className="Users-title px-3">
//         <div className="container-fluid">
//           <div className="d-flex justify-content-between align-items-center">
//             <div className="detail my-auto">
//               <h2>Users Table Details</h2>
//               <p>You can check all details</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="categ-table">
//         <div className="table-content px-3">
//           <div className="container-fluid">
//             {loading ? (
//               <div className="d-flex justify-content-center align-items-center" style={{ height: "70vh" }}>
//                 <div className="spinner-border text-primary" role="status">
//                   <span className="visually-hidden">Loading...</span>
//                 </div>
//               </div>
//             ) : usersList.length > 0 ? (
//               <table className="table text-center table table-striped table-hover">
//                 <thead className="py-3">
//                   <tr className="">
//                     <th className="p-3">#</th>
//                     <th>ID</th>
//                     <th>Name</th>
//                     <th>Email</th>
//                     <th>Country</th>
//                     <th>Phone Number</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {usersList.map((user, index) => (
//                     <tr key={user.id}>
//                       <th scope="row">{index + 1}</th>
//                       <td>{user.id}</td>
//                       <td>{user.userName}</td>
//                       <td>{user.email}</td>
//                       <td>{user.country}</td>
//                       <td>{user.phoneNumber}</td>

//                       {/* Actions Dropdown */}
//                       <td className="position-relative">
//                         <i
//                           className="fas fa-ellipsis-h"
//                           style={{ cursor: "pointer", fontSize: "1.3rem" }}
//                           onClick={() => setDropdownOpen(dropdownOpen === user.id ? null : user.id)}
//                         ></i>

//                         {dropdownOpen === user.id && (
//                           <div className="dropdown-menu show position-absolute bg-light shadow rounded p-2" style={{ right: 0, top: "1.5rem" }}>
//                             <button className="dropdown-item d-flex align-items-center">
//                               <i className="far fa-eye me-2"></i> View
//                             </button>

//                             <button className="dropdown-item d-flex align-items-center" onClick={() => handleDeleteClick(user)}>
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

//       {/* Delete Confirmation Modal */}
//       <DeleteConfirmation
//         show={showDeleteModal}
//         handleClose={() => setShowDeleteModal(false)}
//         handleDeleteConfirm={handleDeleteConfirm}
//         btnName="Delete User"
//         img={Delete}
//       />
//     </>
//   );
// }


/**/////////////////////////// */

// import React, { useEffect, useState } from "react";
// import Header from "../../Shared/Header/Header";
// import headimg from "../../assets/Imgs/recipes-head.png";
// import NoData from "../../assets/Imgs/No-data.png";
// import DeleteConfirmation from "../../Shared/DeleteConfirmation/DeleteConfirmation";
// import Delete from "../../assets/Imgs/delete user.png";
// import { privateAxiosInstance, USER_URLS } from "../../Services/Urls/Urls";
// import { toast } from "react-toastify";

// export default function UsersList() {
//   const [usersList, setUsersList] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [dropdownOpen, setDropdownOpen] = useState(null);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const pageSize = 10;

//   const GetAllUsers = async (pageNumber = 1) => {
//     try {
//       setLoading(true);
//       const response = await privateAxiosInstance.get(USER_URLS.USERS_LIST, {
//         params: { pageSize, pageNumber },
//       });
//       setUsersList(response?.data?.data || []);
//       setTotalPages(response?.data?.totalNumberOfPages || 1);
//       setCurrentPage(pageNumber);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     GetAllUsers();
//   }, []);

//   const handlePageChange = (page) => {
//     if (page >= 1 && page <= totalPages) {
//       GetAllUsers(page);
//     }
//   };

//   return (
//     <>
//       <Header title={<span>Users List</span>} img={<img src={headimg} alt="head-img" />} />
//       <div className="table-content px-3">
//         {loading ? (
//           <div className="d-flex justify-content-center align-items-center" style={{ height: "70vh" }}>
//             <div className="spinner-border text-primary" role="status">
//               <span className="visually-hidden">Loading...</span>
//             </div>
//           </div>
//         ) : usersList.length > 0 ? (
//           <table className="table text-center table-striped table-hover">
//             <thead>
//               <tr>
//                 <th>#</th>
//                 <th>ID</th>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Country</th>
//                 <th>Phone Number</th>
//               </tr>
//             </thead>
//             <tbody>
//               {usersList.map((user, index) => (
//                 <tr key={user.id}>
//                   <th>{(currentPage - 1) * pageSize + index + 1}</th>
//                   <td>{user.id}</td>
//                   <td>{user.userName}</td>
//                   <td>{user.email}</td>
//                   <td>{user.country}</td>
//                   <td>{user.phoneNumber}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         ) : (
//           <div className="d-flex justify-content-center align-items-center" style={{ height: "70vh" }}>
//             <img src={NoData} alt="No Data" />
//           </div>
//         )}
//       </div>

//       <nav aria-label="Page navigation">
//         <ul className="pagination justify-content-center">
//   {/* زر الصفحة السابقة */}
//   <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
//     <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
//   </li>

//   {/* أول صفحة دائمًا */}
//   {currentPage > 3 && (
//     <>
//       <li className="page-item">
//         <button className="page-link" onClick={() => handlePageChange(1)}>1</button>
//       </li>
//       <li className="page-item disabled"><span className="page-link">...</span></li>
//     </>
//   )}

//   {/* عرض الصفحات القريبة فقط */}
//   {Array.from({ length: totalPages }, (_, index) => index + 1)
//     .filter(page => page === 1 || page === totalPages || (page >= currentPage - 2 && page <= currentPage + 2))
//     .map(page => (
//       <li key={page} className={`page-item ${currentPage === page ? "active" : ""}`}>
//         <button className="page-link" onClick={() => handlePageChange(page)}>{page}</button>
//       </li>
//     ))}

//   {/* آخر صفحة دائمًا */}
//   {currentPage < totalPages - 2 && (
//     <>
//       <li className="page-item disabled"><span className="page-link">...</span></li>
//       <li className="page-item">
//         <button className="page-link" onClick={() => handlePageChange(totalPages)}>{totalPages}</button>
//       </li>
//     </>
//   )}

//   {/* زر الصفحة التالية */}
//   <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
//     <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>Next</button>
//   </li>
// </ul>

//       </nav>
//     </>
//   );
// }

/**/////////////////////////////////////// */

import React, { useEffect, useState } from "react";
import Header from "../../Shared/Header/Header";
import headimg from "../../assets/Imgs/recipes-head.png";
import NoData from "../../assets/Imgs/No-data.png";
import { axiosInstance, privateAxiosInstance, USER_URLS } from "../../Services/Urls/Urls";
import DeleteConfirmation from "../../Shared/DeleteConfirmation/DeleteConfirmation";
import Delete from "../../assets/Imgs/delete user.png";
import { toast } from "react-toastify";

export default function UsersList() {
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 5;

  const GetAllUsers = async (page) => {
    try {
      setLoading(true);
      let response = await privateAxiosInstance.get(USER_URLS.USERS_LIST, {
        params: { pageSize, pageNumber: page }
      });
      console.log(response.data.data)
      setUsersList(response.data.data);
      setTotalPages(response.data.totalNumberOfPages);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GetAllUsers(currentPage);
  }, [currentPage]);

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedUser) return;
    try {
      let response = await privateAxiosInstance.delete(USER_URLS.DELETE_USER(selectedUser.id));
      setUsersList(usersList.filter((user) => user.id !== selectedUser.id));
      setShowDeleteModal(false);
      setSelectedUser(null);
      toast.success(response.data.message);
    } catch (error) {
      console.log("Error deleting user:", error.response || error);
    }
  };

  return (
    <>
      <Header
        title={<>
          Users <span style={{ color: "#DFE0E0", fontWeight: "100" }}>List</span>
        </>}
        desc="You can now add your items that any user can order from the application and you can edit."
        img={<img src={headimg} alt="head-img" />}
      />

      <div className="Users-title px-3">
        <div className="container-fluid">
          <div className="d-flex justify-content-between align-items-center">
            <div className="detail my-auto">
              <h2>Users Table Details</h2>
              <p>You can check all details</p>
            </div>
          </div>
        </div>
      </div>

      <div className="categ-table">
        <div className="table-content px-3">
          <div className="container-fluid">
            {loading ? (
              <div className="d-flex justify-content-center align-items-center" style={{ height: "70vh" }}>
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : usersList.length > 0 ? (
              <>
                <table className="table text-center table table-striped table-hover">
                  <thead className="py-3">
                    <tr className="">
                      <th className="p-3">#</th>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Country</th>
                      <th>Phone Number</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usersList.map((user, index) => (
                      <tr key={user.id}>
                        <th scope="row">{(currentPage - 1) * pageSize + index + 1}</th>
                        <td>{user.id}</td>
                        <td>{user.userName}</td>
                        <td>{user.email}</td>
                        <td>{user.country}</td>
                        <td>{user.phoneNumber}</td>
                        <td className="position-relative">
                          <i
                            className="fas fa-ellipsis-h"
                            style={{ cursor: "pointer", fontSize: "1.3rem" }}
                            onClick={() => setDropdownOpen(dropdownOpen === user.id ? null : user.id)}
                          ></i>
                          {dropdownOpen === user.id && (
                            <div className="dropdown-menu show position-absolute bg-light shadow rounded p-2" style={{ right: 0, top: "1.5rem" }}>
                              <button className="dropdown-item d-flex align-items-center">
                                <i className="far fa-eye me-2"></i> View
                              </button>
                              <button className="dropdown-item d-flex align-items-center" onClick={() => handleDeleteClick(user)}>
                                <i className="fas fa-trash-alt me-2"></i> Delete
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* <nav aria-label="Page navigation">
                  <ul className="pagination justify-content-center">
                    <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                      <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
                    </li>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).slice(Math.max(0, currentPage - 3), currentPage + 2).map(page => (
                      <li className={`page-item ${page === currentPage ? "active" : ""}`} key={page}>
                        <button className="page-link" onClick={() => setCurrentPage(page)}>{page}</button>
                      </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                      <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
                    </li>
                  </ul>
                </nav> */}
                  <nav aria-label="Page navigation">
  <ul className="pagination justify-content-center">
    {/* زر السابق */}
    <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
      <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
    </li>

    {/* أول صفحتين */}
    {totalPages > 1 && (
      <>
        <li className={`page-item ${currentPage === 1 ? "active" : ""}`}>
          <button className="page-link" onClick={() => setCurrentPage(1)}>1</button>
        </li>
        {totalPages > 1 && (
          <li className={`page-item ${currentPage === 2 ? "active" : ""}`}>
            <button className="page-link" onClick={() => setCurrentPage(2)}>2</button>
          </li>
        )}
      </>
    )}

    {/* إظهار "..." إذا كان هناك فجوة بين أول الصفحات والصفحات الوسطى */}
    {currentPage > 5 && <li className="page-item disabled"><span className="page-link">...</span></li>}

    {/* الصفحات القريبة من الصفحة الحالية */}
    {Array.from({ length: totalPages }, (_, i) => i + 1)
      .slice(Math.max(2, currentPage - 2), Math.min(totalPages - 2, currentPage + 1))
      .map(page => (
        <li className={`page-item ${page === currentPage ? "active" : ""}`} key={page}>
          <button className="page-link" onClick={() => setCurrentPage(page)}>{page}</button>
        </li>
      ))}

    {/* إظهار "..." إذا كان هناك فجوة بين الصفحات الوسطى وآخر الصفحات */}
    {currentPage < totalPages - 4 && <li className="page-item disabled"><span className="page-link">...</span></li>}

    {/* آخر صفحتين */}
    {totalPages > 2 && (
      <>
        <li className={`page-item ${currentPage === totalPages - 1 ? "active" : ""}`}>
          <button className="page-link" onClick={() => setCurrentPage(totalPages - 1)}>{totalPages - 1}</button>
        </li>
        <li className={`page-item ${currentPage === totalPages ? "active" : ""}`}>
          <button className="page-link" onClick={() => setCurrentPage(totalPages)}>{totalPages}</button>
        </li>
      </>
    )}

    {/* زر التالي */}
    <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
      <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
    </li>
  </ul>
</nav>

              </>
            ) : (
              <div className="d-flex justify-content-center align-items-center" style={{ height: "70vh" }}>
                <img src={NoData} alt="No Data" />
              </div>
            )}
          </div>
        </div>
      </div>

      <DeleteConfirmation
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        handleDeleteConfirm={handleDeleteConfirm}
        btnName="Delete User"
        img={Delete}
      />
    </>
  );
}
