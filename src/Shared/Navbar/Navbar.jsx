import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import 'bootstrap-icons/font/bootstrap-icons.css';


export default function Navbar() {
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
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary border border-0">
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
            <ul className="navbar-nav ms-auto">
              <li className="nav-item d-flex align-items-center">
                <i className="bi bi-person-circle me-2" style={{ fontSize: '1.5rem' }}></i>
                <a className="nav-link active" aria-current="page" href="#">
                  {username ? `${username}` : 'Loading...'}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
