import React from 'react'
import { Link } from 'react-router-dom'
import './NotFound.css'
import Logo from '../../assets/Imgs/auth-logo.png'
import error from '../../assets/Imgs/Notfound.png'

export default function NotFound() {
  return (
    <>
      <div className="Not-Found vh-100 w-100">

        <div className="container-fluid p-3">
          
      <div className='mb-5'>
          <img src={Logo} alt="" />
          </div>

          <div className="d-flex mt-5">

            <div>
              <h1>Oops.</h1>
              <h1 className='text-success'>Page is Not Found</h1>
              <h1 className='p-0 mt-0 fs-1'>...</h1>
              <p>This Page doesn’t exist or was removed!
                We suggest you  back to home.</p>

              <Link 
  to="/dashbord" 
  className="btn btn-success d-flex justify-content-center align-items-center text-wrap px-5 w-50"
  style={{ whiteSpace: "normal", gap: "8px" }} 
>
  <i className="fas fa-arrow-left"></i>
  <span className='fw-semibold'>Back To <br/> Home</span>
</Link>

            </div>

            <div>
              <img src={error} alt="Error" />
            </div>
            
          </div>
          
        </div>
        
      </div>
    </>
  )
}
