import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import logo from '../../assets/Imgs/auth-logo.png';
import { USER_URLS } from '../../Services/Urls/Urls';
import { EMAIL_VALIDATION, PASSWORD_VALIDATION } from '../../Services/Urls/Validations';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  let { register, formState: { errors }, handleSubmit } = useForm();
  let navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      let response = await axios.post(USER_URLS.REGISTER, data);
      console.log(response);
      toast.success("Login Success");
      navigate('login');
    } catch (error) {
      console.log(error);
      toast.error("Wrong Email and Password!!!!!!!");
    }
  };

  return (
    <div className="auth-container">
      <div className="container-fluid overlay">
        <div className="row vh-100 justify-content-center align-items-center">
          <div className="col-md-6 bg-white rounded-3 p-5">
            <div className='logo-container text-center mb-2'>
              <img className='w-50' src={logo} alt="" />
            </div>
            <div className="title-auth">
              <h4>Register</h4>
              <p className='text-muted'>Welcome Back! Please enter your details</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className='mb-3'>
              <div className="row g-3">
                <div className="col-md-6">
                <div className=" input-group">
                  <span className='input-group-text'><i className="fas fa-user"></i></span>
                  <input {...register("userName", { required: 'Field is Required' })} type="text" className="form-control" placeholder='UserName' />
                  {errors.firstName && <span className='text-danger'>{errors.firstName.message}</span>}
                </div>
                </div>
                <div className="col-md-6">
                <div className="input-group">
                  <span className='input-group-text'><i class="fas fa-at"></i></span>
                  <input {...register("email", EMAIL_VALIDATION)} type="email" className="form-control" placeholder='Email' />
                  {errors.email && <span className='text-danger'>{errors.email.message}</span>}
                </div>
                </div>
              </div>
              <div className="row g-3 mt-3">
                <div className="col-md-6">
                <div className=" input-group">
                  <span className='input-group-text'><i class="fas fa-globe-africa"></i></span>
                  <input {...register("country", {
                    required: 'Field is Required',
                  })} type="text" className="form-control" placeholder='Country' />
                  {errors.email && <span className='text-danger'>{errors.email.message}</span>}
                </div>
                </div>
                <div className="col-md-6">
                <div className=" input-group">
                  <span className='input-group-text'><i className="fas fa-phone"></i></span>
                  <input {...register("phoneNumber", { required: 'Field is Required' })} type="text" className="form-control" placeholder='Phone' />
                  {errors.phone && <span className='text-danger'>{errors.phone.message}</span>}
                </div>
                </div>
              </div>
              <div className="row g-3 mt-3">
                <div className="col-md-6">
                <div className="input-group mt-">
      <span className="input-group-text bg-white">
        <i className="fas fa-lock"></i>
      </span>
                  <input {...register("password",PASSWORD_VALIDATION
                   )} type={showPassword ? "text" : "password"} className="form-control border-end-0" id="exampleInputPassword" placeholder="Enter your password" />
      <span
        className="btn btn-outline-secondary border-start-0 border-secondary-subtle"
        type="button"
        onClick={() => setShowPassword(!showPassword)}
      >
        <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
      </span>
                </div>
                </div>
                <div className="col-md-6">
                <div className="input-group ">
      <span className="input-group-text bg-white">
        <i className="fas fa-lock"></i>
      </span>
                  <input {...register("confirmPassword",
                    {
                      required: 'Field is Required',
                      minLength: {
                        value: 8,
                        message: "password must be at least 8 characters",
                      }
                     })} type={showPassword ? "text" : "password"} className="form-control border-end-0" id="exampleInputPassword" placeholder="Enter your password" />
      <span
        className="btn btn-outline-secondary border-start-0 border-secondary-subtle"
        type="button"
        onClick={() => setShowPassword(!showPassword)}
      >
        <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
      </span>
                </div>
                </div>
              </div>
              <div className="links d-flex justify-content-between my-4">
                <Link to='/' className='text-success text-decoration-none ms-auto'>Login Now ?</Link>
              </div>
              <button className='btn w-100 submit'>Register</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
