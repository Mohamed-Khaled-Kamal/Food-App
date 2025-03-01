import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthLayout from './Shared/AuthLayout/AuthLayout'
import Login from './Auth Module/Login/Login'
import Register from './Auth Module/Register/Register'
import ForgetPass from './Auth Module/Forget Pass/ForgetPass'
import ResetPass from './Auth Module/Reset Pass/ResetPass'
import ChangePass from './Auth Module/Change Pass/ChangePass'
import VrefiyAccount from './Auth Module/Vrefiy Account/VrefiyAccount'
import NotFound from './Shared/NotFound/NotFound'
import MasterLayout from './Shared/MasterLayout/MasterLayout'
import Dashbord from './Dashbord/Dashbord'
import RecpiesList from './Recpies/RecpiesList/RecpiesList'
import RecpiesData from './Recpies/RecpiesData/RecpiesData'
import CategoriesList from './Categories/CategoriesList/CategoriesList'
import CategoriesData from './Categories/CategoriesData/CategoriesData'
import UsersList from './Users/UsersList/UsersList'
import { ToastContainer } from 'react-toastify'
import ProtectedRoute from './Shared/ProtectedRoute/ProtectedRoute'


function App() {
  
  const Routes = createBrowserRouter([
    {
      path: '/',
      element: <AuthLayout />,
      errorElement:<NotFound/>,
      children:[
        { index: true, element: <Login /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register/> },
        { path: 'forget-password', element: <ForgetPass/> },
        { path: 'reset-password', element: <ResetPass/> },
        { path: 'vrefiy-account', element: <VrefiyAccount/> },
      ]
    },
    {
      path: '/dashbord',
      element:<ProtectedRoute><MasterLayout /></ProtectedRoute>  ,
        
      errorElement:<NotFound/>,
      children:[
        { index: true, element: <Dashbord /> },
        { path: 'recpies', element: <RecpiesList/> },
        { path: 'recpies-data', element: <RecpiesData/> },
        { path: 'categories', element: <CategoriesList/> },
        { path: 'category', element: <CategoriesData/> },
        { path: 'Users', element: <UsersList /> },
        // { path: 'change-password', element: <ChangePass/> }
      ]
    }
  ])

  return (
    <>
      <ToastContainer/>
      <RouterProvider router={Routes}></RouterProvider>
    </>
  )
}

export default App
