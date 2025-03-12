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

  const GetAllUsers = async () => {
    try {
      setLoading(true);
      let response = await privateAxiosInstance.get(USER_URLS.USERS_LIST);
      setUsersList(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GetAllUsers();
  }, []);

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };



  const handleDeleteConfirm = async () => {
    if (!selectedUser) return;
    console.log("Deleting user:", selectedUser.id);
    console.log("DELETE URL:", USER_URLS.DELETE_USER(selectedUser.id));
  
    try {
      let response = await privateAxiosInstance.delete(USER_URLS.DELETE_USER(selectedUser.id));
      
      console.log("Response:", response);  
      setUsersList(usersList.filter((user) => user.id !== selectedUser.id));
      setShowDeleteModal(false);
      setSelectedUser(null);
      toast.success(response.data.message)
    } catch (error) {
      console.log("Error deleting user:", error.response || error);
    }
  };
  

  return (
    <>
      <Header
        title={
          <>
            Users <span style={{ color: "#DFE0E0", fontWeight: "100" }}>List</span>
          </>
        }
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
              <table className="table text-center">
                <thead>
                  <tr>
                    <th>#</th>
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
                      <th scope="row">{index + 1}</th>
                      <td>{user.id}</td>
                      <td>{user.userName}</td>
                      <td>{user.email}</td>
                      <td>{user.country}</td>
                      <td>{user.phoneNumber}</td>

                      {/* Actions Dropdown */}
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
            ) : (
              <div className="d-flex justify-content-center align-items-center" style={{ height: "70vh" }}>
                <img src={NoData} alt="No Data" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
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
