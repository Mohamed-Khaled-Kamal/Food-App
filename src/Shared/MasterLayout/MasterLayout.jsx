import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import SideBar from '../SideBar/SideBar.jsx'

export default function MasterLayout() {
  return (
    <div>
        <div className="d-flex ">
              <div className=''>
                  <SideBar/>
              </div>
              <div className='w-100 vh-100 overflow-auto'>
                  <Navbar />
                  
                  <Outlet />
                  
              </div>
        </div>
    </div>
  )
}
