import React, { useEffect, useState } from 'react'
import Header from '../Shared/Header/Header'
import headimg from '../assets/Imgs/dash-head.png'
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';

export default function Dashbord() {
  const [username, setUsername] = useState('');

  useEffect(() => {
  
    const token = localStorage.getItem('Token');
    if (token) {
    try {
            const decodedToken = jwtDecode(token);
            setUsername(decodedToken.userName || 'User'); 
            console.log(decodedToken);
          } catch (error) {
            console.error('Invalid token', error);
          }
        }
      }, []);

  return (
    <>
      
      <Header 
  title={
    <>
      Welcome <span style={{color:"#DFE0E0",fontWeight:"100"}}>{username}</span> !
    </>
  }
  desc={"This is a welcoming screen for the entry of the application, you can now see the options"}
  img={<img src={headimg} alt="Header Image" />}
/>

      
      <div className='dashbord px-3'>
        <div className="container-fluid">
          <div className=' d-flex flex-column flex-md-row justify-content-between align-items-center dsh rounded-4 p-5'>
            <div className='dsh-title'>
              <h2>Fill the <span style={{color:"#009247"}}>Recipes</span> !</h2>
              <p>you can now fill the meals easily using the table and form , click here and sill it with the table !</p>
            </div>
            <div className='btn-dsh'>
  <Link to="recpies/new-recpie" className="btn btn-success butn px-5">
    Fill Recipes <i className="fa-solid fa-arrow-right"></i>
  </Link>
</div>
          </div>
        </div>
      </div>

    </>
  )
}
