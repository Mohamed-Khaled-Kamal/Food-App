// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import logo from '../../assets/Imgs/auth-logo.png';
// import { axiosInstance, USER_URLS } from '../../Services/Urls/Urls';
// import { EMAIL_VALIDATION, PASSWORD_VALIDATION } from '../../Services/Urls/Validations';

// export default function Register() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const {
//     register,
//     formState: { errors },
//     handleSubmit,
//     watch,
//   } = useForm();

//   const navigate = useNavigate();
//   const password = watch("password");


//   // const onSubmit = async (data) => {
//   //   console.log("Form Data Before Sending:", data);
  
//   //   const formData = new FormData();
//   //   formData.append("userName", data.userName);
//   //   formData.append("email", data.email);
//   //   formData.append("country", data.country);
//   //   formData.append("phoneNumber", data.phoneNumber);
//   //   formData.append("password", data.password);
//   //   formData.append("confirmPassword", data.confirmPassword);
  
    
//   //   if (data.profileImage && data.profileImage.length > 0) {
//   //     formData.append("profileImage", data.profileImage[0]);
//   //   }
  
//   //   console.log("FormData Object Before Sending:", formData.get("profileImage"));
//   //   localStorage.setItem("userData", JSON.stringify(formData));
  
//   //   try {
//   //     let response = await axiosInstance.post(USER_URLS.REGISTER, formData, {
//   //       headers: {
//   //         "Content-Type": "multipart/form-data",
//   //       },
//   //     });
  
//   //     console.log(response);
//   //     toast.success("Account created successfully.");
      
//   //     navigate('/vrefiy-account', { state: { email: data.email } });
  
//   //   } catch (error) {
//   //     console.error("Error:", error);
//   //     toast.error(error.response?.data?.message || "Something went wrong!");
//   //   }
//   // };
  
  
//   const onSubmit = async (values) => {
//     localStorage.setItem("formValues", JSON.stringify(values)); // حفظ بيانات النموذج قبل الإرسال
    
//     const formData = new FormData();
//     for (let key in values) {
//       formData.append(key, values[key]);
//     }
  
//     const entries = Object.fromEntries(formData.entries());
//     localStorage.setItem("formData", JSON.stringify(entries)); // حفظ بيانات الـ FormData للتحقق منها لاحقًا
    
//     try {
//       const { data } = await axiosInstance.post(USER_URLS.REGISTER, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
  
//       toast.success(data?.message || "Account created successfully.");
//       localStorage.setItem("userData", JSON.stringify(data)); // حفظ بيانات المستخدم بعد التسجيل بنجاح
//       navigate('/vrefiy-account', { state: { email: values.email } });
//     } catch (error) {
//       console.error("Error:", error);
//       toast.error(error?.response?.data?.message || "Something went wrong!");
//     }
//   };
  
  

//   return (
//     <div className="auth-container">
//       <div className="container-fluid overlay">
//         <div className="row vh-100 justify-content-center align-items-center">
//           <div className="col-md-6 bg-white rounded-3 p-5">
//             <div className='logo-container text-center mb-2'>
//               <img className='w-50' src={logo} alt="Logo" />
//             </div>
//             <div className="title-auth">
//               <h4>Register</h4>
//               <p className='text-muted'>Welcome! Please enter your details</p>
//             </div>
//             <form onSubmit={handleSubmit(onSubmit)} className='mb-3'>
//               <div className="row g-3">
//                 {/* User Name */}
//                 <div className="col-md-6">
//                   <div className="input-group">
//                     <span className='input-group-text'><i className="fas fa-user"></i></span>
//                     <input {...register("userName", { required: 'User Name is required' })} type="text" className="form-control" placeholder='User Name' />
//                   </div>
//                   {errors.userName && <span className='text-danger'>{errors.userName.message}</span>}
//                 </div>

//                 {/* Email */}
//                 <div className="col-md-6">
//                   <div className="input-group">
//                     <span className='input-group-text'><i className="fas fa-at"></i></span>
//                     <input {...register("email", EMAIL_VALIDATION)} type="email" className="form-control" placeholder='Email' />
//                   </div>
//                   {errors.email && <span className='text-danger'>{errors.email.message}</span>}
//                 </div>
//               </div>

//               <div className="row g-3 mt-3">
//                 {/* Country */}
//                 <div className="col-md-6">
//                   <div className="input-group">
//                     <span className='input-group-text'><i className="fas fa-globe-africa"></i></span>
//                     <input {...register("country", { required: 'Country is required' })} type="text" className="form-control" placeholder='Country' />
//                   </div>
//                   {errors.country && <span className='text-danger'>{errors.country.message}</span>}
//                 </div>

//                 {/* Phone */}
//                 <div className="col-md-6">
//                   <div className="input-group">
//                     <span className='input-group-text'><i className="fas fa-phone"></i></span>
//                     <input {...register("phoneNumber", { required: 'Phone is required' })} type="text" className="form-control" placeholder='Phone' />
//                   </div>
//                   {errors.phoneNumber && <span className='text-danger'>{errors.phoneNumber.message}</span>}
//                 </div>
//               </div>

//               <div className="row g-3 mt-3">
//                 {/* Password */}
//                 <div className="col-md-6">
//                   <div className="input-group">
//                     <span className="input-group-text bg-white">
//                       <i className="fas fa-lock"></i>
//                     </span>
//                     <input
//                       {...register("password", PASSWORD_VALIDATION)}
//                       type={showPassword ? "text" : "password"}
//                       className="form-control border-end-0"
//                       placeholder="Enter your password"
//                     />
//                     <button
//                       type="button"
//                       className="btn btn-outline-secondary border-start-0 border-secondary-subtle"
//                       onClick={() => setShowPassword(!showPassword)}
//                     >
//                       <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
//                     </button>
//                   </div>
//                   {errors.password && <span className='text-danger'>{errors.password.message}</span>}
//                 </div>

//                 {/* Confirm Password */}
//                 <div className="col-md-6">
//                   <div className="input-group">
//                     <span className="input-group-text bg-white">
//                       <i className="fas fa-lock"></i>
//                     </span>
//                     <input
//                       {...register("confirmPassword", {
//                         required: 'Confirm password is required',
//                         validate: value => value === password || "Passwords do not match"
//                       })}
//                       type={showConfirmPassword ? "text" : "password"}
//                       className="form-control border-end-0"
//                       placeholder="Confirm your password"
//                     />
//                     <button
//                       type="button"
//                       className="btn btn-outline-secondary border-start-0 border-secondary-subtle"
//                       onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                     >
//                       <i className={`fas ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
//                     </button>
//                   </div>
//                   {errors.confirmPassword && <span className='text-danger'>{errors.confirmPassword.message}</span>}
//                 </div>
//                 {/* Upload Image */}
//                 <div className="col-md-12">
//                 <div className="input-group mb-3 mt-3">
//                     <input
//                       {...register("profileImage")}
//                       type="file" className="form-control" id="inputGroupFile02" />
//                 <label className="input-group-text" for="inputGroupFile02">Upload</label>
//               </div>
//                 </div>
//               </div>

              

//               <div className="links d-flex justify-content-between my-4">
//                 <Link to='/' className='text-success text-decoration-none ms-auto'>Login Now?</Link>
//               </div>

//               <button className='btn w-100 submit'>Register</button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


/**///////////////////////////// */

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import logo from '../../assets/Imgs/authlogo.png';
import { axiosInstance, USER_URLS } from '../../Services/Urls/Urls';
import { EMAIL_VALIDATION, PASSWORD_VALIDATION } from '../../Services/Urls/Validations';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue
  } = useForm();

  const navigate = useNavigate();
  const password = watch("password");

  const handleImage = (files) => {
    if (files[0]) {
      setValue('profileImage', files[0]);
    }
  };

  const onSubmit = async (values) => {
    console.log("Form Data Before Sending:", values);
    
    const formData = new FormData();
    for (let key in values) {
      formData.append(key, values[key]);
    }

    const entries = Object.fromEntries(formData.entries());
    console.log("FormData Object Before Sending:", entries);
    localStorage.setItem("formData", JSON.stringify(entries));
    
    try {
      const { data } = await axiosInstance.post(USER_URLS.REGISTER, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log(data);
      toast.success(data?.message || "Account created successfully.");
      localStorage.setItem("userData", JSON.stringify(data));
      navigate('/vrefiy-account', { state: { email: values.email } });
    } catch (error) {
      console.error("Error:", error);
      toast.error(error?.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="auth-container">
      <div className="container-fluid overlay">
        <div className="row vh-100 justify-content-center align-items-center">
          <div className="col-md-6 bg-white rounded-3 p-5">
            <div className='logo-container text-center mb-2'>
              <img className='w-50' src={logo} alt="Logo" />
            </div>
            <div className="title-auth">
              <h4>Register</h4>
              <p className='text-muted'>Welcome! Please enter your details</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className='mb-3'>
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="input-group">
                    <span className='input-group-text'><i className="fas fa-user"></i></span>
                    <input {...register("userName", { required: 'User Name is required' })} type="text" className="form-control" placeholder='User Name' />
                  </div>
                  {errors.userName && <span className='text-danger'>{errors.userName.message}</span>}
                </div>
                <div className="col-md-6">
                  <div className="input-group">
                    <span className='input-group-text'><i className="fas fa-at"></i></span>
                    <input {...register("email", EMAIL_VALIDATION)} type="email" className="form-control" placeholder='Email' />
                  </div>
                  {errors.email && <span className='text-danger'>{errors.email.message}</span>}
                </div>
              </div>
              <div className="row g-3 mt-3">
                <div className="col-md-6">
                  <div className="input-group">
                    <span className='input-group-text'><i className="fas fa-globe-africa"></i></span>
                    <input {...register("country", { required: 'Country is required' })} type="text" className="form-control" placeholder='Country' />
                  </div>
                  {errors.country && <span className='text-danger'>{errors.country.message}</span>}
                </div>
                <div className="col-md-6">
                  <div className="input-group">
                    <span className='input-group-text'><i className="fas fa-phone"></i></span>
                    <input {...register("phoneNumber", { required: 'Phone is required' })} type="text" className="form-control" placeholder='Phone' />
                  </div>
                  {errors.phoneNumber && <span className='text-danger'>{errors.phoneNumber.message}</span>}
                </div>
              </div>
              <div className="row g-3 mt-3">
                <div className="col-md-6">
                  <div className="input-group">
                    <span className="input-group-text bg-white"><i className="fas fa-lock"></i></span>
                    <input {...register("password", PASSWORD_VALIDATION)} type={showPassword ? "text" : "password"} className="form-control border-end-0" placeholder="Enter your password" />
                    <button type="button" className="btn btn-outline-secondary border-start-0 border-secondary-subtle" onClick={() => setShowPassword(!showPassword)}>
                      <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                    </button>
                  </div>
                  {errors.password && <span className='text-danger'>{errors.password.message}</span>}
                </div>
                <div className="col-md-6">
                  <div className="input-group">
                    <span className="input-group-text bg-white"><i className="fas fa-lock"></i></span>
                    <input {...register("confirmPassword", { required: 'Confirm password is required', validate: value => value === password || "Passwords do not match" })} type={showConfirmPassword ? "text" : "password"} className="form-control border-end-0" placeholder="Confirm your password" />
                    <button type="button" className="btn btn-outline-secondary border-start-0 border-secondary-subtle" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                      <i className={`fas ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                    </button>
                  </div>
                  {errors.confirmPassword && <span className='text-danger'>{errors.confirmPassword.message}</span>}
                </div>
                <div className="col-md-12">
                  <div className="input-group mb-3 mt-3">
                    <input {...register("profileImage")} type="file" className="form-control" id="inputGroupFile02" onChange={handleImage} />
                    <label className="input-group-text" htmlFor="inputGroupFile02">Upload</label>
                  </div>
                </div>
              </div>
              <div className="links d-flex justify-content-between my-4">
                <Link to='/' className='text-success text-decoration-none ms-auto'>Login Now?</Link>
              </div>
              <button className='btn w-100 submit'>Register</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
