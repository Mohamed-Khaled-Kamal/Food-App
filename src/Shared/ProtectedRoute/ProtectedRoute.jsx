import React from 'react'
import { Navigate } from 'react-router-dom'
import Login from '../../Auth Module/Login/Login'


export default function ProtectedRoute({ loginData, children }) {
    
    const authToken = localStorage.getItem("Token");

    if (!authToken) {
        return <Navigate to="/"  />;
    }

    return children;
   }