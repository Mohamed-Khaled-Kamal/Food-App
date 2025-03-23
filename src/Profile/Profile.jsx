// import React, { useEffect, useState } from 'react';
// import { ImgUrl } from '../Services/Urls/Urls';

// export default function Profile() {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//       const storedUser = localStorage.getItem("userData");
//       console.log(JSON.parse(localStorage.getItem("userData")));
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   if (!user) {
//     return <h2>Loading...</h2>;
//   }

//   return (
//     <div className="container mt-5">
//       <h2>Profile Information</h2>
//       <div className="card p-3">
//         <img 
//           src={user.profileImage ? `${ImgUrl}${user.profileImage}` : "default-avatar.png"} 
//           alt="Profile"
//           className="rounded-circle"
//           width="150"
//         />
//         <p><strong>Username:</strong> {user.userName}</p>
//         <p><strong>Email:</strong> {user.email}</p>
//         <p><strong>Country:</strong> {user.country}</p>
//         <p><strong>Phone:</strong> {user.phoneNumber}</p>
//       </div>
//     </div>
//   );
// }
