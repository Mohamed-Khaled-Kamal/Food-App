import React, { useEffect, useState } from "react";
import Header from "../../Shared/Header/Header";
import headimg from "../../assets/Imgs/recipes-head.png";
import NoData from "../../assets/Imgs/No-data.png";
import { privateAxiosInstance, USER_URLS } from "../../Services/Urls/Urls";
import DeleteConfirmation from "../../Shared/DeleteConfirmation/DeleteConfirmation";
import Delete from "../../assets/Imgs/delete user.png";
import { toast } from "react-toastify";
import Preloader from "../../Shared/Preloader/Preloader";

export default function UsersList() {
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [groupValue, setGroupValue] = useState("");
  const [name, setName] = useState('');
  const pageSize = 5;

  const GetAllUsers = async (page, groups, name) => {
    try {
      setLoading(true);
      let response = await privateAxiosInstance.get(USER_URLS.USERS_LIST, {
        params: { pageSize, pageNumber: page, groups: groups, name: name }
      });
      setUsersList(response.data.data);
      console.log(response.data.data)
      setTotalPages(response.data.totalNumberOfPages);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GetAllUsers(currentPage, groupValue, name);
  }, [currentPage, groupValue, name]);

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
      toast.error(error?.response?.data?.message )
    }
  };

  const getGroupValue = (input) => {
    setGroupValue(input.target.value);
    setCurrentPage(1);
  };


  
  const getNameValue = (e) => {
    setName(e.target.value); 
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

      <div className="container py-3">
        <div className="row align-items-center">
          <div className="col-md-6 my-1">
            <input type="text" className="form-control" placeholder="Search..." onChange={getNameValue} />
          </div>
          <div className="col-md-6 my-1">
            <select className="form-control" onChange={getGroupValue}>
              <option value="">Role</option>
              <option value={1}>Admin</option>
              <option value={2}>User</option>
            </select>
          </div>
        </div>
      </div>

      {loading ? <Preloader /> : (
        <>
          {usersList.length > 0 ? (
            <>
              {/* جدول المستخدمين (يظهر فقط على الشاشات الكبيرة) */}
              <div className="container d-none d-md-block">
                <table className="table text-center table-striped table-hover">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Country</th>
                      <th>Phone</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                  {usersList.map((user, index) => (
                      <tr key={user.id}>
                        <th>{(currentPage - 1) * pageSize + index + 1}</th>
                        <td>{user.id}</td>
                        <td>{user.userName}</td>
                      <td>{user.email}</td>
                      <td>
                        <span className={`badge ${user?.group?.name === "SystemUser" ? "text-bg-warning" : user?.group?.name === "SuperAdmin" ? "text-bg-success" : "text-bg-secondary"}`}>
                          {user?.group?.name === "SystemUser"
                            ? "User"
                            : user?.group?.name === "SuperAdmin"
                            ? "Admin"
                            : user?.group?.name}
                        </span>
                      </td>                     
                        <td>{user.country}</td>
                        <td>{user.phoneNumber}</td>
                       
                      <td style={{ position: "relative" }}>
  <i
    className="fas fa-ellipsis-h"
    style={{ cursor: "pointer", fontSize: "1.3rem" }}
    onClick={(e) => {
      e.stopPropagation();
      setDropdownOpen(dropdownOpen === user.id ? null : user.id);
    }}
  ></i>
  {dropdownOpen === user.id && (
    <div
      className="dropdown-menu show position-absolute bg-light shadow rounded p-2"
      style={{ top: "100%", right: 0, zIndex: 1000 }} // تحديد الموقع بدقة
    >
      <button className="dropdown-item d-flex align-items-center">
        <i className="far fa-eye me-2"></i> View
      </button>
      <button
        className="dropdown-item d-flex align-items-center"
        onClick={() => handleDeleteClick(user)}
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
              </div>

              {/* كروت المستخدمين (تظهر فقط على الشاشات الصغيرة) */}
              <div className="container d-md-none">
                <div className="row">
                  {usersList.map((user, index) => (
                    <div key={user.id} className="col-12 mb-3">
                      <div className="card shadow-sm">
                        <div className="card-body">
                          <h6 className="card-title"><strong>User Name:</strong> {user.userName}</h6>
                          <p className="card-text"><strong>Email:</strong> {user.email}</p>
                          <p className="card-text"><strong>Role:</strong> <span className={`badge ${user?.group?.name === "SystemUser" ? "text-bg-warning" : user?.group?.name === "SuperAdmin" ? "text-bg-success" : "text-bg-secondary"}`}>
    {user?.group?.name === "SystemUser"
      ? "User"
      : user?.group?.name === "SuperAdmin"
      ? "Admin"
      : user?.group?.name}
  </span></p>
                          <p className="card-text"><strong>Country:</strong> {user.country}</p>
                          <p className="card-text"><strong>Phone:</strong> {user.phoneNumber}</p>
                          <button className="btn btn-outline-danger btn-sm w-100" onClick={() => setShowDeleteModal(true)}>
                            <i className="fas fa-trash-alt"></i> Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <nav aria-label="Page navigation">
  <ul className="pagination justify-content-center">
    
    <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
      <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
    </li>

    
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

    
    {currentPage > 5 && <li className="page-item disabled"><span className="page-link">...</span></li>}

    
    {Array.from({ length: totalPages }, (_, i) => i + 1)
      .slice(Math.max(2, currentPage - 2), Math.min(totalPages - 2, currentPage + 1))
      .map(page => (
        <li className={`page-item ${page === currentPage ? "active" : ""}`} key={page}>
          <button className="page-link" onClick={() => setCurrentPage(page)}>{page}</button>
        </li>
      ))}

    
    {currentPage < totalPages - 4 && <li className="page-item disabled"><span className="page-link">...</span></li>}

    
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

    
    <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
      <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
    </li>
  </ul>
</nav>
            </>
          ) : (
              <NoData/>
          )}
        </>
      )}

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
