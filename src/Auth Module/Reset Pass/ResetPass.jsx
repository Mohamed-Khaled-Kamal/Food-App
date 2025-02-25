import React from 'react'
import { useState } from 'react'
import logo from '../../assets/Imgs/auth-logo.png'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { USER_URLS } from '../../Services/Urls/Urls';


export default function ResetPass() {

  const [showPassword, setShowPassword] = useState(false);

  let { register, formState: { errors }, handleSubmit } = useForm()

  let navigate =useNavigate()
  
  const onSubmit = async(data) =>{
           try {
             let response = await axios.post(USER_URLS.RESET_PASSWORD, data)
             console.log(response);
             toast.success("Update Password Done")
             navigate('/login')
           } catch (error) {
            console.log(error)
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

              <div className="title">
                <h4>Reset Password</h4>
                <p className='text-muted'>Please Enter Your OTP or Check Your Inbox</p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className='mb-3'>
                <div className="input-group ">
                  <span className='input-group-text bg-white border-end-0'>
                  <i className="fas fa-at"></i>
                  </span>
                  <input {...register("email",
                    {
                      required: 'Field is Required',
                      pattern: {
                        value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                        message:"please enter valid mail"
                      }
                     })} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Enter your Email'></input>
                </div>
                {errors.email && <span className='text-danger'>{errors.email.message}</span>}

                <div className="input-group mt-4">
                  <span className='input-group-text bg-white border-end-0'>
                  <i class="fas fa-key"></i>
                  </span>
                  <input {...register("seed",
                    {
                      required: 'Field is Required',
                      
                     })} type="text" className="form-control"  placeholder='Enter your OTP'></input>
                </div>

                <div className="input-group mt-4">
      <span className="input-group-text bg-white">
        <i className="fas fa-lock"></i>
      </span>
                  <input {...register("password",
                    {
                      required: 'Field is Required',
                      minLength: {
                        value: 8,
                        message: "password must be at least 8 characters",
                      }
                     })} type={showPassword ? "text" : "password"} className="form-control border-end-0" id="exampleInputPassword" placeholder="New password" />
      <span
        className="btn btn-outline-secondary border-start-0 border-secondary-subtle"
        type="button"
        onClick={() => setShowPassword(!showPassword)}
      >
        <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
      </span>
                </div>
                {errors.password && <span className='text-danger'>{errors.password.message}</span>}

                <div className="input-group my-4 ">
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
                     })} type={showPassword ? "text" : "password"} className="form-control border-end-0" id="exampleInputPassword" placeholder="Confirm New password" />
      <span
        className="btn btn-outline-secondary border-start-0 border-secondary-subtle"
        type="button"
        onClick={() => setShowPassword(!showPassword)}
      >
        <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
      </span>
                </div>
                {errors.password && <span className='text-danger'>{errors.password.message}</span>}
                

               

                <button className='btn w-100 submit '>Reset Password</button>
                
              </form>


            </div>
          </div>
        </div>
      </div> 
    </>
  )
}
