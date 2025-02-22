import React from 'react'
import Header from '../../Shared/Header/Header'
import headimg from '../../assets/Imgs/recipes-head.png'


export default function CategoriesList() {
  return (
    <>
       <Header title={"Categories Items"}
              desc={"You can now add your items that any user can order it from the Application and you can edit"}
              img={<img src={headimg} alt="head-img" />}
            />
      CategoriesList
    </>
  )
}
