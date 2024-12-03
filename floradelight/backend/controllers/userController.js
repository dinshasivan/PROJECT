import userModel from '../models/userModel.js'
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const createtoken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET_KEY )
}

// user login route
const loginUser = async (req,res)=>{
    try{

        const {email,password}=req.body;

        const user = await userModel.findOne({email})

        if(!user){
            return res.json({success:false,message:"User doesn't exist"})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(isMatch){
            const token = createtoken(user._id)

            res.json({success:true,message:"User login successfully", token})
        }else{
            res.json({success:false,message:"invalid credentials"})
        }
    }catch(error){
        console.log(error);
        res.json({success:false,message:error.message})
        
    }
}

//user register route
const registerUser = async(req,res)=>{
    try{
        const {name, email, password}=req.body;

        const exists = await userModel.findOne({email})
        if(exists){
            return res.json({success:false,message:"user already exists"})
        }
        if(!validator.isEmail){
            return res.json({success:false,message:"Enter a valid email"})

        }

        // if(password.length<8){
        //     return res.json({success:false,message:"Enter a strong password"})

        // }

        const hashedPassword = await bcrypt.hash(password,10);
        
        const newUser = new userModel({
            name,
            email,
            password:hashedPassword
        })
        const user = await newUser.save()
        const token= createtoken(user._id)
        res.json({success:true,message:"User registered successfully",token})

    }
    catch(error){
        console.log(error);
        res.json({success:false,message:error.message})

    }

}

//admin user Route
const adminUser = async(req,res)=>{
    try{
        const {email,password}=req.body
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASS){
            const token = jwt.sign(email+password,process.env.JWT_SECRET_KEY )

            res.cookie("AuthToken",token,{
                httpOnly:true
            })

            res.json({success:true,token})
        }
        else{
            res.json({success:false,message:"invalid credentials"})
        }
    } catch(error){
        console.log(error);
        res.json({success:false,message:error.message})

    }
}

export {loginUser,registerUser,adminUser}