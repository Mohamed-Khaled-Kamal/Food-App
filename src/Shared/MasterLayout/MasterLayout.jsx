import React from 'react'
import Navbar from '../Navbar/Navbar'
import Header from '../Header/Header'
import { Outlet } from 'react-router-dom'
import SideBar from '../../Shared/Sidebar/SideBar'

export default function MasterLayout() {
  return (
    <div>
        <div className="d-flex ">
              <div className=''>
                  <SideBar/>
              </div>
              <div className='w-100 '>
                  <Navbar />
                  <Header />
                  <Outlet />
                  
              </div>
        </div>
    </div>
  )
}
