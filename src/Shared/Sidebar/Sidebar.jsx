import React, { useState } from 'react';
import { Menu, MenuItem, Sidebar } from 'react-pro-sidebar';
import sidelogo from '../../assets/Imgs/Sidebar-logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function SideBar() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handleLogout = () => {
    localStorage.removeItem("Token"); 
    toast.info("Logged out successfully");
    navigate("/login"); 
  };

  return (
    <>
      <div className='sidebar-container'>
        <Sidebar collapsed={collapsed} className='Side-bar '>
          <Menu>
            <div className='side-logo'>
              <MenuItem 
                onClick={toggleCollapse} 
                icon={<img className='img-logo' src={sidelogo} alt="logo" />} 
              ></MenuItem>
            </div>
            
            <MenuItem
              icon={<i className="fas fa-home"></i>}
              component={<Link to={"/dashbord"} />}>
              Home
            </MenuItem>
            <MenuItem
              icon={<i className="fas fa-users"></i>}
              component={<Link to={"/dashbord/Users"} />}>
              Users
            </MenuItem>
            <MenuItem
              icon={<i className="fas fa-th-large"></i>}
              component={<Link to={"/dashbord/recpies"} />}>
              Recipes
            </MenuItem>
            <MenuItem
              icon={<i className="fas fa-calendar-alt"></i>}
              component={<Link to={"/dashbord/categories"} />}>
              Categories
            </MenuItem>
            <MenuItem
              icon={<i className="fas fa-unlock-alt"></i>}
              component={<Link to={"/dashbord/change-password"} />}>
              Change Password
            </MenuItem>
            <MenuItem 
              onClick={handleLogout} 
              className='log-out' 
              icon={<i className="fas fa-sign-out-alt"></i>}
            > 
              Log Out 
            </MenuItem>

          </Menu>
        </Sidebar>
      </div>
    </>
  );
}
