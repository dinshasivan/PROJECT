import productModel from '../models/productModel.js'
import upload from '../middleware/multer.js'
import { v2 as cloudinary } from 'cloudinary';

//add product
const addProduct = async (req,res)=>{
    try{
        const {name,description,price,category,subCategory,popular}=req.body;

        const image1=req.files.image1[0]
        const image2=req.files.image2[0]
        const image3=req.files.image3[0]
        const image4=req.files.image4[0]

        const images = [image1,image2,image3,image4].filter((item)=>item !== undefined)

        let imageUrl = await Promise.all(
            images.map(async (item)=>{
                let result = await cloudinary.uploader.upload(item.path,{resource_type:"image"});

                return result.secure_url
            })
        )
        // console.log(name,description,price,category,subCategory,popular);
        // console.log(imageUrl);

        const productData = {
            name,
            description,
            price:Number(price),
            category,
            subCategory,
            popular:popular === "true" ? true : false,
            image:imageUrl
        }
        console.log(productData);

        const product = new productModel(productData)
        await product.save();

        res.json({success:true,message:"Product Added"})

    }catch(error){
        console.log(error);
        res.json({success:false,message:error.message})
        
    }
}


//view products
const getProduct = async (req,res)=>{
    try{
        const products = await productModel.find({})
        res.json({success:true,message:"product list",products})
    }catch(error){
        console.log(error);
        res.json({success:false,message:error.message})
        
    }
}


//remove products
const removeProduct = async (req,res)=>{
    try{
        await productModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"product removed"})

    }catch(error){
        console.log(error);
        res.json({success:false,message:error.message})
        
    }
}


//view single product
const singleProduct = async (req,res)=>{
    try{
        const {productId} = req.body
        const product = await productModel.findById(productId)

        res.json({success:true,product})
    }catch(error){
        console.log(error);
        res.json({success:false,message:error.message})
        
    }
}

export  {addProduct,getProduct,removeProduct,singleProduct}
