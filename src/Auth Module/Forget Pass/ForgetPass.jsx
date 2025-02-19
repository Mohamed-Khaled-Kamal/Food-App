import React from 'react'
import { useState } from 'react'
import logo from '../../assets/Imgs/auth-logo.png'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';


export default function ForgetPass() {

  const [showPassword, setShowPassword] = useState(false);

  let { register, formState: { errors }, handleSubmit } = useForm()

  let navigate =useNavigate()
  
  const onSubmit = async(data) =>{
           try {
             let response = await axios.post('https://upskilling-egypt.com:3006/api/v1/Users/Reset/Request', data)
             console.log(response);
             toast.success("check your inbox")
             navigate('/reset-password')
           } catch (error) {
             console.log(error)
             toast.error("Wrong Email")
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
                <h4>Forgot Your Password?</h4>
                <p className='text-muted'>No Worries! Please enter your email and we will send a password reset link</p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className='mb-3'>
                <div className="input-group mb-5">
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

               
                

              

                <button className='btn w-100 submit '>Submit</button>
                
              </form>


            </div>
          </div>
        </div>
      </div> 
    </>
  )
}

