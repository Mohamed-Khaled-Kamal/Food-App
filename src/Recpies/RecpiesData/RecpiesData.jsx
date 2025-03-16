
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Upload from '../../assets/Imgs/Upload.png';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { CATEGORIES_URLS, privateAxiosInstance, RECIPES_URLS, TAGS_URLS } from '../../Services/Urls/Urls';

export default function RecpiesData() {
  const { recpieId } = useParams();
  
  const { register, formState: { errors },setValue, isSubmiting, handleSubmit } = useForm();

  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  const navigate = useNavigate()

  const [image, setImage] = useState(null);

  // const onSubmit = async (data) => {
  //   try {
  //     const formData = new FormData();
  //     // Object.keys(data).forEach(key => {
  //     //   formData.append(key, data[key]);
  //     // });
  //     // if (image) {
  //     //   formData.append("image", image);
  //     // }

  //     formData.append("name", data.name)
  //     formData.append("description", data.description )
  //     formData.append("price", data.price)
  //     formData.append("tagId", data.tagId)
  //     // formData.append("recipeImage", data.recipeImage[0])
  //     formData.append("categoriesIds", data.categoriesIds)
  //     if (image) {
  //       formData.append("recipeImage", image);
  //   }

  //     let response = await privateAxiosInstance.post(RECIPES_URLS.ADD_RECIPE, formData);
  //     console.log(response);

  //     toast.success("Recipe Created Successfully");
  //     navigate("/dashbord/recpies")
  //   } catch (error) {
  //     console.error(error);
  //     toast.error("Failed to create recipe");
  //   }
  // };

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


  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
        setImage(file);
    }
};

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setImage(file);
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

          setValue("recipeImage", recipe?.recipeImage);
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

      <div className="mx-5 mt-5 p-5">
        <form onSubmit={handleSubmit(onSubmit)} className='recipe-form py-3'>
          <div className="inputs-container px-5">

            {/* Recipe Name */}
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Recipe Name"
                {...register("name", { required: "Recipe name is required" })}
              />
              {errors.name && <p className="text-danger">{errors.name.message}</p>}
            </div>

            {/* Tag */}
            <div className="mb-3">
              <select
                className="form-select"
                {...register("tagId", { required: "Tag is required" })}
                >
                <option value="">Tags</option>
            {tags?.map(({id,name}) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
              </select>
              {errors.tag && <p className="text-danger">{errors.tag.message}</p>}
            </div>

            {/* Price */}
            <div className="mb-3">
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
            <div className="mb-3">
             
              <select
                className="form-select"
                {...register("categoriesIds", { required: "Category is required" })}
                >
    <option value="">Category</option>
    {categories?.map(({id,name}) => (
      <option key={id} value={id}>
      {name}
      </option>
    ))}
  </select>
              {errors.category && <p className="text-danger">{errors.category.message}</p>}
            </div>

            {/* Description */}
            <div className="mb-3">
              <textarea
                className="form-control"
                placeholder="Description"
                {...register("description", { required: "Description is required" })}
              ></textarea>
              {errors.description && <p className="text-danger">{errors.description.message}</p>}
            </div>

            {/* Drag & Drop Image Upload */}
            <div
              className="mb-5 px-3 text-center drag"
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => document.getElementById("fileInput").click()}
            >
              <img src={Upload} alt="" />
              <p>Drag & Drop or <span style={{ color: '#009247' }}>Choose an Image</span> to Upload</p>
              <input type="file" id="fileInput" accept="image/*" {...register("recipeImage")} onChange={handleImageUpload} hidden />
              {image && <img src={URL.createObjectURL(image)} alt="Preview" className="mt-2" style={{ width: "100px", height: "100px", borderRadius: "5px" }} />}
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-5 d-flex justify-content-end">
            <button type="button" className="btn btn-outline-success me-5 px-5 py-2" onClick={() => navigate(-1)}>Cancel</button>
            <button disabled={isSubmiting} type="submit" className="btn btn-success px-4">
              {isSubmiting ? "Loading" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

