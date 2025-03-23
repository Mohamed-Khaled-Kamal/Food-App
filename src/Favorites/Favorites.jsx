// import React, { useEffect, useState } from 'react'
// import Header from '../Shared/Header/Header'
// import headimg from "../assets/Imgs/recipes-head.png"
// import { FAVS_URLS, ImgUrl, privateAxiosInstance } from '../Services/Urls/Urls';
// import NoData from '../Shared/NoData/NoData.jsx';
// import NoImg from '../assets/Imgs/noImg.png'
// import DeleteConfirmation from '../Shared/DeleteConfirmation/DeleteConfirmation.jsx';
// import deleteimg from '../assets/Imgs/Delete-recipe.png'

// export default function Favorites() {
//   const [favRecipesList, setFavRecipesList] = useState([]);
  
  


//   const GetFavRecipes = async () => {
//       try {
        
//         const response = await privateAxiosInstance.get(FAVS_URLS.GET_FAVS);
//         console.log(response?.data?.data)
//         setFavRecipesList(response?.data?.data);
  
//       } catch (error) {
//         console.error("Error Fetching Favourites Recipes:", error);
//       }
//   };
  
//   const DeleteFavRecipes = async (id) => {
//     try {
//       const response = await privateAxiosInstance.delete(FAVS_URLS.DELETE_FAVS(id));
//       console.log(response)
//       GetFavRecipes()

//     } catch (error) {
//       console.log(error)
//     }
//   }
  

//   useEffect(() => {
//       GetFavRecipes();
//       console.log("Favorite Recipes:", favRecipesList);
//     }, []);
  
//   return (
//       <>
//           <Header
//                   title={<>
//                     Favourites <span style={{ color: "#DFE0E0", fontWeight: "100" }}>Items</span>
//                   </>}
//                   desc={"You can now add your items that any user can order it from the application and you can edit."}
//                   img={<img src={headimg} alt="head-img" />}
//                 />
      
//       <div className="container-fluid">

        
// {favRecipesList.length > 0 ? (
//   <div className="row justify-content-evenly gap-1">
//     {favRecipesList.map((item) => (
//       <div className="card col-md-3 p-0 m-3" key={item.id}>
        
        
//         <img
//   src={item.recipe.imagePath ? `${ImgUrl}${item.recipe.imagePath}` : NoImg}
//   className="card-img-top"
//   alt={item.recipe.name || "No Image Available"}
// />

//         <div className="card-body">
//           <h4>Name : {item.recipe?.name}</h4>
//           <h4>Id : {item.recipe?.id}</h4>
//           <h4>Tag : {item.recipe?.tag.name}</h4>
//           <h4>Description : {item.recipe?.description}</h4>
//           <h4>Price : {item.recipe?.price} $</h4>
//         </div>
//         <div className='p-2'>
//           <button className='btn btn-outline-danger w-100'
//             onClick={() => DeleteFavRecipes(item.id)}
//           >Delete</button>
//         </div>
//       </div>
//     ))}
//   </div>
// ) : (
//   <NoData />
// )}

//       </div>
     
//     </>
//   )
// }


/**////////////////// */

// import React, { useEffect, useState } from 'react'
// import Header from '../Shared/Header/Header'
// import headimg from "../assets/Imgs/recipes-head.png"
// import { FAVS_URLS, ImgUrl, privateAxiosInstance } from '../Services/Urls/Urls';
// import NoData from '../Shared/NoData/NoData.jsx';
// import NoImg from '../assets/Imgs/noImg.png'
// import DeleteConfirmation from '../Shared/DeleteConfirmation/DeleteConfirmation.jsx';
// import deleteimg from '../assets/Imgs/Delete-recipe.png'
// import { toast } from 'react-toastify';

// export default function Favorites() {
//   const [favRecipesList, setFavRecipesList] = useState([]);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [selectedRecipeId, setSelectedRecipeId] = useState(null);

//   const GetFavRecipes = async () => {
//     try {
//       const response = await privateAxiosInstance.get(FAVS_URLS.GET_FAVS);
//       console.log(response?.data?.data);
//       setFavRecipesList(response?.data?.data);
//     } catch (error) {
//       console.error("Error Fetching Favourites Recipes:", error);
//     }
//   };

//   const DeleteFavRecipes = async () => {
//     if (!selectedRecipeId) return;
//     try {
//       await privateAxiosInstance.delete(FAVS_URLS.DELETE_FAVS(selectedRecipeId));
//       setShowDeleteModal(false);
//       GetFavRecipes()
//       toast.success("Favourite deleted successfully");
//     } catch (error) {
//       console.error("Error deleting recipe:", error);
//     }
//   };

//   useEffect(() => {
//     GetFavRecipes();
//   }, []);

//   return (
//     <>
//       <Header
//         title={<>Favourites <span style={{ color: "#DFE0E0", fontWeight: "100" }}>Items</span></>}
//         desc={"You can now add your items that any user can order it from the application and you can edit."}
//         img={<img src={headimg} alt="head-img" />}
//       />

//       <div className="container-fluid">
//         {favRecipesList.length > 0 ? (
//           <div className="row justify-content-evenly gap-1">
//             {favRecipesList.map((item) => (
//               <div className="card col-md-3 p-0 m-3" key={item.id}>
//                 <img
//                   src={item.recipe.imagePath ? `${ImgUrl}${item.recipe.imagePath}` : NoImg}
//                   className="card-img-top"
//                   alt={item.recipe.name || "No Image Available"}
//                 />
//                 <div className="card-body">
//                   <h4>Name : {item.recipe?.name}</h4>
//                   <h4>Id : {item.recipe?.id}</h4>
//                   <h4>Tag : {item.recipe?.tag.name}</h4>
//                   <h4>Description : {item.recipe?.description}</h4>
//                   <h4>Price : {item.recipe?.price} $</h4>
//                 </div>
//                 <div className='p-2'>
//                   <button className='btn btn-outline-danger w-100'
//                     onClick={() => {
//                       setSelectedRecipeId(item.id);
//                       setShowDeleteModal(true);
//                     }}
//                   >Delete</button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <NoData />
//         )}
//       </div>

//       {/* Modal for Delete Confirmation */}
//       <DeleteConfirmation
//         show={showDeleteModal}
//         handleClose={() => setShowDeleteModal(false)}
//         handleDeleteConfirm={DeleteFavRecipes}
//         btnName="Delete"
//         img={deleteimg}
//       />
//     </>
//   );
// }


/**///////////////// */

import React, { useEffect, useState } from "react";
import Header from "../Shared/Header/Header";
import headimg from "../assets/Imgs/recipes-head.png";
import { FAVS_URLS, ImgUrl, privateAxiosInstance } from "../Services/Urls/Urls";
import NoData from "../Shared/NoData/NoData.jsx";
import NoImg from "../assets/Imgs/noImg.png";
import DeleteConfirmation from "../Shared/DeleteConfirmation/DeleteConfirmation.jsx";
import deleteimg from "../assets/Imgs/Delete-recipe.png";
import { toast } from "react-toastify";
import Preloader from "../Shared/Preloader/Preloader.jsx"; // ✅ إضافة الـ Preloader

export default function Favorites() {
  const [favRecipesList, setFavRecipesList] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ حالة التحميل

  const GetFavRecipes = async () => {
    try {
      setLoading(true); // ✅ تفعيل التحميل
      const response = await privateAxiosInstance.get(FAVS_URLS.GET_FAVS);
      setFavRecipesList(response?.data?.data || []);
    } catch (error) {
      console.error("Error Fetching Favourite Recipes:", error);
    } finally {
      setLoading(false); // ✅ إنهاء التحميل
    }
  };

  const DeleteFavRecipes = async () => {
    if (!selectedRecipeId) return;
    try {
      await privateAxiosInstance.delete(FAVS_URLS.DELETE_FAVS(selectedRecipeId));
      setShowDeleteModal(false);
      toast.success("Favourite deleted successfully");
      GetFavRecipes(); // ✅ تحديث القائمة بعد الحذف
    } catch (error) {
      console.error("Error deleting recipe:", error);
      toast.error("Failed to delete favourite.");
    }
  };

  useEffect(() => {
    GetFavRecipes();
  }, []);

  return (
    <>
      <Header
        title={
          <>
            Favourites <span style={{ color: "#DFE0E0", fontWeight: "100" }}>Items</span>
          </>
        }
        desc={
          "You can now add your items that any user can order it from the application and you can edit."
        }
        img={<img src={headimg} alt="head-img" />}
      />

      <div className="container-fluid">
        {loading ? (
          <Preloader /> 
        ) : favRecipesList.length > 0 ? (
          <div className="row justify-content-evenly gap-1 m-1">
            {favRecipesList.map((item) => (
              <div className="card col-md-3 p-0 mb-2" key={item.id}>
                <img
                  src={item.recipe.imagePath ? `${ImgUrl}${item.recipe.imagePath}` : NoImg}
                  className="card-img-top"
                  alt={item.recipe.name || "No Image Available"}
                  style={{height:"250px"}}
                />
                <div className="card-body">
                  <h4>Name : <span style={{fontWeight:"normal"}}>{item.recipe?.name}</span></h4>
                  {/* <h4>Id : <span style={{fontWeight: "normal"}}>{item.recipe?.id}</span></h4> */}
                  {/* <h4>Tag : <span style={{fontWeight:"normal"}}>{item.recipe?.tag?.name}</span></h4> */}
                  <h4>Description : <span style={{fontWeight:"normal"}}>{item.recipe?.description}</span></h4>
                  {/* <h4>Price : <span style={{fontWeight:"normal"}}>{item.recipe?.price} $</span> </h4> */}
                </div>
                <div className="p-2">
                  <button
                    className="btn btn-outline-danger w-100"
                    onClick={() => {
                      setSelectedRecipeId(item.id);
                      setShowDeleteModal(true);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <NoData />
        )}
      </div>

      {/* ✅ نافذة التأكيد للحذف */}
      <DeleteConfirmation
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        handleDeleteConfirm={DeleteFavRecipes}
        btnName="Delete"
        img={deleteimg}
      />
    </>
  );
}
