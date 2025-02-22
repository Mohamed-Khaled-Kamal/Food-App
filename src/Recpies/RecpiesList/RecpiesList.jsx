import React from 'react'
import Header from '../../Shared/Header/Header'
import headimg from '../../assets/Imgs/recipes-head.png'

export default function RecpiesList() {
  return (
    <>
      <Header title={"Recipes Items"}
        desc={"You can now add your items that any users can order it form Applcation and you can edit"}
        img={<img src={headimg} alt="head-img" />}
      />
      RecpiesList
    </>
  )
}
