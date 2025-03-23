import React from 'react'
import { useState } from 'react'
import logo from '../../assets/Imgs/logo.png'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { axiosInstance, baseUrl, USER_URLS } from '../../Services/Urls/Urls';
import { EMAIL_VALIDATION, PASSWORD_VALIDATION } from '../../Services/Urls/Validations';



export default function Login() {

  const [showPassword, setShowPassword] = useState(false);

  let { register, formState: { errors }, handleSubmit } = useForm()

  let navigate =useNavigate()
  
  const onSubmit = async(data) =>{
           try {
             let response = await axiosInstance.post(USER_URLS.LOGIN, data)
             localStorage.setItem('Token',response.data.token)
             console.log(response);
             console.log(response.data.token)
             toast.success("Login Success")
             navigate('/dashbord')
           } catch (error) {
             console.log(error)
             toast.error(error.response.data.message)
           }
  }

  
    
  return (
    <>
      <div className="auth-container ">
        <div className="container-fluid overlay" >
          <div className="row vh-100 justify-content-center align-items-center">
            <div className="col-md-5 bg-white rounded-3 p-5">
              
              <div className='logo-container text-center mb-2'>
                <img className='w-50' src={logo} alt="" />
              </div>

              <div className="title-auth">
                <h4>Log In</h4>
                <p className='text-muted'>Welcome Back! Please enter your details</p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className='mb-3'>
                <div className="input-group ">
                  <span className='input-group-text bg-white border-end-0'>
                  <i className="fas fa-at"></i>
                  </span>
                  <input {...register("email",EMAIL_VALIDATION
                    )} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Enter your Email'></input>
                </div>
                {errors.email && <span className='text-danger'>{errors.email.message}</span>}

                <div className="input-group mt-4">
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
                {errors.password && <span className='text-danger'>{errors.password.message}</span>}
                

                <div className="links d-flex justify-content-between my-4">
                  <Link to='register' className='text-black text-decoration-none'>
                    Register Now ?
                  </Link>
                  <Link to='forget-password' className='text-success text-decoration-none'>
                    Forget Password ?
                  </Link>
                </div>

                <button className='btn w-100 submit '>Login</button>
                
              </form>


            </div>
          </div>
        </div>
      </div> 
    </>
  )
}
