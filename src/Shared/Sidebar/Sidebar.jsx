import React, { useState } from 'react';
import { Menu, MenuItem, Sidebar } from 'react-pro-sidebar';
import sidelogo from '../../assets/Imgs/Sidebar-logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Modal } from 'react-bootstrap';
import Logout from '../../assets/Imgs/Logout.png';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { axiosInstance, privateAxiosInstance, USER_URLS } from '../../Services/Urls/Urls';
import Logo from '../../assets/Imgs/auth-logo.png'

export default function SideBar() {
  const [collapsed, setCollapsed] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const navigate = useNavigate();
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const password = watch("newPassword");
  const confirmPassword = watch("confirmNewPassword");
  const isMatched = password === confirmPassword;

  const toggleCollapse = () => setCollapsed(!collapsed);
  
  const handleLogout = () => {
    localStorage.removeItem("Token");
    toast.info("Logged out successfully");
    navigate("/");
  };


  const onSubmitPasswordChange = async (data) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      let response = await privateAxiosInstance.put(
        USER_URLS.CHANGE_PASSWORD, 
        data, 
      );
      
      console.log(response);
      toast.success(response.data.message);
      setShowChangePasswordModal(false);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }

    setIsSubmitting(false);
};


  return (
    <>
      <div className='sidebar-container'>
        <Sidebar collapsed={collapsed} className='Side-bar'>
          <Menu>
            <div className='side-logo'>
              <MenuItem onClick={toggleCollapse} icon={<img className='img-logo' src={sidelogo} alt="logo" />}></MenuItem>
            </div>

            <MenuItem icon={<i className="fas fa-home"></i>} component={<Link to={"/dashbord"} />}>
              Home
            </MenuItem>
            <MenuItem icon={<i className="fas fa-users"></i>} component={<Link to={"/dashbord/Users"} />}>
              Users
            </MenuItem>
            <MenuItem icon={<i className="fas fa-th-large"></i>} component={<Link to={"/dashbord/recpies"} />}>
              Recipes
            </MenuItem>
            <MenuItem icon={<i className="fas fa-calendar-alt"></i>} component={<Link to={"/dashbord/categories"} />}>
              Categories
            </MenuItem>
            <MenuItem icon={<i className="fas fa-unlock-alt"></i>} onClick={() => setShowChangePasswordModal(true)}>
              Change Password
            </MenuItem>
            <MenuItem onClick={() => setShowLogoutModal(true)} className='log-out' icon={<i className="fas fa-sign-out-alt"></i>}>
              Log Out
            </MenuItem>
          </Menu>
        </Sidebar>
      </div>

      {/* Logout Confirmation Modal */}
      <Modal show={showLogoutModal} onHide={() => setShowLogoutModal(false)} centered>
        <div className="d-flex justify-content-end p-2">
          <i onClick={() => setShowLogoutModal(false)} style={{ cursor: "pointer" }} className="far fa-times-circle text-danger fs-3"></i>
        </div>
        <Modal.Body>
          <div className="d-flex justify-content-center align-items-center">
            <img src={Logout} alt="logout confirmation" />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button type="button" className="btn btn-outline-danger" onClick={handleLogout}>
            Log Out
          </button>
        </Modal.Footer>
      </Modal>

      {/* Change Password Modal */}
      <Modal show={showChangePasswordModal} onHide={() => setShowChangePasswordModal(false)} centered>
  <div className="d-flex justify-content-end p-2">
    <i onClick={() => setShowChangePasswordModal(false)} style={{ cursor: "pointer" }} className="far fa-times-circle text-danger fs-3"></i>
  </div>
  <Modal.Body>
    <div className="container-fluid">
      <div className="row">
        <div className='logo-container text-center mb-2'>
          <img className='w-50' src={Logo} alt="Logo" />
        </div>

        <div className="title">
          <h4>Change Your Password</h4>
          <p className='text-muted'>Please Enter Your Details Below</p>
        </div>

        <form onSubmit={handleSubmit(onSubmitPasswordChange)} className='mb-3'>

          {/* Old Password */}
          <div className="input-group mt-4">
            <span className="input-group-text bg-white">
              <i className="fas fa-lock"></i>
            </span>
            <input 
              {...register("oldPassword", { required: 'Old password is required' })} 
              type={showOldPass ? "text" : "password"} 
              className="form-control border-end-0" 
              placeholder="Enter old password" 
            />
            <button 
              type="button"
              className="btn btn-outline-secondary border-start-0 border-secondary-subtle"
              onClick={() => setShowOldPass(!showOldPass)}
            >
              <i className={`fas ${showOldPass ? "fa-eye-slash" : "fa-eye"}`}></i>
            </button>
          </div>
          {errors.oldPassword && <span className='text-danger'>{errors.oldPassword.message}</span>}

          {/* New Password */}
          <div className="input-group mt-4">
            <span className="input-group-text bg-white">
              <i className="fas fa-lock"></i>
            </span>
            <input 
              {...register("newPassword", {
                required: 'New password is required',
                minLength: { value: 8, message: "Must be at least 8 characters" }
              })} 
              type={showNewPass ? "text" : "password"} 
              className="form-control border-end-0" 
              placeholder="Enter new password" 
            />
            <button 
              type="button"
              className="btn btn-outline-secondary border-start-0 border-secondary-subtle"
              onClick={() => setShowNewPass(!showNewPass)}
            >
              <i className={`fas ${showNewPass ? "fa-eye-slash" : "fa-eye"}`}></i>
            </button>
          </div>
          {errors.newPassword && <span className='text-danger'>{errors.newPassword.message}</span>}

          {/* Confirm New Password */}
          <div className="input-group my-4">
            <span className="input-group-text bg-white">
              <i className="fas fa-lock"></i>
            </span>
            <input 
              {...register("confirmNewPassword", {
                required: 'Confirm new password is required',
                validate: (value) => value === password || "Passwords do not match"
              })} 
              type={showConfirmPass ? "text" : "password"} 
              className="form-control border-end-0" 
              placeholder="Confirm new password" 
            />
            <button 
              type="button"
              className="btn btn-outline-secondary border-start-0 border-secondary-subtle"
              onClick={() => setShowConfirmPass(!showConfirmPass)}
            >
              <i className={`fas ${showConfirmPass ? "fa-eye-slash" : "fa-eye"}`}></i>
            </button>
          </div>
          {errors.confirmNewPassword && <span className='text-danger'>{errors.confirmNewPassword.message}</span>}

          {/* Submit Button */}
          <button type="submit" className='btn w-100 submit' disabled={isSubmitting}>
            {isSubmitting ? "Updating..." : "Change Password"}
          </button>

        </form>
      </div>
    </div>
  </Modal.Body>
</Modal>

    </>
  );
}
