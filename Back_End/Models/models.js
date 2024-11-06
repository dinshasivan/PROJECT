import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    userName: { type: String, unique: true },
    password: String,
    userRole: { type: String, enum: ['admin', 'user'], default: 'user' } ,// Default role is 'user'
    // Profile fields
    deliveryAddress: String,
    phoneNumber: String,
    paymentMethods: [String],
});
const User = mongoose.model('UserDetails', userSchema);

const cartSchema = new mongoose.Schema({
    username: { type: String, required: true }, // Ensure username is required
    products: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'productdetails' },
            productName: String,
            productImage: String,
            price: Number,
            quantity: Number
        }
    ],
    totalAmount: { type: Number, default: 0 }
});

const Cart = mongoose.model('Cart', cartSchema);

const orderSchema = new mongoose.Schema({
    username: { type: String, required: true },  // Ensure this field is named correctly
    products: [{ productId: mongoose.Schema.Types.ObjectId, quantity: Number, productName: String, productImage: String, price: Number }],
    totalAmount: { type: Number, required: true },
    status: { type: String, default: "Pending" },
    createdAt: { type: Date, default: Date.now }
});
const Order = mongoose.model('Order', orderSchema);


const productSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true }, // Field for storing image path
});
const Product = mongoose.model('ProductDetails', productSchema)


const wishlistSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    products: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'productdetails' },
        productName: String,
        productImage: String,
        price: Number
    }]
});


const Wishlist = mongoose.model('Wishlist', wishlistSchema);

export  {Wishlist,Order,Cart,User,Product};
