import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import 'bootstrap-icons/font/bootstrap-icons.css';
import UserImg from '../../assets/Imgs/UserImg.png'

export default function Navbar({loginData}) {
  const [username, setUsername] = useState('');

  
  useEffect(() => {
    const token = localStorage.getItem('Token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUsername(decodedToken.userEmail || 'User');
        console.log(decodedToken);
      } catch (error) {
        console.error('Invalid token', error);
      }
    }
  }, []);

  return (
    <div className='p-3'>
      <nav className="navbar navbar-expand-lg bg-body-tertiary border border-0 rounded-3">
        <div className="container-fluid">
          
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

         
          <div className="collapse navbar-collapse" id="navbarNav">
            <div className="input-group me-auto bg-white  rounded-3" style={{ maxWidth: '500px' }}>
              <span className="input-group-text" style={{
                border: 'none',
                background: 'transparent',
                paddingRight: '10px'
              }}>
                <i className="bi bi-search"></i>
              </span>
              <input
                className="form-control border-0 shadow-none bg-white"
                type="search"
                placeholder="Search Here"
                aria-label="Search"
                style={{
                  boxShadow: 'none',
                  borderLeft: 'none',
                  borderRadius: '0'
                }}
              />
            </div>

            
            <ul className="navbar-nav">
              
              <li className="nav-item d-flex align-items-center">
  <img
    src={UserImg}
    alt="User Avatar"
    className="me-2"
  />
  <a className="nav-link active" aria-current="page" href="#">
    {username ? `${username}` : 'Loading...'}
  </a>
</li>

            </ul>
            <div className='mx-3'>
            <i className="fa-solid fa-angle-down"></i>
           </div>
            <div className='mx-2'>
            <i className="fa-solid fa-bell"></i>
           </div>
          </div>
        </div>
      </nav>
    </div>
  );
}


/**/////////////////////////////// */
