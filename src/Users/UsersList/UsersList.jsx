import React from 'react'
import Header from '../../Shared/Header/Header'
import headimg from "../../assets/Imgs/recipes-head.png"

export default function UsersList() {
  return (
    <>
      <Header 
              title={
                <>
                  Users <span style={{color:"#DFE0E0", fontWeight:"100"}}>List</span>
                  </>
              }
              desc={"You can now add your items that any user can order it from the application and you can edit."}
              img={<img src={headimg} alt="head-img" />}
            />
      
      <div className="Users-title px-3">
        <div className="container-fluid">
          <div className="d-flex justify-content-between align-items-center">
            <div className="detail my-auto">
              <h2>Users Table Details</h2>
              <p>You can check all details</p>
            </div>
            <div className="add-btn">
           
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
