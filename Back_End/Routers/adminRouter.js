import { Router } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from "mongoose";
import multer from "multer";
import { isAdmin} from "../Middle-Ware/auth.js";
import { User,Product} from "../Models/models.js";
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import fs  from 'fs'


const adminRoute = Router();


const secretKey = 'hello';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


adminRoute.get('/',(req,res)=>{
    res.send("hello");
    
})
const uploadDir = join(__dirname, 'uploads');

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
    console.log("Uploads directory created.");
}

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, uploadDir); //  set upload directory
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Use a unique filename
    }
});

const upload = multer({ storage: storage });


// Signup Route
adminRoute.post('/signup', async (req, res) => {
    try {
        const data = req.body;
        const { FirstName, LastName, UserName, Password } = data;

        const existingUser = await User.findOne({ userName: UserName });
        if (existingUser) {
            console.log("User name already exists!");
            return res.status(400).json({ message: "User exists" });
        }

        // Hash the password
        const newP = await bcrypt.hash(Password, 10);
        
        // Create a new user with default role as 'user'
        const newUser = new User({
            firstName: FirstName,
            lastName: LastName,
            userName: UserName,
            password: newP,
            userRole: 'user' // Default role is set to 'user'
        });

        // Save user to MongoDB
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json(error);
    }
});

// Login Route
adminRoute.post('/login', async (req, res) => {
    const { UserName, Password } = req.body;
    console.log(UserName);
    

    try {
        const user = await User.findOne({ userName: UserName });
        if (!user) {
            return res.status(403).json({ message: "User does not exist" });
        }

        const isPasswordValid = await bcrypt.compare(Password, user.password);
        if (!isPasswordValid) {
            return res.status(403).json({ message: "Password is incorrect" });
        }

        // Generate token with userRole
        const token = jwt.sign({ _id: user._id, userRole: user.userRole }, secretKey, { expiresIn: '1h' });

        // Set cookie or respond with token
        res.cookie('authToken', token, { httpOnly: true });
        res.status(200).json({ message: "Logged in successfully", token, userRole: user.userRole });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Login failed", error });
    }
});


// Route to add a product (Admin only)
adminRoute.post('/add-product', isAdmin, upload.single('image'), async (req, res) => {
    try {
        const { productName, price, category, description } = req.body;

        const newProduct = new Product({
            productName,
            price,
            category,
            description,
            image: req.file.path // Ensure req.file is populated by multer
        });

        const result = await newProduct.save();
        
        res.status(201).json({
            message: "Product added successfully",
            productId: result._id
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error adding product", error });
    }
});

//  view all products
adminRoute.get('/view-products', async (req, res) => {
    try {
        
        const products = await Product.find({});

        const productsWithImageUrl = products.map(product => {
            return {
                _id: product._id,
                productName: product.productName,
                price: product.price,
                category: product.category,
                description: product.description,
                imageUrl: `${req.protocol}://${req.get('host')}/uploads/${product.image.split('/').pop()}` // Ensure this matches your static route
            };
        });

        res.status(200).json({
            message: "Products retrieved successfully",
            products: productsWithImageUrl
        });
    } catch (error) {
        console.error("Error retrieving products:", error);
        res.status(500).json({ message: "Error retrieving products", error });
    }
    
    
});


//  search products by category, product name
adminRoute.get('/search-products', async (req, res) => {
    try {
      
        const { productName, category } = req.query;

       
        const filter = {};

      
        if (productName) {
            filter.productName = { $regex: productName, $options: "i" };
        }

      
        if (category) {
            filter.category = { $regex: category, $options: "i" };
        }

       
        const products = await Product.find(filter);

        res.status(200).json({
            message: "Products retrieved successfully",
            products: products
        });
    } catch (error) {
        console.error("Error retrieving products:", error);
        res.status(500).json({ message: "Error retrieving products", error });
    }
});


// updating product details
adminRoute.patch('/update-product/:id', upload.single('image'),isAdmin, async (req, res) => {
    try {
        const productId = req.params.id;

        
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        
        if (req.body.productName) {
            product.productName = req.body.productName;
        }
        if (req.body.price) {
            product.price = req.body.price;
        }
        if (req.body.category) {
            product.category = req.body.category;
        }
        if (req.body.description) {
            product.description = req.body.description;
        }
        // If an image file is uploaded, update the image path
        if (req.file) {
            product.image = req.file.path;
        }

        // Save the updated product
        const updatedProduct = await product.save();

        res.status(200).json({
            message: "Product updated successfully",
            updatedProduct
        });
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(400).json({ message: "Invalid product ID or data", error });
    }
});

//delete prooduct
adminRoute.delete('/remove-product/:productId', isAdmin, async (req, res) => {
    try {
        const { productId } = req.params;

       
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        
        await Product.findByIdAndDelete(productId);

        res.status(200).json({ message: "Product removed successfully" });
    } catch (error) {
        console.error("Error removing product:", error);
        res.status(500).json({ message: "Error removing product", error: error.message });
    }
});

adminRoute.post('/logout', (req, res) => {
    // Clear the authentication cookie
    res.clearCookie('authToken', { httpOnly: true, secure: true }); // Make sure secure is set to true if you're using HTTPS
    
    return res.status(200).json({ message: 'Logged out successfully' });
});

export { adminRoute , User, Product};// Export the router


