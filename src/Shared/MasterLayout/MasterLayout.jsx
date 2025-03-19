import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import SideBaar from '../SideBar/SideBar'

export default function MasterLayout() {
  return (
    <div>
        <div className="d-flex ">
              <div className=''>
                  <SideBaar/>
              </div>
              <div className='w-100 vh-100 overflow-auto'>
                  <Navbar />
                  
                  <Outlet />
                  
              </div>
        </div>
    </div>
  )
}
