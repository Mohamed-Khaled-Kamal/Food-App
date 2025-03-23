import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { axiosInstance } from "../../Services/Urls/Urls"; 
// import logo from "../../Assets/Imgs/auth-logo.png";
import authLogo from "/src/Assets/Imgs/authlogo.png";

import { USER_URLS } from "../../Services/Urls/Urls"; 

export default function VerifyAccount() {
  
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  

  const onSubmit = async (data) => {
    console.log("Sending data:", data); 
    
    try {
        let response = await axiosInstance.put(USER_URLS.VERIFY_ACCOUNT, data);
        console.log("Response:", response); 
        
        toast.success("Account verified successfully");
        navigate("/login");
    } catch (error) {
        console.error("Error verifying account:", error); 
        toast.error(error.response?.data?.message || "Something went wrong!");
    }
};


  return (
    <div className="auth-container">
      <div className="container-fluid overlay">
        <div className="row vh-100 justify-content-center align-items-center">
          <div className="col-md-5 bg-white rounded-3 p-5">
            <div className="logo-container text-center mb-2">
              <img className="w-50" src={authLogo} alt="Logo" />
            </div>

            <div className="title-auth">
              <h4>Verfiy Account</h4>
              <p className="text-muted">Please Enter Your OTP or Check Your Inbox</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="mb-3">
              {/* Email Input */}
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0">
                  <i className="fas fa-at"></i>
                </span>
                <input
                  {...register("email")}
                  type="email"
                  className="form-control"
                  defaultValue={email}
                  disabled
                />
              </div>

              {/* OTP Input */}
              <div className="input-group mt-4">
                <span className="input-group-text bg-white border-end-0">
                  <i className="fas fa-key"></i>
                </span>
                <input
                  {...register("code", { required: "Field is Required" })}
                  type="text"
                  className="form-control"
                  placeholder="Enter your OTP"
                />
              </div>

              {errors.code && <small className="text-danger">{errors.code.message}</small>}

              <button className="btn w-100 submit mt-3">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
