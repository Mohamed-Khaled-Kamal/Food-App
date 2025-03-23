
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Upload from '../../assets/Imgs/Upload.png';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { CATEGORIES_URLS, ImgUrl, privateAxiosInstance, RECIPES_URLS, TAGS_URLS } from '../../Services/Urls/Urls';


export default function RecpiesData() {
  const { recpieId } = useParams();
  const { register, formState: { errors },setValue, isSubmiting, handleSubmit } = useForm();
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const navigate = useNavigate()
  const [image, setImage] = useState(null);
  const [recipeImage, setRecipeImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);



  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("tagId", data.tagId || "");
      formData.append("categoriesIds", data.categoriesIds?.length ? data.categoriesIds : []);

      if (image) {
        formData.append("recipeImage", image);
      }

      let response;
      if (recpieId && recpieId !== "new-recpie") {
        
        response = await privateAxiosInstance.put(RECIPES_URLS.EDIT_RECIPE(recpieId), formData);
        toast.success("Recipe Updated Successfully");
      } else {
        
        response = await privateAxiosInstance.post(RECIPES_URLS.ADD_RECIPE, formData);
        toast.success("Recipe Created Successfully");
      }

      console.log("Response:", response);
      navigate("/dashbord/recpies");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save recipe");
    }
  };


//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//         setImage(file);
//     }
// };

{/*try this */ }
const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
    setValue("recipeImage", file);
    clearErrors("recipeImage");
  }
};

//   const handleDrop = (e) => {
//     e.preventDefault();
//     const file = e.dataTransfer.files[0];
//     if (file) {
//       setImage(file);
//     }
//   };

{/* try this */}

const handleDrop = (e) => {
  e.preventDefault();
  const file = e.dataTransfer.files[0];
  if (file) {
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
    setValue("recipeImage", file);
  }
};

const fetchImage = async (imagePath) => {
  try {
    const fileUrl = `${ImgUrl}${imagePath}`;
    const response = await fetch(fileUrl);
    const blob = await response.blob();
    const file = new File([blob], "recipeImage.jpg", { type: blob.type });
    setImagePreview(URL.createObjectURL(blob));
    setValue("recipeImage", file);
  } catch (error) {
    console.error("Error fetching image:", error);
  }
};

  const GetCategories = async () => {
        try {
          
          let response = await privateAxiosInstance.get(CATEGORIES_URLS.CATEGORIES_LIST,{params:{pageSize:1000,pageNumber:1}});
      
          setCategories(response?.data?.data);
          console.log(response?.data?.data)
          setArryOfPages(Array(response?.data?.totalNumberOfPages).fill().map((_, index) => index + 1));
          setCurrentPage(pageNumber);
        } catch (error) {
          console.log(error);
        }
    };
    
    const GetTags = async () => {
      try {
        
        let response = await privateAxiosInstance.get(TAGS_URLS.GET_TAGS,{params:{pageSize:1000,pageNumber:1}});
    
        setTags(response?.data);
        console.log(response?.data)
        setArryOfPages(Array(response?.data?.totalNumberOfPages).fill().map((_, index) => index + 1));
        setCurrentPage(pageNumber);
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    (async () => {
      await GetCategories();
      await GetTags();
     
      GetCategories();
      GetTags();
     
      if (recpieId !== "new-recpie") {
        {/*Edit Mode*/ }
        const GetRecipe = async () => {
          

          const response = await privateAxiosInstance.get(RECIPES_URLS.GET_RECIPE(recpieId));
          const recipe = response?.data
        
          setValue("name", recipe?.name);
          setValue("description", recipe?.description);
          setValue("price", recipe?.price);
          setValue("tagId", recipe?.tag?.id);
          // setValue("categoriesIds", recipe?.category?.[0].id);
          setValue("categoriesIds", recipe?.category?.map(cat => cat.id) || []);

        //  setValue("recipeImage", recipe?.recipeImage);
              if (recipe?.imagePath) {
                await fetchImage(recipe.imagePath);
              }
        }
        GetRecipe();
      }
    })();
    }, [recpieId,setValue]);
  
  return (
    <>

      <div className='dashbord px-3'>
        <div className="container-fluid">
          <div className='d-flex flex-column flex-md-row justify-content-between align-items-center dsh rounded-4 p-5'>
            <div className='dsh-title'>
              <h2>Fill the <span style={{ color: "#009247" }}>Recipes</span>!</h2>
              <p>You can now fill the meals easily using the table and form!</p>
            </div>
            <div className='btn-dsh'>
              <Link to="/dashbord/recpies" className="btn btn-success butn px-5">
                All Recipes <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-5 px-5">
  <form onSubmit={handleSubmit(onSubmit)} className="recipe-form py-3 ">
    <div className="row px-3">
      
      {/* Recipe Name */}
      <div className="col-12 mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Recipe Name"
          {...register("name", { required: "Recipe name is required" })}
        />
        {errors.name && <p className="text-danger">{errors.name.message}</p>}
      </div>

      {/* Tag */}
      <div className="col-12 mb-3">
        <select
          className="form-select"
          {...register("tagId", { required: "Tag is required" })}
        >
          <option value="">Tags</option>
          {tags?.map(({ id, name }) => (
            <option key={id} value={id}>{name}</option>
          ))}
        </select>
        {errors.tag && <p className="text-danger">{errors.tag.message}</p>}
      </div>

      {/* Price */}
      <div className="col-12 mb-3">
        <input
          type="number"
          className="form-control"
          placeholder="Price ($)"
          {...register("price", {
            required: "Price is required",
            min: { value: 1, message: "Price must be at least 1" }
          })}
        />
        {errors.price && <p className="text-danger">{errors.price.message}</p>}
      </div>

      {/* Category */}
      <div className="col-12 mb-3">
        <select
          className="form-select"
          {...register("categoriesIds", { required: "Category is required" })}
        >
          <option value="">Category</option>
          {categories?.map(({ id, name }) => (
            <option key={id} value={id}>{name}</option>
          ))}
        </select>
        {errors.category && <p className="text-danger">{errors.category.message}</p>}
      </div>

      {/* Description */}
      <div className="col-12 mb-3">
        <textarea
          className="form-control"
          placeholder="Description"
          {...register("description", { required: "Description is required" })}
        ></textarea>
        {errors.description && <p className="text-danger">{errors.description.message}</p>}
      </div>

      {/* Drag & Drop Image Upload */}
      
            <div className='col-12 mb-5 text-center drag' onDrop={handleDrop} onDragOver={(e) => e.preventDefault()} onClick={() => document.getElementById("fileInput").click()}>
            <img src={Upload} alt='' />
            <p>Drag & Drop or <span style={{ color: '#009247' }}>Choose an Image</span> to Upload</p>
            <input type='file' id='fileInput' accept='image/*' {...register("recipeImage")} onChange={handleImageUpload} hidden />
            {imagePreview && <img src={imagePreview} alt='Preview' className='mt-2' style={{ width: "175px", height: "170px", borderRadius: "20px" , margin : "10px"}} />}
          </div>

      {/* Submit Buttons */}
      <div className="col-12 d-flex justify-content-end mt-5">
        <button type="button" className="btn btn-outline-success me-3 px-4 py-2" onClick={() => navigate(-1)}>Cancel</button>
        <button disabled={isSubmiting} type="submit" className="btn btn-success px-4">
          {isSubmiting ? "Loading" : "Save"}
        </button>
      </div>

    </div>
  </form>
</div>

    </>
  );
}


/**//////////////////////////// */



/**///////////////////////////// */


/**///////////////////////// */

// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate, useParams } from 'react-router-dom';
// import Upload from '../../assets/Imgs/Upload.png';
// import { useForm } from 'react-hook-form';
// import { toast } from 'react-toastify';
// import { CATEGORIES_URLS, ImgUrl, privateAxiosInstance, RECIPES_URLS, TAGS_URLS } from '../../Services/Urls/Urls';

// export default function RecpiesData() {
//   const { recpieId } = useParams();
//   const { register, formState: { errors }, setValue, clearErrors, handleSubmit } = useForm();
//   const [categories, setCategories] = useState([]);
//   const [tags, setTags] = useState([]);
//   const navigate = useNavigate();
//   const [image, setImage] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);

//   const onSubmit = async (data) => {
//     try {
//       const formData = new FormData();
//       formData.append("name", data.name);
//       formData.append("description", data.description);
//       formData.append("price", data.price);
//       formData.append("tagId", data.tagId || "");
//       formData.append("categoriesIds", data.categoriesIds?.length ? data.categoriesIds : []);

//       if (image) {
//         formData.append("recipeImage", image);
//       }

//       let response;
//       if (recpieId && recpieId !== "new-recpie") {
//         response = await privateAxiosInstance.put(RECIPES_URLS.EDIT_RECIPE(recpieId), formData);
//         toast.success("Recipe Updated Successfully");
//       } else {
//         response = await privateAxiosInstance.post(RECIPES_URLS.ADD_RECIPE, formData);
//         toast.success("Recipe Created Successfully");
//       }

//       navigate("/dashbord/recpies");
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to save recipe");
//     }
//   };

//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setImage(file);
//       setImagePreview(URL.createObjectURL(file));
//       setValue("recipeImage", file);
//       clearErrors("recipeImage");
//     }
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     const file = e.dataTransfer.files[0];
//     if (file) {
//       setImage(file);
//       setImagePreview(URL.createObjectURL(file));
//       setValue("recipeImage", file);
//     }
//   };

//   const fetchImage = async (imagePath) => {
//     try {
//       const fileUrl = `${ImgUrl}${imagePath}`;
//       const response = await fetch(fileUrl);
//       const blob = await response.blob();
//       const file = new File([blob], "recipeImage.jpg", { type: blob.type });
//       setImagePreview(URL.createObjectURL(blob));
//       setValue("recipeImage", file);
//     } catch (error) {
//       console.error("Error fetching image:", error);
//     }
//   };

//   useEffect(() => {
//     (async () => {
//       try {
//         const categoriesResponse = await privateAxiosInstance.get(CATEGORIES_URLS.CATEGORIES_LIST, { params: { pageSize: 1000, pageNumber: 1 } });
//         setCategories(categoriesResponse?.data?.data);

//         const tagsResponse = await privateAxiosInstance.get(TAGS_URLS.GET_TAGS, { params: { pageSize: 1000, pageNumber: 1 } });
//         setTags(tagsResponse?.data);

//         if (recpieId !== "new-recpie") {
//           const response = await privateAxiosInstance.get(RECIPES_URLS.GET_RECIPE(recpieId));
//           const recipe = response?.data;
//           setValue("name", recipe?.name);
//           setValue("description", recipe?.description);
//           setValue("price", recipe?.price);
//           setValue("tagId", recipe?.tag?.id);
//           setValue("categoriesIds", recipe?.category?.map(cat => cat.id) || []);
//           if (recipe?.imagePath) {
//             await fetchImage(recipe.imagePath);
//           }
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     })();
//   }, [recpieId, setValue]);

//   return (
//     <div className='container mt-5 px-5'>
//       <form onSubmit={handleSubmit(onSubmit)} className='recipe-form py-3'>
//         <div className='row px-3'>
//           <div className='col-12 mb-3'>
//             <input type='text' className='form-control' placeholder='Recipe Name' {...register("name", { required: "Recipe name is required" })} />
//             {errors.name && <p className='text-danger'>{errors.name.message}</p>}
//           </div>
//           <div className='col-12 mb-3'>
//             <select className='form-select' {...register("tagId", { required: "Tag is required" })}>
//               <option value=''>Tags</option>
//               {tags?.map(({ id, name }) => <option key={id} value={id}>{name}</option>)}
//             </select>
//           </div>
//           <div className='col-12 mb-3'>
//             <textarea className='form-control' placeholder='Description' {...register("description", { required: "Description is required" })}></textarea>
//           </div>
//           <div className='col-12 mb-5 text-center drag' onDrop={handleDrop} onDragOver={(e) => e.preventDefault()} onClick={() => document.getElementById("fileInput").click()}>
//             <img src={Upload} alt='' />
//             <p>Drag & Drop or <span style={{ color: '#009247' }}>Choose an Image</span> to Upload</p>
//             <input type='file' id='fileInput' accept='image/*' {...register("recipeImage")} onChange={handleImageUpload} hidden />
//             {imagePreview && <img src={imagePreview} alt='Preview' className='mt-2' style={{ width: "100px", height: "100px", borderRadius: "5px" }} />}
//           </div>
//           <div className='col-12 d-flex justify-content-end mt-5'>
//             <button type='button' className='btn btn-outline-success me-3 px-4 py-2' onClick={() => navigate(-1)}>Cancel</button>
//             <button type='submit' className='btn btn-success px-4'>Save</button>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// }

