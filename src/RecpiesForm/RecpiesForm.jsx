import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Upload from '../assets/Imgs/Upload.png'

export default function RecpiesForm() {
  
    const [formData, setFormData] = useState({
      name: "",
      tag: "",
      price: "",
      category: "",
      description: "",
      image: null,
    });
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <> 
      Form Test
          <div>
          <div className='dashbord px-3'>
        <div className="container-fluid">
          <div className=' d-flex flex-column flex-md-row justify-content-between align-items-center dsh rounded-4 p-5'>
            <div className='dsh-title'>
              <h2>Fill the <span style={{color:"#009247"}}>Recipes</span> !</h2>
              <p>you can now fill the meals easily using the table and form , click here and sill it with the table !</p>
            </div>
            <div className='btn-dsh'>
  <Link to="recpies-form" className="btn btn-success butn px-5">
    Fill Recipes <i className="fa-solid fa-arrow-right"></i>
  </Link>
</div>
          </div>
        </div>
        </div>

        <div className="mx-5 mt-5 px-5">
  <form onSubmit={handleSubmit} className='recipe-form py-3'>
    {/* Recipe Name */}
    <div className="mb-3">
      <input 
        type="text" 
        name="name" 
        className="form-control" 
        placeholder="Recipe Name" 
        value={formData.name} 
        onChange={handleChange} 
        required 
      />
    </div>

    {/* Tag */}
    <div className="mb-3">
      <input 
        type="text" 
        name="tag" 
        className="form-control" 
        placeholder="Tag" 
        value={formData.tag} 
        onChange={handleChange} 
        required 
      />
    </div>

    {/* Price */}
    <div className="mb-3">
      <input 
        type="number" 
        name="price" 
        className="form-control" 
        placeholder="Price ($)" 
        value={formData.price} 
        onChange={handleChange} 
        required 
      />
    </div>

    {/* Category */}
    <div className="mb-3">
      <select 
        name="category" 
        className="form-control" 
        value={formData.category} 
        onChange={handleChange} 
        required
      >
        <option value="">Select Category</option>
        <option value="breakfast">Breakfast</option>
        <option value="lunch">Lunch</option>
        <option value="dinner">Dinner</option>
        <option value="dessert">Dessert</option>
      </select>
    </div>

    {/* Description */}
    <div className="mb-3">
      <textarea 
        name="description " 
        className="form-control" 
        placeholder="Description" 
        value={formData.description} 
        onChange={handleChange} 
        required 
      ></textarea>
    </div>

    {/* Drag & Drop Image Upload */}
    <div 
      className="mb-5   text-center drag"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      onClick={() => document.getElementById("fileInput").click()}
            >
              <img src={Upload} alt="" />
      <p>Drag & Drop or <span style={{color:'#009247'}}>Choose a Item Image</span> to Upload</p>
      <input type="file" id="fileInput" accept="image/*" onChange={handleImageUpload} hidden />
      {formData.image && <img src={URL.createObjectURL(formData.image)} alt="Preview" className="mt-2" style={{ width: "100px", height: "100px", borderRadius: "5px" }} />}
    </div>

    {/* Submit Button */}
    <div className="mt-5 d-flex justify-content-end">
  <button type="button" className="btn btn-outline-success me-5 w-25 py-2">Cancel</button>
  <button type="submit" className="btn btn-success px-4">Save</button>
</div>

  </form>
</div>


      </div>
    </>
  )
}
