import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Sidemenu from '../SideBar/Sidemenu'


export default function MasterLayout({loginData}) {
  return (
    <div>
        <div className="d-flex ">
              <div className=''>
                  <Sidemenu loginData={loginData}/>
              </div>
              <div className='w-100 vh-100 overflow-auto'>
                  <Navbar loginData={loginData} />
                  
                  <Outlet />
                  
              </div>
        </div>
    </div>
  )
}
