// import React, { useState } from 'react';
// import { Menu, MenuItem, Sidebar } from 'react-pro-sidebar';
// import sidelogo from '../../assets/Imgs/Sidebar-logo.png';
// import { Link, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

// export default function SideBar() {
//   const [collapsed, setCollapsed] = useState(false);
//   const navigate = useNavigate();

//   const toggleCollapse = () => {
//     setCollapsed(!collapsed);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("Token");
//     toast.info("Logged out successfully");
//     navigate("/login");
//   };

//   return (
//     <>
//       <div className='sidebar-container'>
//         <Sidebar collapsed={collapsed} className='Side-bar '>
//           <Menu>
//             <div className='side-logo'>
//               <MenuItem
//                 onClick={toggleCollapse}
//                 icon={<img className='img-logo' src={sidelogo} alt="logo" />}
//               ></MenuItem>
//             </div>
            
//             <MenuItem
//               icon={<i className="fas fa-home"></i>}
//               component={<Link to={"/dashbord"} />}>
//               Home
//             </MenuItem>
//             <MenuItem
//               icon={<i className="fas fa-users"></i>}
//               component={<Link to={"/dashbord/Users"} />}>
//               Users
//             </MenuItem>
//             <MenuItem
//               icon={<i className="fas fa-th-large"></i>}
//               component={<Link to={"/dashbord/recpies"} />}>
//               Recipes
//             </MenuItem>
//             <MenuItem
//               icon={<i className="fas fa-calendar-alt"></i>}
//               component={<Link to={"/dashbord/categories"} />}>
//               Categories
//             </MenuItem>
//             <MenuItem
//               icon={<i className="fas fa-unlock-alt"></i>}
//               component={<Link to={"/dashbord/change-password"} />}>
//               Change Password
//             </MenuItem>
//             <MenuItem
//               onClick={handleLogout}
//               className='log-out'
//               icon={<i className="fas fa-sign-out-alt"></i>}
//             >
//               Log Out
//             </MenuItem>

//           </Menu>
//         </Sidebar>
//       </div>
//     </>
//   );
// }


/**/////////////////////////////////////// */

import React, { useState } from 'react';
import { Menu, MenuItem, Sidebar } from 'react-pro-sidebar';
import sidelogo from '../../assets/Imgs/Sidebar-logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Modal, Button } from 'react-bootstrap';
import Logout from '../../assets/Imgs/Logout.png'

export default function SideBar() {
  const [collapsed, setCollapsed] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false); // حالة المودال
  const navigate = useNavigate();

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handleLogout = () => {
    localStorage.removeItem("Token");
    toast.info("Logged out successfully");
    navigate("/");
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
              onClick={() => setShowLogoutModal(true)} // فتح المودال عند النقر
              className='log-out' 
              icon={<i className="fas fa-sign-out-alt"></i>}
            > 
              Log Out 
            </MenuItem>

          </Menu>
        </Sidebar>
      </div>

      {/* Logout Confirmation Modal */}


<Modal
  show={showLogoutModal}
  onHide={() => setShowLogoutModal(false)}
  centered
>
  {/* أيقونة الإغلاق في الزاوية العلوية */}
  <div className="d-flex justify-content-end p-2">
    <i 
      onClick={() => setShowLogoutModal(false)} 
      style={{ cursor: "pointer" }} 
      className="far fa-times-circle text-danger fs-3"
    ></i>
  </div>

  {/* صورة أو أيقونة التحذير */}
  <Modal.Body>
    <div className="d-flex justify-content-center align-items-center">
      <img src={Logout} alt="logout confirmation" />
    </div>
  </Modal.Body>

  {/* الأزرار في الفوتر */}
  <Modal.Footer>
    <button 
      type="button" 
      className="btn btn-outline-danger" 
      onClick={handleLogout}
    >
      Log Out
    </button>
  </Modal.Footer>
</Modal>

    </>
  );
}
