import { Router } from "express";
import { Product } from "./adminRouter.js";
import { Cart, Wishlist, Order, User } from "../Models/models.js";



import { isLoggedIn } from '../Middle-Ware/auth.js';

const userRoute = Router();


//create user profile
// Route to update user's profile (delivery address, phone number, and payment methods)
userRoute.post('/create-profile', isLoggedIn, async (req, res) => {
    const { deliveryAddress, phoneNumber, paymentMethods } = req.body;
    const userId = req.user._id; // Extract the user ID from the decoded token

    // Find the user and create their profile
    try {
        const user = await User.findById(userId); // Find user by ID

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update the user's profile with the provided information
        user.deliveryAddress = deliveryAddress || user.deliveryAddress;
        user.phoneNumber = phoneNumber || user.phoneNumber;
        user.paymentMethods = paymentMethods || user.paymentMethods;

        // Save the updated user profile
        await user.save();

        return res.status(200).json({ message: 'Profile created/updated successfully', user });
    } catch (error) {
        console.error('Error creating profile:', error);
        return res.status(500).json({ message: 'Error creating profile', error: error.message });
    }
});

//view user profile
userRoute.get('/view-profile', isLoggedIn, async (req, res) => {
    const userId = req.user._id; // Extract the user ID from the decoded token

    try {
        // Find the user in the database by their user ID
        const user = await User.findById(userId).select('-password'); // Exclude password from the response

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Return the user profile (delivery address, phone number, payment methods)
        return res.status(200).json({
            message: 'Profile retrieved successfully',
            profile: {
                userName: user.userName,
                deliveryAddress: user.deliveryAddress,
                phoneNumber: user.phoneNumber,
                paymentMethods: user.paymentMethods
            }
        });
    } catch (error) {
        console.error('Error retrieving profile:', error);
        return res.status(500).json({ message: 'Error retrieving profile', error: error.message });
    }
});



// Add product to cart
userRoute.post('/cart/add', async (req, res) => {
    const { username, productId, quantity } = req.body;

    try {
        // Find product details
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Check if a cart exists for the user
        let cart = await Cart.findOne({ username });

        if (!cart) {
            // If no cart exists, create a new one
            cart = new Cart({
                username,
                products: [
                    {
                        productId: product._id,
                        productName: product.productName,
                        productImage: product.productImage,
                        price: product.price,
                        quantity
                    }
                ],
                totalAmount: product.price * quantity
            });
        } else {
            // If cart exists, add product to existing cart
            cart.products.push({
                productId: product._id,
                productName: product.productName,
                productImage: product.productImage,
                price: product.price,
                quantity
            });
            cart.totalAmount += product.price * quantity;
        }

        await cart.save();
        res.status(200).json({ message: 'Product added to cart', cart });
    } catch (error) {
        console.error('Error adding product to cart:', error);
        res.status(500).json({ message: 'Error adding product to cart', error });
    }
});


userRoute.get('/cart/view', isLoggedIn, async (req, res) => {
    // console.log("req.user:", req.user);  
    const username = req.user?.UserName;  // Check if UserName is present

    if (!username) {
        return res.status(400).json({ message: 'Username not found in token' });
    }

    try {
        const cart = await Cart.findOne({ username });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found for this user." });
        }

        res.status(200).json({ message: "Cart retrieved successfully", cart });
    } catch (error) {
        console.error("Error retrieving cart:", error);
        res.status(500).json({ message: "Error retrieving cart", error });
    }
});




// Add product to wishlist
userRoute.post('/wishlist/add', async (req, res) => {
    const { username, productId } = req.body;  // Ensure username and productId are in the request body

    try {
        // Find product details
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Check if a wishlist exists for the user
        let wishlist = await Wishlist.findOne({ username: username });

        if (!wishlist) {
            // If no wishlist exists, create a new one
            wishlist = new Wishlist({
                username,
                products: [
                    {
                        productId: product._id,
                        productName: product.productName,
                        productImage: product.productImage,
                        price: product.price
                    }
                ]
            });
        } else {
            // If wishlist exists, add product to existing wishlist
            wishlist.products.push({
                productId: product._id,
                productName: product.productName,
                productImage: product.productImage,
                price: product.price
            });
        }

        await wishlist.save();
        res.status(200).json({ message: 'Product added to wishlist', wishlist });
    } catch (error) {
        console.error('Error adding product to wishlist:', error);
        res.status(500).json({ message: 'Error adding product to wishlist', error });
    }
});



// Route to view the wishlist
userRoute.get('/wishlist/view', isLoggedIn, async (req, res) => {
    try {

        const username = req.user.UserName;


        const wishlist = await Wishlist.findOne({  username });

        if (!wishlist) {
            return res.status(404).json({ message: "Wishlist not found for this user." });
        }

        res.status(200).json({
            message: "Wishlist retrieved successfully",
            wishlist: wishlist
        });
    } catch (error) {
        console.error("Error retrieving cart:", error);
        res.status(500).json({ message: "Error retrieving wishlist", error });
    }
});




//  Place an order and clear the cart

userRoute.post('/place-order', async (req, res) => {
    const { userName } = req.body;  // Use username to identify user

    try {
        // Find the user by username
        const user = await User.findOne({ userName });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Find the user's cart by username
        const cart = await Cart.findOne({ username: userName });

        if (!cart || cart.products.length === 0) {
            return res.status(400).json({ message: 'No products in the cart' });
        }

        // Calculate totalAmount from the cart products
        const totalAmount = cart.products.reduce((total, item) => total + item.price * item.quantity, 0);

        // Create an order from the cart
        const order = new Order({
            username: userName,  // Make sure this field is correctly named 'username'
            products: cart.products,
            totalAmount: totalAmount,  // Use the calculated totalAmount
            status: 'Pending',
            createdAt: new Date()
        });

        // Save the order
        await order.save();

        // Clear the cart by removing the products
        cart.products = []; // Empty the cart
        await cart.save();

        return res.status(200).json({ message: 'Order placed successfully and cart cleared' });
    } catch (error) {
        console.error('Error placing order:', error);
        return res.status(500).json({ message: 'Error placing order', error });
    }
});



export { userRoute };
