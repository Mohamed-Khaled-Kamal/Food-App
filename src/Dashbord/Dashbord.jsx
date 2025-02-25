import React, { useEffect, useState } from 'react'
import Header from '../Shared/Header/Header'
import headimg from '../assets/Imgs/dash-head.png'
import { jwtDecode } from 'jwt-decode';

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
    <div>
      <Header title={`Welcome ${username}`}
        desc={"This is a welcoming screen for the entry of the application , you can now see the options"}
        img={<img src={headimg} />}
      />
      Dashbord
    </div>
  )
}
