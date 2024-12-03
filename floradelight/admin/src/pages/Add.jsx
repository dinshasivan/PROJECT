import React, { useState } from 'react';
import upload_icon from '../assets/upload.png';
import axiox from 'axios'
import {toast} from 'react-toastify'


const Add = ({token}) => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Pick Their Fav Flowers');
  const [subCategory, setSubCategory] = useState('Personalised Gifts');
  const [popular, setPopular] = useState(false);

  const onsubmitHandler = async (e)=>{
    e.preventDefault()
    try{
      const formData =new FormData()

      formData.append("name",name)
      formData.append("description",description)
      formData.append("price",price)
      formData.append("category",category)
      formData.append("subCategory",subCategory)
      formData.append("popular",popular)

      image1 && formData.append("image1",image1)
      image2 && formData.append("image2",image2)
      image3 && formData.append("image3",image3)
      image4 && formData.append("image4",image4)

      const response = await axiox.post('http://localhost:4000/api/product/add-product',
        formData,{headers : {token} })

        if(response.data.success){
          toast.success(response.data.message)
            setName("")
            setDescription("")
            setImage1("")
            setImage2("")
            setImage3("")
            setImage4("")
            setPrice('')
        } 
        else{
          toast.error(response.data.message)
        }

        console.log(response.data);
        
     
    }catch(error){
      console.log(error);
      toast.error(error.message)
      
    }
    // console.log();
    
  }

  return (
    <form onSubmit={onsubmitHandler} className="p-4">
      <div>
        <h3 className="text-lg font-semibold mb-3">Upload Image</h3>
        <div className="flex gap-4 mb-4">
          <label htmlFor="image1" className="relative cursor-pointer">
            <img
              src={image1 ? URL.createObjectURL(image1) : upload_icon}
              alt="Upload Icon"
              className="w-16 h-16 aspect-square object-cover ring-1 ring-slate-900/5 rounded-lg"
            />
            <input
              onChange={(e) => setImage1(e.target.files[0])}
              type="file"
              name="image"
              id="image1"
              className="hidden"
            />
          </label>
          <label htmlFor="image2" className="relative cursor-pointer">
            <img
              src={image2 ? URL.createObjectURL(image2) : upload_icon}
              alt="Upload Icon"
              className="w-16 h-16 aspect-square object-cover ring-1 ring-slate-900/5 rounded-lg"
            />
            <input
              onChange={(e) => setImage2(e.target.files[0])}
              type="file"
              name="image"
              id="image2"
              className="hidden"
            />
          </label>
          <label htmlFor="image3" className="relative cursor-pointer">
            <img
              src={image3 ? URL.createObjectURL(image3) : upload_icon}
              alt="Upload Icon"
              className="w-16 h-16 aspect-square object-cover ring-1 ring-slate-900/5 rounded-lg"
            />
            <input
              onChange={(e) => setImage3(e.target.files[0])}
              type="file"
              name="image"
              id="image3"
              className="hidden"
            />
          </label>
          <label htmlFor="image4" className="relative cursor-pointer">
            <img
              src={image4 ? URL.createObjectURL(image4) : upload_icon}
              alt="Upload Icon"
              className="w-16 h-16 aspect-square object-cover ring-1 ring-slate-900/5 rounded-lg"
            />
            <input
              onChange={(e) => setImage4(e.target.files[0])}
              type="file"
              name="image"
              id="image4"
              className="hidden"
            />
          </label>
        </div>
        <div className="mb-4">
          <h5>Product Name</h5>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Product Name"
            className="px-3 py-1.5 ring-1 ring-slate-900/10 rounded bg-white mt-1 w-[333px] sm:w-full"
          />
        </div>
        <div className="mb-4">
          <h5>Category</h5>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="max-w-full px-3 py-2 text-gray-30 ring-1 ring-slate-900/5 bg-white rounded"
          >
            <option value="Anniversary Gifts">Anniversary Gifts</option>
            <option value="Pick Their Fav Flowers">Pick Their Fav Flowers</option>
            <option value="Same Day Delights">Same Day Delights</option>
            <option value="Spiritual Gifts">Spiritual Gifts</option>
          </select>
        </div>
        <div className="mb-4">
          <h5>Sub Category</h5>
          <select
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            className="max-w-full px-3 py-2 text-gray-30 ring-1 ring-slate-900/5 bg-white rounded"
          >
            <option value="Bridal Flowers">Bridal Flowers</option>
            <option value="Personalised Flowers">Personalised Flowers</option>
            <option value="Personalised Gifts">Personalised Gifts</option>
          </select>
        </div>
        <div className="mb-4">
          <h5>Product Description</h5>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            placeholder="Enter product description"
            className="w-full px-3 py-2 ring-1 ring-slate-900/10 rounded bg-white mt-1"
          ></textarea>
        </div>
        <div className="mb-4">
          <h5>Price</h5>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            type="number"
            placeholder="Enter price"
            className="px-3 py-1.5 ring-1 ring-slate-900/10 rounded bg-white mt-1 w-[333px] sm:w-full"
          />
        </div>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="popular"
            checked={popular}
            onChange={() => setPopular(prev=>!prev)}
          />
          <label htmlFor="popular" className="cursor-pointer ml-2">
            Add to popular
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add Product
        </button>
      </div>
    </form>
  );
};

export default Add;
