// import React from "react";
// import { Navigate } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";

// export default function AdminProtectedRoute({ children }) {
//   const authToken = localStorage.getItem("Token");

//   if (!authToken) {
//     return <Navigate to="/" />;
//   }

//   try {
//     const decodedToken = jwtDecode(authToken);
//     if (decodedToken?.userGroup != "SystemUser") {
//       return children;
//     } else {
//         return <Navigate to='/dashbord'/>
//     }
//   }

  
// }


/**///////////////// */
import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function AdminProtectedRoute({ children }) {
  const authToken = localStorage.getItem("Token");

  if (!authToken) {
    return <Navigate to="/" />;
  }

  try {
    const decodedToken = jwtDecode(authToken);

    
    if (decodedToken?.userGroup !== "SystemUser") {
      return children;
    } else {
      return <Navigate to="/dashbord" />;
    }
  } catch (error) {
    console.error("Invalid token:", error);
    return <Navigate to="/" />;
  }
}

