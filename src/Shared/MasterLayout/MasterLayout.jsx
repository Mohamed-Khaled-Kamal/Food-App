import React from 'react'
import Navbar from '../Navbar/Navbar'
import Header from '../Header/Header'
import { Outlet } from 'react-router-dom'
import Sidebar from '../Sidebar/Sidebar'

export default function MasterLayout() {
  return (
    <div>
        <div className="d-flex bg-info">
              <div className='w-25'>
                  <Sidebar/>
              </div>
              <div className='w-75 bg-warning'>
                  <Navbar />
                  <Header />
                  <Outlet />
                  
              </div>
        </div>
    </div>
  )
}
