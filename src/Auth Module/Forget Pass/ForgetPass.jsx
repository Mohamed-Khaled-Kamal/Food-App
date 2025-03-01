import React, { useState } from 'react';
import logo from '../../assets/Imgs/auth-logo.png';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { axiosInstance, USER_URLS } from '../../Services/Urls/Urls';

export default function ForgetPass() {
  const [isSubmitting, setIsSubmitting] = useState(false); 

  let { register, formState: { errors }, handleSubmit } = useForm();
  let navigate = useNavigate();
  
  const onSubmit = async (data) => {
    if (isSubmitting) return; 

    setIsSubmitting(true); 
    try {
      let response = await axiosInstance.post(USER_URLS.FORGET_PASSWORD, data);
      console.log(response);
      toast.success("Check your inbox");
      navigate('/reset-password', { state: { email: data.email } }); 
    } catch (error) {
      console.log(error);
      toast.error("Wrong Email");
    }
    setIsSubmitting(false); 
  };

  return (
    <div className="auth-container">
      <div className="container-fluid overlay">
        <div className="row vh-100 justify-content-center align-items-center">
          <div className="col-md-5 bg-white rounded-3 p-5">
            
            <div className='logo-container text-center mb-2'>
              <img className='w-50' src={logo} alt="Logo" />
            </div>

            <div className="title">
              <h4>Forgot Your Password?</h4>
              <p className='text-muted'>No worries! Please enter your email and we will send a password reset link.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className='mb-3'>
              {/* Email Input */}
              <div className="input-group mb-5">
                <span className='input-group-text bg-white border-end-0'>
                  <i className="fas fa-at"></i>
                </span>
                <input 
                  {...register("email", {
                    required: 'Field is Required',
                    pattern: {
                      value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                      message: "Please enter a valid email"
                    }
                  })} 
                  type="email" 
                  className="form-control" 
                  placeholder='Enter your Email'
                />
              </div>
              {errors.email && <span className='text-danger'>{errors.email.message}</span>}

              {/* Submit Button */}
              <button className='btn w-100 submit' disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
              
            </form>

          </div>
        </div>
      </div>
    </div> 
  );
}
