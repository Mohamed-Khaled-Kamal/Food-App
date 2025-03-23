import { useEffect, useState } from 'react'
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
import RecpiesForm from './RecpiesForm/RecpiesForm'
import { jwtDecode } from 'jwt-decode'
import Favorites from './Favorites/Favorites'
import AdminProtectedRoute from './Shared/AdminProtectedRoute/AdminProtectedRoute'
import UserProtectedRoute from './Shared/UserProtectedRoute/UserProtectedRoute'
// import Profile from './Profile/Profile'



function App() {

// const [loginData,setLoginData]=useState(null)
// let saveLoginData=()=>{
//   let decodedToken=localStorage.getItem('Token')
//   let encodedToken=jwtDecode(decodedToken)
//   setLoginData(encodedToken)
// }

// useEffect(() => {
//   saveLoginData();
// }, []);
  
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
      element: <ProtectedRoute><MasterLayout  /></ProtectedRoute>  ,
        
      errorElement:<NotFound/>,
      children:[
        { index: true, element: <Dashbord  /> },
        { path: 'recpies', element: <RecpiesList/> },
        {
          path: 'recpies/new-recpie', element: (
            <AdminProtectedRoute>
              {""}
            <RecpiesData />
            </AdminProtectedRoute>)
        },
        {
          path: 'recpies/:recpieId', element: (
            <AdminProtectedRoute>
              {""}
            <RecpiesData />
            </AdminProtectedRoute>)
        },
        { path: 'recpies-form', element: <RecpiesForm /> },
        {
          path: 'categories', element: (
            <AdminProtectedRoute>
              {""}
              <CategoriesList />
              </AdminProtectedRoute>)
        },
        {
          path: 'category', element: (
            <AdminProtectedRoute>
              {""}
            <CategoriesData />
            </AdminProtectedRoute>)
        },
        {
          path: 'Users', element: (
            <AdminProtectedRoute>
              {""}
            <UsersList />
            </AdminProtectedRoute>)
        },
        {
          path: 'favourites', element: (
            <UserProtectedRoute>
              {""}
            <Favorites />
            </UserProtectedRoute>)
        },
        
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


